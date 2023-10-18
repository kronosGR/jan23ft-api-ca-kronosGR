class TodoService {
  constructor(db) {
    this.Todo = db.Todo;
    this.Status = db.Status;
  }

  async addTodo(name, description, CategoryId, StatusId, UserId) {
    return await this.Todo.create({
      name: name,
      description: description,
      CategoryId: CategoryId,
      StatusId: StatusId,
      UserId: UserId,
    }).catch((e) => {});
  }

  async getAllByUser(UserId) {
    return await this.Todo.findAll({ where: { UserId: UserId } });
  }

  async getById(id) {
    return await this.Todo.findOne({ where: { id: id } });
  }

  async getAllByUserButNotDeleted(UserId) {
    return await this.Todo.findAll({
      where: {
        UserId: UserId,
        StatusId: { ne: 4 },
      },
    });
  }

  async getDeletedByUser(UserId) {
    return await this.Todo.findAll({
      where: {
        UserId: UserId,
        StatusId: 4,
      },
    });
  }

  async updateTodo(id, name, description, CategoryId, StatusId, UserId) {
    await this.Todo.update(
      {
        name: name,
        description: description,
        CategoryId: CategoryId,
        StatusId: StatusId,
        UserId: UserId,
      },
      { where: { id: id }, returning: true, plain: true }
    );
  }

  async updateDeleteTodo(id) {
    await this.Todo.update(
      {
        StatusId: 4,
      },
      { where: { id: id }, returning: true, plain: true }
    );
  }

  async getAllStatuses() {
    return await this.Status.findAll({ where: {} });
  }
}

module.exports = TodoService;
