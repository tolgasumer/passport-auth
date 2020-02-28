const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const PostsSchema = new Schema({
    uid: String,
    field: String,
    text: String,
});

PostsSchema.methods.toJSON = function () {
    return {
        uid: this.uid,
        field: this.field,
        text: this.text,
    };
};


mongoose.model('Posts', PostsSchema);