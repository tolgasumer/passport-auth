const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Posts = mongoose.model('Posts');

//POST create new post route (required, only authenticated users have access)
router.post('/', auth.required, (req, res, next) => {
  const { body: { post } } = req;
  const { payload: { id } } = req; // Get the userid from the token

  if(!post.field) {
    return res.status(422).json({
      errors: {
        field: 'is required',
      },
    });
  }

  if(!post.text) {
    return res.status(422).json({
      errors: {
        text: 'is required',
      },
    });
  }

  const newPost = new Posts(post);
  newPost.set({uid: id}); // Append the userid of the owner to the post

  return newPost.save()
    .then(() => res.json({ post: newPost.toJSON() }));
});


//GET posts route (required, only authenticated users have access)
router.get('/', auth.required, (req, res, next) => {

  // Return all posts to the client
  Posts.find({}).then(function (posts) {
    res.send(posts);
    });
  /*
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
    */
});

module.exports = router;