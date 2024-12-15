import React, { Fragment, useEffect, useState } from "react";
import Table from "./src/component/Table";
function Main() {
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus("loading");
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const resultedData = data.map((data) => ({
          sn: data['s.no'],
          pledged: data['amt.pledged'],
          percentage: data['percentage.funded'],
        }));
        setTableData(resultedData);
        setStatus("loaded");
      })
      .catch((err) => {
        setStatus("error");
        console.error(err);
      });
  }, []);
  return (
    <Fragment>
      {status === "loading" && <div>Loading</div>}
      {status === "error" && (
        <div>Something want wrong please check console</div>
      )}
      {!["loading", "error"].includes(status) && (
        <Table
          header={[" S.No", "Percentage funded", "Amount pledged"]}
          data={tableData}
        />
      )}
    </Fragment>
  );
}

export default Main;
