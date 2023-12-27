import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({
  gymsLength,
  numOfResults,
  setCurrentPage,
  currentPage,
}) => {
  const totalPagesNum = Math.ceil(gymsLength / numOfResults);
  const pageNumbers = [];
  for (let i = 1; i <= totalPagesNum; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-section">
      <ul className="pagination-container">
        {currentPage === 1 ? null : (
          <li>
            <button
              className="arrow-button"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              {"<"}
            </button>
          </li>
        )}
        {pageNumbers.map((pageNumber) => {
          if (
            pageNumber === 1 ||
            pageNumber === currentPage ||
            pageNumber === totalPagesNum ||
            pageNumber === currentPage + 1
          ) {
            return (
              <li key={pageNumber}>
                <button
                  className={
                    pageNumber === currentPage
                      ? "active-page-number page-number"
                      : "page-number"
                  }
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          } else {
            return (
              <li key={pageNumber} className="dot-page-number">
                .
              </li>
            );
          }
        })}
        {currentPage === totalPagesNum ? null : (
          <li>
            <button
              className="arrow-button"
              onClick={() => setCurrentPage((next) => next + 1)}
            >
              {">"}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  gymsLength: PropTypes.number,
  numOfResults: PropTypes.number,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
};

export default Pagination;
