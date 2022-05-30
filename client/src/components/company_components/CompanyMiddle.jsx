import React from "react";
import LatestOffer from "./LatestOffer";
import Location from "./Location";

function CompanyMiddle({ company }) {
  return (
    <div className="middle col-12 row d-flex flex-ms-row-reverse m-auto mt-3 ">
      <Location />
      <LatestOffer company={company} />
    </div>
  )
}

export default CompanyMiddle;
