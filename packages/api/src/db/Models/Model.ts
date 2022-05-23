import { Model as ObjectionModel } from "objection";
import dayjs from "dayjs";

export class Model extends ObjectionModel {
  id: number;
  created_at: string;
  updated_at: string;

  $beforeInsert() {
    this.created_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.updated_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }

  $beforeUpdate() {
    this.updated_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }
}
