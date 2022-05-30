import "./styles/posts.css"
import { QuestionAnswerSharp } from "@material-ui/icons"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import { useEffect, useState } from "react"
import axios from "axios"

function CandidatesPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get("/posts")
        console.log(res.data)
        res.data && setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])
  const PF = "http://localhost:8000"
  return (
    <div className="posts col-12 m-auto mt-5">
      <h6 className="posts-title">Posts from Candidates</h6>
      <div className="posts-container">
        {/* ////////////////////////// */}
        {posts &&
          posts.map((post) => {
            return (
              <div className="post row" key={post._id}>
                <>
                  <div className="latest-jobs-options ">
                    <MoreVertRounded
                      className="icon"
                      onClick={() => setOpenOption(job._id)}
                    />{" "}
                  </div>
                  {openOption === job._id && (
                    <div className="options-menu ">
                      <Link className="link text-dark" to={`edit/${job._id}`}>
                        <li className="edit ">Edit</li>{" "}
                      </Link>
                      <li
                        className="del"
                        onClick={() => deleteJobHandler(job._id)}
                      >
                        Delete
                      </li>
                      <CloseSharp
                        className="close-option-menu"
                        onClick={() => setOpenOption(null)}
                      />
                    </div>
                  )}{" "}
                </>
                <div className="header col-12">
                  <h6 className="post-title">{post?.title}</h6>
                  <div className="post-auther col-12 row">
                    <img
                      className="col-4"
                      src={PF + post?.photo}
                      alt="author"
                    />
                    <h6 className="col-8">{post?.userName}</h6>
                  </div>
                </div>
                <div className="body col-12">
                  <p>
                    {post?.body}
                    <a href="/">Read More</a>
                  </p>
                </div>
                <div className="info-and-actions col-12">
                  <span className="post-date">today</span>
                  <span className="comments">
                    <QuestionAnswerSharp />
                  </span>
                  <span>
                    {" "}
                    <ArrowUpwardIcon />
                    {post?.likes?.length}
                  </span>
                </div>
              </div>
            )
          })}
        {/* ////////////////////////// */}
      </div>
    </div>
  )
}

export default CandidatesPosts
