const users = [
  {
    name: 'Kirill',
    id: '1',
    login: 'kir',
    password: '543s'
  },
  {
    name: 'Anastasia',
    id: '2',
    login: 'nast',
    password: '111'
  }
];
const pushUser = items => {
  users.push(items);
};
module.exports = {
  users,
  pushUser
};
