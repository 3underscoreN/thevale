import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { Item } from "@/interfaces/item";

import dotenv from "dotenv";
import path from "path";

import { Mutex } from "async-mutex";

dotenv.config({ path: path.resolve(__dirname, "..", "..", "..", ".env.local") });

type WriteJob = {
  id: number;
  table: "silent" | "starlight";
  isReply: boolean;
}

class ThreadArray<T> {
  lock: Mutex;
  array: Array<T>;
  length: number;

  constructor() {
    this.lock = new Mutex();
    this.array = new Array<T>();
    this.length = 0;
  }

  async push(item: T) {
    const release = await this.lock.acquire();
    try {
      this.array.push(item);
      this.length++;
    } finally {
      release();
    }
  }

  async pop(): Promise<T | undefined> {
    const release = await this.lock.acquire();
    try {
      const item = this.array.pop();
      if (item) {
        this.length--;
      }
      return item;
    } finally {
      release();
    }
  }
}

export default class Database{
  sql: NeonQueryFunction<false, false>;
  jobDone: ThreadArray<WriteJob>;

  constructor() {
    this.sql = neon(`${process.env.DATABASE_URL_DEV}`);
    this.jobDone = new ThreadArray<WriteJob>();
  }

  cleanup() {
    this.jobDone.lock.acquire()
    .then(release => {
      this.jobDone.array.forEach(job => {
        if (job.isReply) {
          this.cleanupReplyById(job.id, job.table);
        } else {
          this.cleanupById(job.id, job.table);
        }
      });
      release();
    });
  }

  /**
   * This function checks for the latest pending comment in the database.
   * It takes a table name as an argument and returns the latest pending comment.
   * 
   * @param table "silent" | "starlight"
   * @returns {Promise<Record<string, Item>[]>}
   */
  async checkLatestPending(table: "silent" | "starlight") {
    let result: Record<string, Item>[];
    switch (table) {
      case "silent":
        result = await this.sql`SELECT id, name, content, created_at FROM silent_comments WHERE status='pending' ORDER BY created_at DESC LIMIT 1;`;
        break;
      case "starlight":
        result = await this.sql`SELECT id, name, content, created_at FROM starlight_comments WHERE status='pending' ORDER BY created_at DESC LIMIT 1;`;
        break;
    }
    return result;
  }

  /**
   * This function checks for the latest comment in the database by name.
   * It takes a name and a table name as arguments and returns the latest comment.
   * 
   * @param name string
   * @param table "silent" | "starlight"
   * @returns {Promise<Record<string, Item>[]>}
   */
  async checkByName(name: string, table: "silent" | "starlight") {
    let result: Record<string, Item>[];
    switch (table) {
      case "silent":
        result = await this.sql`SELECT id, name, content, status FROM silent_comments WHERE name=${name} ORDER BY created_at DESC LIMIT 1;`;
        break;
      case "starlight":
        result = await this.sql`SELECT id, name, content, status FROM starlight_comments WHERE name=${name} ORDER BY created_at DESC LIMIT 1;`;
        break;
    }
    return result;
  }

  /**
   * This function inserts a comment into the database and approves it.
   * It takes a name, content, and a table name as arguments.
   * It returns the ID of the inserted comment.
   * 
   * @param name string
   * @param content string
   * @param table "silent" | "starlight"
   * @returns {Promise<Record<string, number>[]>}
   */
  async insertAndApprove(name: string, content: string, table: "silent" | "starlight") : Promise<Record<string, number>[]> {
    let result: Record<string, number>[];
    switch (table) {
      case "silent":
        result = await this.sql`INSERT INTO silent_comments (name, content, status) VALUES (${name}, ${content}, 'approved') RETURNING id;`;
      case "starlight":
        result = await this.sql`INSERT INTO starlight_comments (name, content, status) VALUES (${name}, ${content}, 'approved') RETURNING id;`;
    }
    if (result && result.length > 0) {
      await this.jobDone.push({
        id: result[0].id,
        table,
        isReply: false
      });
    }
    return result;
  }

  /**
   * This function inserts a reply to a comment into the database and approves it.
   * It must have a valid parent ID.
   * It returns the ID of the inserted reply.
   * 
   * @param name string
   * @param content string
   * @param parentId number
   * @param table "silent" | "starlight"
   * @returns {Promise<Record<string, number>[]>}
   */
  async insertReplyAndChangeToApprove(name: string, content: string, parentId: number, table: "silent" | "starlight") : Promise<Record<string, number>[]> {
    let result: Record<string, number>[];
    switch (table) {
      case "silent":
        result = await this.sql`INSERT INTO silent_comments_replies (name, content, status, parent_id) VALUES (${name}, ${content}, 'pending', ${parentId}) RETURNING id;`;
        await this.sql`UPDATE silent_comments_replies SET status='approved' WHERE id=${result[0].id};`;
      case "starlight":
        result = await this.sql`INSERT INTO starlight_comments_replies (name, content, status, parent_id) VALUES (${name}, ${content}, 'pending', ${parentId}) RETURNING id;`;
        await this.sql`UPDATE starlight_comments_replies SET status='approved' WHERE id=${result[0].id};`;
    }
    if (result && result.length > 0) {
      await this.jobDone.push({
        id: result[0].id,
        table,
        isReply: true
      });
    }
    return result;
  }

  /**
   * This function cleans up the database by deleting a comment by ID.
   * It takes an ID and a table name as arguments.
   * 
   * @param id number
   * @param table "silent" | "starlight"
   * @returns {Promise<void>}
   */
  async cleanupById(id: number, table: "silent" | "starlight") {
    switch (table) {
      case "silent":
        await this.sql`DELETE FROM silent_comments WHERE id=${id};`;
        break;
      case "starlight":
        await this.sql`DELETE FROM starlight_comments WHERE id=${id};`;
        break;
    }
  }

  /**
   * This function cleans up the database by deleting a reply by ID.
   * It takes an ID and a table name as arguments.
   * 
   * @param id number
   * @param table "silent" | "starlight"
   * @returns {Promise<void>}
   */
  async cleanupReplyById(id: number, table: "silent" | "starlight") {
    switch (table) {
      case "silent":
        await this.sql`DELETE FROM silent_comments_replies WHERE id=${id};`;
        break;
      case "starlight":
        await this.sql`DELETE FROM starlight_comments_replies WHERE id=${id};`;
        break;
    }
  }
}