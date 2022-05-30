import CompanyPhotoSlider from "./CompanyPhotoSlider"
import CompanyTitle from "./CompanyTitle"
import CompanyContacts from "./CompanyContacts"
function CompanyHeader({
  fetcher,
  loading,
  company,
  setLoading,
  setFetcher,
  showOverlay,
  setShowOverlay,
}) {
  return (
    <div className="company-top col-12 m-auto row row">
      <CompanyTitle
        company={company}
        loading={loading}
        fetcher={fetcher}
        setFetcher={setFetcher}
        setLoading={setLoading}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
      <CompanyPhotoSlider
        company={company}
        loading={loading}
        fetcher={fetcher}
        setFetcher={setFetcher}
        setLoading={setLoading}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
      <CompanyContacts
        company={company}
        loading={loading}
        fetcher={fetcher}
        setFetcher={setFetcher}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
    </div>
  )
}

export default CompanyHeader
