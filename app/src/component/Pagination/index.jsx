import React from "react";
import "./index.css";

const Pagination = ({
  totalSize = 1,
  currentPage = 1,
  pageSize = 10,
  onNext,
  onPrev,
}) => {
  return (
    <div className="container">
      <p>
        {pageSize * (currentPage -1) + 1}-{pageSize * (currentPage) < totalSize ? pageSize * (currentPage) : totalSize} in {totalSize} records
      </p>
      <div className="button-container">
        <button disabled={currentPage === 1} onClick={(e)=>onPrev(e)}>Prev</button>
        <button disabled={totalSize <=currentPage*pageSize} onClick={(e)=>onNext(e)}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
