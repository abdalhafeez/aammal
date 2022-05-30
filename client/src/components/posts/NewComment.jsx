import { useState } from "react"
import "./styles/newComment.css"
  import { axiosInstance } from "../../config/axiosInstance"
  function NewComment({
    setShowCommentForm,
    post,
    setCommentedOn,
    setComments,
  }) {
    const [error, setError] = useState("")
    const [text, setText] = useState("")
    const handleAddComment = async (e) => {
      const body = {
        text,
      }
      e.preventDefault()
      const config = {
        headers: {
          "Content-Type": "application/josn",
        },
      }

      try {
        const res = await axiosInstance.put(`/posts/comment/${post._id}`, body)
        console.log(res.data)
        setShowCommentForm(false)
        setComments(res.data)
        setCommentedOn(post._id)
        // setShowComments(null)
      } catch (error) {
        console.log(error?.response?.data?.errors)
        setError(error?.response?.data?.errors)

        setTimeout(() => {
          setError("")
        }, 3000)
      }
    }
    return (
      <div className="new-comment-parent pb-2">
        <form className="comment-form" onSubmit={handleAddComment}>
          <label className="text-primary text-center">Post Comment</label>

          <textarea name="body" onChange={(e) => setText(e.target.value)} />
          {error && (
            <span className="text-danger text-center">{error.msg}</span>
          )}
          <div className="comment-actions">
            <button
              className="btn btn-sm m-2 btn-danger"
              onClick={() => setShowCommentForm(false)}
            >
              Concel
            </button>
            <button
              className="btn btn-sm m-2 btn-primary"
              onClick={handleAddComment}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    )
  }

export default NewComment
