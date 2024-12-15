import React, { Fragment, useState } from "react";
import "./index.css";
import Pagination from "../Pagination";

const Table = ({ header, data }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const onPrevClick = () => {
    const currentActiveIndex = currentPage - 1;
    sliceArrayAndSetState(data,currentActiveIndex);
    setCurrentPage(currentActiveIndex);
  };
  const onNextClick = () => {
    const currentActiveIndex = currentPage + 1;
    sliceArrayAndSetState(data, currentActiveIndex);
    setCurrentPage(currentActiveIndex);
  };

  const sliceArrayAndSetState = (arr, currentActiveIndex) => {
    const start = (currentActiveIndex-1) * 5;
    const end = (currentActiveIndex) * 5;
    const data = [...arr].slice(start, end);
    setTableData(data);
  };
  useState(() => {
    sliceArrayAndSetState(data, 1);
  }, []);

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            {header.map((thElement, index) => (
              <th key={index + thElement}>{thElement}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((trElement, index) => (
            <tr key={index + trElement}>
              {Object.keys(trElement).map((tdElement, index) => (
                <td key={index}>{trElement[tdElement]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 5 && (
        <Pagination
          pageSize={5}
          currentPage={currentPage}
          totalSize={data.length}
          onPrev={onPrevClick}
          onNext={onNextClick}
        />
      )}
    </Fragment>
  );
};

export default Table;
