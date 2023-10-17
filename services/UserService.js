class UserService {
  constructor(db) {
    this.User = db.User;
  }

  async create(name, email, password, passwordSalt) {
    return await this.User.create({
      name: name,
      email: email,
      encryptedPassword: password,
      salt: passwordSalt,
    }).catch((err) => {
      console.error(err);
    });
  }

  async getByEmail(email) {
    return await this.User.findOne({ where: { email: email } }).catch((err) => {
      console.err(err);
    });
  }
}

module.exports = UserService;
