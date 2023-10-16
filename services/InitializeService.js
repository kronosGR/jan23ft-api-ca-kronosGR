class InitializeService {
  constructor(db) {
    this.sequelize = db.sequelize;
  }

  async initialize() {
    try {
      await this.sequelize.query("INSERT INTO statuses (status) VALUES('Not Started')");
      await this.sequelize.query("INSERT INTO statuses (status) VALUES('Started')");
      await this.sequelize.query("INSERT INTO statuses (status) VALUES('Completed')");
      await this.sequelize.query("INSERT INTO statuses (status) VALUES('Deleted')");
    } catch (err) {}
  }
}

module.exports = InitializeService;
