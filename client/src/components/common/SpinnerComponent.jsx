import { Spinner } from "react-bootstrap"
function SpinnerComponent({ word }) {
  return (
    <div className="spinner-parent">
      <Spinner
        className="load-profile-spinner m-3"
        variant="primary"
        animation="border"
        role="status"
      ></Spinner>
      <h4>{word}</h4>
    </div>
  )
}

export default SpinnerComponent
