const boards = [
  {
    id: '1',
    title: 'My',
    columns: [
      {
        id: '1',
        title: 'Task 1',
        order: 1
      }
    ]
  }
];
const pushBoard = items => {
  boards.push(items);
};
module.exports = {
  boards,
  pushBoard
};
