const express = require('express');


const Users = require('./users-model')
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
});

router.get('/', (req, res, next) => {
  // do your magic!
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    next(err)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // do your magic!
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(() => {
    res.status(200).json({message: 'User has been deleted'})
  })
  .catch(err => {
    next(err)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id)
  .then(user => {
    res.status(200).json({message: 'User updated successfully'})
  })
  .catch(err => {
    res.status(500).json({message: 'could not update user'})
  })
});

router.post('/:id/posts', validateUserId,  (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(200).json({message: 'user succesfully added'})
  })
  .catch(err => {
    res.status(500).json({message: 'error adding user'})
  })
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({message: 'Could not get posts for the user'})
  })
});

// do not forget to export the router
module.exports = router