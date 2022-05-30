import { QuestionAnswerSharp, ArrowDownwardSharp } from "@material-ui/icons"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ItemDate from "../common/ItemDate"
function InfoAndActioins({
  likes,
  post,
  hasLike,
  handleLike,
  handleUnlike,
  commentedOn,
  liked,
  setShowComments,
  comments,
}) {
  return (
    <div className="info-and-actions col-12">
      <ItemDate item={post} />
      <span className="comments">
        <QuestionAnswerSharp
          className="icon"
          onClick={() => setShowComments(post._id)}
        />{" "}
        {commentedOn === post._id ? comments.length : post.comments.length}
      </span>
      <span className="interactions">
        <ArrowDownwardSharp
          className="icon me-3 unlike"
          onClick={() => handleUnlike(post._id)}
        />

        <span className="icon">
          <ArrowUpwardIcon
            onClick={() => {
              handleLike(post._id)
            }}
            className={`${hasLike ? "haslike" : "like-icon"}`}
          />
          <span className="me-2">
            {liked === post._id ? likes?.length : post.likes?.length}
          </span>
        </span>
      </span>
    </div>
  )
}

export default InfoAndActioins
