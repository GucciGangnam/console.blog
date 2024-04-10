var express = require('express');
var router = express.Router();

// Import Controllers
const user_controller = require("../controllers/userController")
const post_controller = require("../controllers/postController")
const comment_controller = require("../controllers/commentController")
const authorization_controller = require("../controllers/authorizationController")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// USERS // 
// Create user 
router.post('/user', user_controller.create_user)
// Read user 
router.get('/user', authorization_controller.validateAccessToken, user_controller.read_user)
// Update user 
router.put('/user/firstname', authorization_controller.validateAccessToken,  user_controller.update_user_firstname)
router.put('/user/lastname', authorization_controller.validateAccessToken,  user_controller.update_user_lastname)
router.put('/user/email', authorization_controller.validateAccessToken,  user_controller.update_user_email)
router.put('/user/password', authorization_controller.validateAccessToken,  user_controller.update_user_password)
// Delete user 
router.delete('/user', authorization_controller.validateAccessToken, user_controller.delete_user)
// Login User // 
router.post('/user/login', user_controller.login_user)

// POSTS // 
// Create post 
router.post('/post', authorization_controller.validateAccessToken, post_controller.create_post)
// Read all posts
router.get('/post/all', post_controller.get_all_post)
// Read post 
router.get('/post/:id', post_controller.get_post)
// Update post 
router.put('/post', authorization_controller.validateAccessToken, post_controller.update_post)
// Delete Post 
router.delete('/post', authorization_controller.validateAccessToken, post_controller.delete_post)
// Like post 
router.post('/post/like/:id', authorization_controller.validateAccessToken, post_controller.like_post)
// COMMENTS // 
// Create comment 
router.post('/post/comment/:id', authorization_controller.validateAccessToken, comment_controller.post_comment)

// Read Comment

// Update Comment

// Delete Comment


module.exports = router;
