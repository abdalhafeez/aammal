import { GoogleLogin } from "react-google-login"
import { Link, useHistory } from "react-router-dom"
import { axiosInstance } from "../../config/axiosInstance"

function Google({ setCheckProfile, profileType }) {
  const history = useHistory()
  const responseGoogle = async (response) => {
    if (profileType === "")
      return setCheckProfile("Please Choose profile Type.")

    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    }
    try {
      if (response?.profileObj) {
        const newUser = {
          profileType,
          email: response?.profileObj?.email,
          googleId: response?.googleId,
          password: response?.googleId,
          userName:
            response?.profileObj?.givenName +
            " " +
            response?.profileObj?.familyName,
          photo: response?.profileObj?.imageUrl,
        }
        const res = await axiosInstance.post("/auth/google", newUser, config)
        console.log(res.data)
        if (res.data) {
          localStorage.setItem("token", res.data.token)
          window.location.replace("/")
        }
      }
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div className="wrapper" onClick={responseGoogle}>
      <GoogleLogin
        clientId="329830819320-lvpjqv1tbf7ub25cir7ra82iorvvtsa1.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  )
}

export default Google
