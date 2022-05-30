import "./styles/slider.css"
import CloseSharp from "@material-ui/icons/CloseSharp"
import MoreVertRounded from "@material-ui/icons/MoreVertRounded"
import { Link } from "react-router-dom"
function Authorized({
  job,
  user,
  company,
  openDropDown,
  setOpenDropDown,
  deleteJobHandler,
}) {
  return (
    <>
      {(company?.user === job?.company || user?.isAdmin) && (
        <div className="drop-menu">
          <div className="latest-jobs-options">
            <MoreVertRounded
              className="icon"
              onClick={() => setOpenDropDown(job._id)}
            />{" "}
          </div>
          {openDropDown === job._id && (
            <div className="options-menu ">
              <Link className="link text-dark" to={`edit/${job._id}`}>
                <li className="edit ">Edit</li>{" "}
              </Link>
              <li className="del" onClick={() => deleteJobHandler(job._id)}>
                Delete
              </li>
              <CloseSharp
                className="close-option-menu"
                onClick={() => setOpenDropDown(null)}
              />
            </div>
          )}{" "}
        </div>
      )}
    </>
  )
}

export default Authorized
