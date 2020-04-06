const tasks = [
  {
    id: '1',
    title: 'Task 1',
    order: 1,
    description: 'string',
    userId: '1',
    boardId: '1'
  },
  {
    id: '2',
    title: 'Task 2',
    order: 1,
    description: 'string',
    userId: '1',
    boardId: '1'
  }
];
const pushTask = items => {
  tasks.push(items);
};
module.exports = {
  tasks,
  pushTask
};
