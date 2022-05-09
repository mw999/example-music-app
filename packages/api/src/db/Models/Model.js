const { Model: ObjectionModel } = require("objection");
const dayjs = require("dayjs");

class Model extends ObjectionModel {
  $beforeInsert() {
    this.created_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.updated_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }

  $beforeUpdate() {
    this.updated_at = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }
}

module.exports = Model;
