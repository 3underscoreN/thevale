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

  async insertAndApprove(name: string, content: string, table: "silent" | "starlight") {
    switch (table) {
      case "silent":
        await this.sql`INSERT INTO silent_comments (name, content, status) VALUES (${name}, ${content}, 'approved');`;
        break;
      case "starlight":
        await this.sql`INSERT INTO starlight_comments (name, content, status) VALUES (${name}, ${content}, 'approved');`;
        break;
    }
  }

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
}