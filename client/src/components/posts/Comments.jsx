import "./styles/comments.css"
import DeleteForever from "@material-ui/icons/DeleteForever"
import NewComment from "./NewComment"
import { useState, useRef, useEffect } from "react"
import NoCommentsMSg from "./NoCommentsMSg"
import { Add, CloseSharp } from "@material-ui/icons"
import { formatDistance, subDays } from "date-fns"
import { axiosInstance, PF } from "../../config/axiosInstance"
function Comments({
  setCommentedOn,
  setShowComments,
  post,
  comments,
  setComments,
}) {
  const commentsRef = useRef()
  // const [clientX, setClienX] = useState(0)
  // const [clientY, setClientY] = useState(0)
  // const [initX, setInitX] = useState(0)
  // const [intiY, setInitY] = useState(0)
  // const [currentX, setCurrentX] = useState(0)
  // const [currentY, setCurrentY] = useState(0)
  // const [active, setActive] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)

  useEffect(() => {
    setComments(comments.length === 0 ? post.comments : comments)
  }, [comments])
  const deleteCommentHandler = async () => {
    try {
      const res = await axiosInstance.delete(`/posts/comment/${post._id}`)
      setComments(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const strartDraggingHangler = (e) => {
    console.log(commentsRef)
  }
  const endDraggingHangler = () => {}

  const dragging = (e) => {
    // console.log(e.type === "touchstart")
    // console.log(e)
  }
  return (
    <div
      className="comments-parent"

      // style={{ top: clientY, left: clientX }}
    >
      <header>
        <div
          className="moveDiv"
          ref={commentsRef}
          onMouseDown={strartDraggingHangler}
          onMouseUp={endDraggingHangler}
          onMouseOver={dragging}
        >
          click and hold to move
        </div>
        <h4 className=" text-center header">Comments </h4>
      </header>{" "}
      {comments?.map((comment) => {
        return (
          <div className="comment" key={comment._id}>
            <div className="auther-info">
              <img
                src={PF + comment?.photo}
                alt="photo"
                className="author-photo"
              />
              <div className="auther-name">{comment?.userName}</div>
            </div>
            <div className="body">{comment?.text}</div>
            <div className="auther-options ">
              <div className="post-date text-muted">
                {formatDistance(
                  subDays(new Date(comment.date), 0),
                  Date.now(),
                  {
                    addSuffix: true,
                  }
                )}
              </div>
              <DeleteForever
                className="del "
                onClick={() => deleteCommentHandler(post._id)}
              />
            </div>
          </div>
        )
      })}
      {comments.length === 0 && (
        <NoCommentsMSg
          setShowCommentForm={setShowCommentForm}
          showCommentForm={showCommentForm}
        />
      )}
      <div className="actions-section">
        {showCommentForm && (
          <NewComment
            setCommentedOn={setCommentedOn}
            setShowCommentForm={setShowCommentForm}
            setShowComments={setShowComments}
            setComments={setComments}
            post={post}
          />
        )}
        <div className="actions">
          {!showCommentForm && comments.length > 0 && (
            <Add
              className="close-commet-form text-success"
              onClick={() => setShowCommentForm(true)}
            />
          )}
          <CloseSharp
            className="close-commet-form"
            onClick={() => setShowComments(null)}
          />
        </div>
      </div>
    </div>
  )
}

export default Comments
