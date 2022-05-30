import React from "react"

function PostBody({ post }) {
  return (
    <div className="body col-12">
      <p>
        {post?.body.split(" ").slice(0, 20).join(" ")}
        ...<a href="/">Read More</a>
      </p>
    </div>
  )
}

export default PostBody
