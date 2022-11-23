const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 280
       },
       createdAt: {
        type: Date,
        default: Date.now,
      }, 
      username: {
        type: String,
        required: true
      },
      reactions: [reactionsSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
      }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;