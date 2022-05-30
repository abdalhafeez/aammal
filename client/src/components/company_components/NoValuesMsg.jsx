import React from "react"

function NoValuesMsg() {
  return (
    <div className="no-comapny-values-message">
      <h4>
        Add your comapany values and mission here{" "}
        <span className="note">50 words required</span>
      </h4>{" "}
      <div className="small text-muted">
        Stating your Company Values Clearly really helps you gain a better
        reputaion for your firm. Here are some links to learn more about company
        values importance <br />
        <a href="/"> the significance of clear Company Value statement</a>
      </div>
    </div>
  )
}

export default NoValuesMsg
