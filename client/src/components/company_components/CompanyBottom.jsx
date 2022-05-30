import OtherOffers from "./OtherOffers"
import AboutCompany from "./AboutCompany"
function CompanyBottom({ company }) {
  return (
    <div className="bottom row col-12">
      <AboutCompany />
      <OtherOffers company={company} />
    </div>
  )
}

export default CompanyBottom
