import "./skills.css";
import React, { useState } from "react";
import AddBox from "@material-ui/icons/AddBox";

function Skills() {
  const [add, setAdd] = useState(false);
  const [skill, setSkill] = useState("");
  const [rate, setRate] = useState("");
  const [skillSet, setSkillSet] = useState([]);
  let skill_event;
  function clearInput() {
    setRate("");
    setSkill("");
    console.log("this is from clear input");
  }
  function handleSubmit(e) {
    e.preventDefault();
    skill_event = {
      skill,
      rate,
      id: Math.floor(Math.random() * 100000),
    };
    setSkillSet(skill_event);
    console.log(skillSet);
    clearInput();
  }

  return (
    <div className="skills list-unstyled">
      <h4>skills</h4>
      {add && (
        <form className="adding-skills" onSubmit={handleSubmit}>
          <label>
            skill{" "}
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              type="text"
              className="skill-type"
              placeholder="e.g. React.js..."
            />
          </label>
          <label>
            {" "}
            level{" "}
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              type="text"
              className="skill-rate"
              placeholder="e.g. 70%..."
            />
          </label>
          <div className="actions">
            <span
              onClick={() => setAdd(!add)}
              className="btn btn-sm btn-danger"
            >
              {" "}
              concel
            </span>
            <input
              // onClick={clearInput}
              type="submit"
              className="btn-primary add-skill-submit"
            />
          </div>
        </form>
      )}
      {/* <li>
        reactjs : <span className="percentage">50%</span>
      </li>
      <li>
        Node.js : <span className="percentage">50%</span>
      </li>
      <li>
        MongoDB : <span className="percentage">50%</span>
      </li>
      <li>
        Bootstrap : <span className="percentage">50%</span>
      </li> */}
      {/* {skillSet &&
        skillSet.map((skill) => {
          <ul>
            <li>{skill.skill}</li>
            <li>{skill.rate}</li>
          </ul>;
        })} */}
      <span>
        <span onClick={() => setAdd(!add)} className="add-skill">
          <AddBox className="add-box" />
        </span>
      </span>
      {/* adding skill form */}
    </div>
  );
}

export default Skills;
