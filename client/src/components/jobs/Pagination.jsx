function Pagination({ itemsPerPage, items, setCurrentPage, currentPage }) {
  let pagesNumber = []
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pagesNumber.push(i)
  }
  const firstPage = currentPage === 1
  const lastPage = currentPage === pagesNumber.length
  return (
    <nav aria-label=" row">
      <ul className="pagin pagination col-12">
        <li className="page-item">
          <a
            className={`page-link arrow ${firstPage && "disabled"}`}
            aria-label="Previous"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </a>
        </li>

        {pagesNumber.map((num) => (
          <li aria-disabled="true" key={num}>
            <a
              className={`page-link page-number ${
                num === currentPage && "active"
              }`}
              aria-disabled="true"
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a
            className={`page-link arrow ${lastPage && "disabled"}`}
            aria-label="Next"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
