import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import { COLUMNS } from "./Columns";
import "./Table.css";
import { ColumnFilter } from "./ColumnFilter";

interface Tape {
  page: string;
  img: string;
  thumb: string;
  playingTime: string;
  type?: string;
  brand: string;
  color?: string;
}

interface TapeData {
  page: string;
  img: string;
  thumb: string;
  playingTime: string;
  type?: string;
  brand?: string;
  color?: string;
}

interface TapeItem {
  [key: string]: TapeData[];
}

const TapeDeck: React.FC = () => {
  const [tapesFormated, setTapesFormated] = useState<Tape[]>([]);
  const [tapes, setTapes] = useState<TapeItem[]>([]);

  useEffect(() => {
    const fetchTapes = async () => {
      try {
        const response = await fetch("https://tapedeck-api.vercel.app/api", {
          headers: {
            "x-api-key":
              "QXJlIHlvdSBvdXIgbmV3IGZyb250LWVuZCBzb2Z0d2FyZSBlbmdpbmVlciwgVGhva296aWxlPw==",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTapes(data);
          const sortedValues = data.map((tape: { [x: string]: any }) => {
            const tapeKey = Object.keys(tape);

            const tapeData = tape[tapeKey[0]];

            return tapeData;
          });

          const objects = sortedValues.map((tape: { [x: string]: any }) => {
            let page = undefined;
            let pageUrl = "";
            let img = undefined;
            let thumb = undefined;
            let playingTime = "";
            let type = "";
            let color = "";
            let brand = "";

            tape.forEach((element: any) => {
              if (element.hasOwnProperty("page")) {
                const pagePath = element.page
                pageUrl = pagePath
                page = <a href={pagePath}>Link</a>
              } else if (element.hasOwnProperty("img")) {
                const imagePath = element.img;
                img = <img src={imagePath} alt="" />;
              } else if (element.hasOwnProperty("thumb")) {
                const thumbPath = element.thumb;
                thumb = <a href={pageUrl}><img src={thumbPath} alt="" /></a>;
              } else if (element.hasOwnProperty("playingTime")) {
                playingTime = element.playingTime;
              } else if (element.hasOwnProperty("type")) {
                type = element.type;
              } else if (element.hasOwnProperty("color")) {
                color = element.color;
              } else if (element.hasOwnProperty("brand")) {
                brand = element.brand;
              }
            });

            return {
              page: page,
              img: img,
              thumb: thumb,
              playingTime: playingTime,
              type: type,
              color: color,
              brand: brand,
            };
          });

          setTapesFormated(objects);
        } else {
          console.error(
            "Failed to fetch tapes:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Failed to fetch tapes:", error);
      }
    };

    fetchTapes();
  }, [tapes]);

  const columns = useMemo(() => COLUMNS, []);
  const data: any = useMemo(() => tapesFormated, [tapesFormated]);
  const defaultColumn: any = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 , pageSize: 5},
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
    <div className="globalFilter">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <button>
                    {column.isSorted
                      ? (column as any).isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </button>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <span>
          Page{" "}
          <strong>
            { pageIndex + 1 } of { pageOptions.length }
          </strong>{"  "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={ pageSize }>
              Show { pageSize }
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default TapeDeck;
