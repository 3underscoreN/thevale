import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { Item } from "@/interfaces/item";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "..", "..", "..", ".env.local") });

export default class Database{
  sql: NeonQueryFunction<false, false>;
  constructor() {
    this.sql = neon(`${process.env.DATABASE_URL_DEV}`);
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
   * @returns {Promise<Record<string, {id: number}>[]>}
   */
  async insertAndApprove(name: string, content: string, table: "silent" | "starlight") {
    switch (table) {
      case "silent":
        return await this.sql`INSERT INTO silent_comments (name, content, status) VALUES (${name}, ${content}, 'approved') RETURNING id;`;
      case "starlight":
        return await this.sql`INSERT INTO starlight_comments (name, content, status) VALUES (${name}, ${content}, 'approved') RETURNING id;`;
    }
  }

  /**
   * This function cleans up the database by deleting a comment by name.
   * It takes a name and a table name as arguments.
   * 
   * Please use it or `cleanupById` after running tests to clean up the database for the next test.
   * 
   * @param name string
   * @param table "silent" | "starlight"
   * @returns {Promise<void>}
   */
  async cleanupByName(name: string, table: "silent" | "starlight") {
    switch (table) {
      case "silent":
        await this.sql`DELETE FROM silent_comments WHERE name=${name};`;
        break;
      case "starlight":
        await this.sql`DELETE FROM starlight_comments WHERE name=${name};`;
        break;
    }
  }


  /**
   * This function cleans up the database by deleting a comment by ID.
   * It takes an ID and a table name as arguments.
   * 
   * Please use it or `cleanupByName` after running tests to clean up the database for the next test.
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
}