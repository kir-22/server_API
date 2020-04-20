const uuid = require('uuid');
const mongoose = require('mongoose');

// class Board {
//   constructor({ id = uuid(), title = 'TITLE', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }

//   static toResponse(board) {
//     return board;
//   }
// }
const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Title'
    },
    columns: {
      type: Array,
      default: []
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = ({ id, columns, title }) => ({
  id,
  columns,
  title
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
