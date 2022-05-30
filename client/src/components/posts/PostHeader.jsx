import { Link } from "react-router-dom"
import { MoreVertRounded, CloseSharp } from "@material-ui/icons"

function PostHeader({
  post,
  user,
  setOpenDropDown,
  openDropDown,
  deletePostHandler,
  PF,
}) {
  return (
    <header className="header col-12">
      {user?._id === post?.user ||
        (user?.isAdmin && (
          <>
            <div className="latest-posts-options ">
              <MoreVertRounded
                className="icon"
                onClick={() => setOpenDropDown(post._id)}
              />{" "}
            </div>
            {openDropDown === post._id && (
              <div className="options-menu ">
                <Link className="link text-dark" to={`post/edit/${post._id}`}>
                  <li className="edit ">Edit</li>{" "}
                </Link>
                <li className="del" onClick={() => deletePostHandler(post._id)}>
                  Delete
                </li>
                <CloseSharp
                  className="close-option-menu"
                  onClick={() => setOpenDropDown(null)}
                />
              </div>
            )}{" "}
          </>
        ))}

      <div className="post-auther col-12 row">
        <img
          className="col-4 author-photo"
          src={post.photo && PF + post?.photo}
          alt="author"
        />
        <h6 className="col-8">
          <Link to={"profile/" + post?.user} className="link text-dark">
            {post?.userName}
          </Link>
        </h6>
      </div>
      <h6 className="post-title">{post?.title}</h6>
    </header>
  )
}

export default PostHeader
