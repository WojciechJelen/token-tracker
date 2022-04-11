import * as React from "react";
import { useTable } from "react-table";
import {
  StyledHeaderTr,
  StyledTable,
  StyledTd,
  StyledTh,
  StyledTr,
} from "../styled";

type PropsType = {
  columns: {
    [key: string]: string;
  }[];
  data: {
    [key: string]: string | undefined;
  }[];
};

export const Table: React.FC<PropsType> = ({ columns, data }) => {
  /* @ts-ignore */
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <StyledHeaderTr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.getHeaderGroupProps().key}
          >
            {headerGroup.headers.map((column) => (
              <StyledTh {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </StyledTh>
            ))}
          </StyledHeaderTr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <StyledTd
                    {...cell.getCellProps()}
                    key={cell.getCellProps().key}
                  >
                    {cell.render("Cell")}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
