// import { useContext, useEffect } from "react"
// import { loadUserCall } from "../../api_Calls/authCalls"
// import authContext from "../../context/auth_context/authContext"
import "./styles/noCommentsMsg.css"
function NoCommentsMSg({ setShowCommentForm, showCommentForm }) {
  //   const { dispatch, user } = useContext(authContext)

  return (
    <div className="no-comments-msg">
      <h6 className="text-danger  m-3">
        {/* Hi, <span className="text-success">{user && user?.userName}</span> */}
        there are no comments, go ahead a leave a comment!{" "}
        {!showCommentForm && (
          <span
            className="btn btn-info btn-sm"
            onClick={() => setShowCommentForm(true)}
          >
            Comment
          </span>
        )}
      </h6>
    </div>
  )
}

export default NoCommentsMSg
