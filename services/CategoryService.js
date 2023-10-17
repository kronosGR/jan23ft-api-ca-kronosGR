class CategoryService {
  constructor(db) {
    this.Category = db.Category;
  }

  async getCategories() {
    return this.Category.findAll({ where: {} });
  }

  async addCategory(name, UserId) {
    return this.Category.create({
      name: name,
      UserId: UserId,
    }).catch((e) => {});
  }

  async updateCategory(id, name, UserId) {
    await this.Category.update(
      {
        name: name,
        UserId: UserId,
      },
      {
        where: { id: id },
        returning: true,
        plain: true,
      }
    );
  }

  async deleteCategory(id) {
    return await this.Category.destroy({
      where: { id: id },
    }).catch((e) => {});
  }
}

module.exports = CategoryService;
