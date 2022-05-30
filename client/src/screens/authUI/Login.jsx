import "./login.css"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { authContext } from "../../context/auth_context/authContext"
import { loginCall } from "../../api_Calls/authCalls"
import { useHistory } from "react-router-dom"
import { Spinner } from "react-bootstrap"
 const Login = () => {
   const {
     dispatch,
     user,
     loading,
     token,
     errors: authError,
   } = useContext(authContext)
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [errors, setError] = useState([])
   const history = useHistory()

   const handleSubmit = (e) => {
     e.preventDefault()
     loginCall({ email, password }, dispatch)
     setError(authError)
     setTimeout(() => {
       setError("")
     }, 5000)
   }
   return (
     <div className=" login row">
       {loading && !errors ? (
         <div className="spinner-parent">
           <Spinner
             className="load-profile-spinner m-3"
             variant="primary"
             animation="border"
             role="status"
           ></Spinner>

           {/* create JS animatino */}
           <h5>please white...</h5>
         </div>
       ) : (
         <>
           {
             /*localStorage.getItem("registered")*/ false ? (
               <div className="spinner-parent">
                 <h4 className=" text-white bg-danger mb-3 p-3">
                   you didn't comfirm your emails.
                 </h4>
                 <h2 className="bg-success  text-white m-5 p-3">
                   We Have Sent You an Email, Please Click the Confirmation Link
                   to Login.
                 </h2>
               </div>
             ) : (
               <form className=" col-10 col-md-5" onSubmit={handleSubmit}>
                 <h3 className="text-center form-color ">Log In</h3>
                 {errors && (
                   <div className="auth-errors bg-white text-danger">
                     something wrong
                   </div>
                 )}
                 <div className="form-group">
                   <label className="form-color">email</label>

                   <input
                     className="form-control my-3"
                     name="email"
                     type="email"
                     required
                     onChange={(e) => setEmail(e.target.value)}
                   />
                 </div>

                 <div className="form-group">
                   <label className="form-color">password</label>{" "}
                   <input
                     name="password"
                     className="form-control mb-3"
                     type="password"
                     required
                     onChange={(e) => setPassword(e.target.value)}
                   />
                 </div>

                 <div className="auth-actions-ui">
                   <button
                     type="button"
                     className="btn  btn-success btn-sm"
                     onClick={handleSubmit}
                     mt={3}
                   >
                     {" "}
                     Submit{" "}
                   </button>
                   <Link to="/register" className="link text-primary ">
                     Register
                   </Link>
                 </div>
               </form>
             )
           }
         </>
       )}
     </div>
   )
 }

export default Login
