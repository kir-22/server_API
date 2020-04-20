const uuid = require('uuid');
const mongoose = require('mongoose');
// class User {
//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd'
//   } = {}) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
//   static getId(user) {
//     user.id = uuid();
//     return user;
//   }
// }
const userShema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);
userShema.statics.toResponse = ({ id, name, login }) => ({ id, name, login });

const User = mongoose.model('User', userShema);

module.exports = User;
