const boards = [
  {
    id: '1',
    title: 'My',
    columns: []
  }
];
const pushBoard = items => {
  boards.push(items);
};
module.exports = {
  boards,
  pushBoard
};
