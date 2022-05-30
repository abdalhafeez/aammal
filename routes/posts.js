const express = require("express")
const { check, validationResult } = require("express-validator")
const router = express.Router()
const Post = require("../model/Post")
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../model/User")

const handleError = (error) => {
  const errors = {}
  if (error.message.includes("Post validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors.msg = properties.message
      console.log(errors)
    })
  }
  return errors
}
// @operation : create post
// @route : /api/posts / @method : post / @access : private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("title", "please write title").not().isEmpty(),
      check("body", "please write a body for your post").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { title, body, likes, comments } = req.body
    let user
    let post
    try {
      user = await User.findById(req.user.id)
      post = await Post.findOne({ title })
      const postObj = {
        user: req.user.id,
        userName: user.userName,
        photo: user.photo,
      }
      if (title) postObj.title = title
      if (body) postObj.body = body
      if (comments) postObj.comments = comments
      if (likes) postObj.likes = likes

      if (post)
        return res
          .status(400)
          .send("there is already a post with the same title")
      post = new Post(postObj)
      await post.save()
      res.json(post)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server Error")
    }
  }
)
router.get("/:id", (req, res) => {
  try {
    const post = Post.findById(req.params.id)
    if (!post) return res.status(404).send("Not Found")
  } catch (error) {
    console.error(error.message)
  }
})
// @operation : update post
// @route : /api/posts/:id / @method :put / @access : private
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    await post.save()
    res.status(200).json(post)
  } catch (error) {
    res.status(500).send("Server Error")
    console.error(error)
  }
})
// @operation : get single post
// @route : /api/posts/:id / @method :deletgete / @access : public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) res.status(400).send("post not found")
    res.status(200).json(post)
  } catch (error) {
    res.status(500).send("Server Error")
    console.error(error)
  }
})

// @operation : delete post
// @route : /api/posts/:id / @method :delete / @access :
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send("Post Deleted Successfully!")
  } catch (error) {
    res.status(500).send("Server Error")
    console.error(error)
  }
})
// @operation : delete post
// @route : /api/posts/:id / @method :delete / @access : private

// @operation : get all posts
// @route : /api/posts / @method :delete / @access : private
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    console.error(error)
  }
})
//################################## [ike and unlike post] ###############################
// @operation : like post
// @route : /api/posts/:id / @method :put / @access : private

router.put("/likePost/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const postIsLiked =
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    if (postIsLiked) {
      return res.status(400).json({ msg: "post already liked!" })
    }
    post.likes.unshift({ user: req.user.id })
    await post.save()
    res.status(200).json(post.likes)
  } catch (error) {
    res.status(500).send("Server Error")
    console.error(error.message)
  }
})
// @operation : remove like
// @route : /api/posts/unlikePost/:id / @method :put / @access : private

router.put("/unlikePost/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const postIsLiked =
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    if (postIsLiked) {
      return res.status(400).json({ msg: "you haven't liked the post yet!" })
    }
    const indexToRemove = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id)
    post.likes.splice(indexToRemove, 1)
    await post.save()
    res.status(200).json(post.likes)
  } catch (error) {
    res.status(500).send("Server Error")
    console.error(error.message)
  }
})
//################################## [comments] ###############################
// @operation : add comments
// @route : /api/posts/comment/:id / @method :put / @access : private

router.put("/comment/:id", authMiddleware, async (req, res) => {
  const { text } = req.body
  console.log(req.body)
  try {
    const user = await User.findById(req.user.id)
    const post = await Post.findById(req.params.id)
    console.log(text)
    const newComment = {
      text,
      user: req.user.id,
      userName: user.userName,
      photo: user.photo,
    }
    post.comments.unshift(newComment)
    await post.save()
    res.json(post.comments)
  } catch (error) {
    const errors = handleError(error)
    res.status(500).json({ errors: errors })
  }
})

// @operation : remove comment
// @route : /api/posts/comment/:id / @method :put / @access : private
router.delete("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const indexToRemove = post.comments
      .map((like) => like.user.toString())
      .indexOf(req.params.id)
    post.comments.splice(indexToRemove, 1)
    await post.save()
    res.status(200).json(post.comments)
  } catch (error) {
    res.status(500).send("Server Error")
    console.error(error.message)
  }
})
// @operation : update comment
// @route : /api/posts/comment/:id / @method :put / @access : private

module.exports = router
