import { useState } from "react"
import { Spinner } from "react-bootstrap"
import "./styles/create.css"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../config/axiosInstance"
function Create() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const createPost = async (e) => {
    setLoading(true)
    e.preventDefault()
    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    }
    try {
      const res = await axiosInstance.post("/posts", { body, title }, config)
      res.data && window.location.replace("/")
      setLoading(false)
    } catch (error) {
      setError(error.response.data)
    }
  }
  return (
    <>
      {loading ? (
        <div className="slider ">
          <Spinner
            className=" slider-spinner col-12"
            animation="grow"
            role="status"
          />
        </div>
      ) : (
        <div className=" row create-post col-12 row">
          <form
            className="create-form col-md-7 m-auto col-12"
            onSubmit={createPost}
          >
            <h2 className="text-center ">New Post</h2>
            <label>Post Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              className="post-title"
            />
            {error && <div className="msg text-danger">{error}</div>}
            <label> Post Body</label>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              type="text"
              name="title"
              className="post-body"
            />
            <div className="align-items">
              <Link to="/" className="link create-link">
                <span className=" btn-danger btn-sm btn">Concel</span>
              </Link>
              <button className="btn  btn-primary m-4">Post</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Create
