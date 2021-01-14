const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  // do your magic!
}

async function validateUserId(req, res, next) {
  // do your magic!
  try{
    const user = await Users.getById(req.params.id)
    if (user){
      req.user = user
      next()
    }else{
      res.status(404).json('user not found')
    }
  }catch (error){
    res.status(500).json(error)
  }
}

function validateUser(req, res, next) {
  // do your magic!
  const{name} = req.body
  if(name){
    next()
  }else{
    res.status(400).json({ message: 'please enter a name'})
  }
}

async function validatePostId(req, res, next) {
  // do your magic!
  try{
    const post = await Posts.getById(req.params.id)
    if(post){
      req.post = post
      next()
    }else{
      res.status(404).json('post not found')
    }
    }catch(error){
      res.status(500).json(error)
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const {text} = req.body
  const {user_id} = req.params.id

  if(text || user_id){
    next()
  }else{
    res.status(400).json({message: 'please provide text and userID'})
  }
}


// do not forget to expose these functions to other modules
module.exports = {validateUserId, validateUser,  validatePost, validatePostId}