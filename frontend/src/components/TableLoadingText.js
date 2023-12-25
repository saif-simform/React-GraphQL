import React from "react";

export const TableLoadingText = (props) => {
  const { colSpan } = props;
  return (
    <tr>
      <td colSpan={colSpan}>Loading Data....</td>
    </tr>
  );
};

export const NoRecordsFound = (props) => {
  const { colSpan } = props;
  return (
    <tr>
      <td colSpan={colSpan}>No Record Found</td>
    </tr>
  );
};
