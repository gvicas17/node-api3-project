const express = require('express');
const Posts = require('./posts-model')
const router = express.Router();
const {validatePostId} = require('../middleware/middleware')

router.get('/', (req, res) => {
  // do your magic!
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({message: 'unable to load posts'})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Posts.getById(req.params.id)
  .then(post =>{
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({message: 'could not find post with that id'})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Posts.remove(req.params.id)
  .then(post => {
    res.status(200).json({message: 'post had been successfully deleted'})
  })
  .catch(err => {
    res.status(500).json({message: 'error with deleting post'})
  })

});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  Posts.update(req.param.id)
  .then(post => {
    res.status(200).json({message: 'post successfully updated'})
  })
  .catch(err => {
    res.status(500).json({message: 'unable to update post'})
  })
});

// do not forget to export the router
module.exports = router