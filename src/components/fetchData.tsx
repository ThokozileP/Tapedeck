import React, { useEffect, useState,useMemo } from 'react';
import { useTable,  useGlobalFilter, useFilters, useSortBy } from 'react-table'
import { GlobalFilter } from './GlobalFilter';
import { COLUMNS} from "./Columns";
import "./Table.css";

interface Tape {
    page: string;
    img: string;
    thumb: string;
    playingTime: string;
    type?: string;
    brand: string;
    color?: string;
}
//
// interface Tape {
//     tape: [];
// }

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
                const response = await fetch('https://tapedeck-api.vercel.app/api', {
                    headers: {
                        'x-api-key': 'QXJlIHlvdSBvdXIgbmV3IGZyb250LWVuZCBzb2Z0d2FyZSBlbmdpbmVlciwgVGhva296aWxlPw=='
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    // const arraData = JSON.stringify(data)
                    // console.log('arraData: ->> ',arraData)

                    // console.log('response: ',data)

                    const dataKeys = Object.values(data);
                    console.log('dataKeys: ',dataKeys)

                    setTapes(data);

                    const tapeKeys =           Object.keys(data)
                    console.log('tapes: ->> ', tapes)

                    const sortedValues = data.map((tape: { [x: string]: any; }, index: any) => {
                        const tapeKey = Object.keys(tape)

                        const tapeData = tape[tapeKey[0]];

                        return tapeData
                        // return tapeData.map((tape, index) => {
                        //     tape[index]
                        // })
                    })

                    const objects = sortedValues.map((tape: { [x: string]: any; }, index: string | number) => {
                        console.log('tape =>>', tape)
                        console.log('tape size =>>', tape.length)

                        let page = ''
                        let img = ''
                        let thumb = ''
                        let playingTime = ''
                        let type = ''
                        let color = ''
                        let brand = ''

                        tape.forEach((element: any, index: any, array: any) => {
                          console.log(element); // 100, 200, 300
                          console.log(index); // 0, 1, 2
                          console.log(array); // same myArray object 3 times
                          
                          if (element.hasOwnProperty('page')){
                              page = element.page
                          } else if (element.hasOwnProperty('img')){
                              <img src={element.img} />
                          } else if (element.hasOwnProperty('thumb')){
                              thumb = element.thumb
                          } else if (element.hasOwnProperty('playingTime')){
                              playingTime = element.playingTime
                          } else if (element.hasOwnProperty('type')){
                              type = element.type
                          } else if (element.hasOwnProperty('color')){
                              color = element.color
                          } else if (element.hasOwnProperty('brand')){
                              brand = element.brand
                          }
                      });
                      
                            return {page : page,
                                 img : img,
                                 thumb : thumb,
                                 playingTime : playingTime,
                                 type : type,
                                 color : color,
                                 brand : brand}
                        })

                    setTapesFormated(objects)
                    // console.log('sortedValues: ->> ', sortedValues)
                    console.log('objects: ->> ', objects)

                } else {
                    console.error('Failed to fetch tapes:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch tapes:', error);
            }
        };

        fetchTapes();
    }, [tapes]);


        /*useEffect(() => {
            const fetchTapes = async () => {
                try {
                    const response = await fetch('/tapes.json'); // Relative path to the JSON file
                    const data = await response.json();
                    console.log('Returned data: ',data)
                    setTapes(data);
                } catch (error) {
                    console.error('Failed to fetch tapes:', error);
                }
            };

            fetchTapes();
        }, []);*/

    // @ts-ignore
    const columns = useMemo(() => COLUMNS, []);
  const data: any = useMemo(() => tapesFormated, [tapesFormated]);

  

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, setGlobalFilter } =
  useTable({
    columns,
    data,
  }, useFilters, useGlobalFilter, useSortBy)

 const {globalFilter} = state 
  return (
    <>
    <GlobalFilter filter ={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <div>
                  {column.canFilter ? column.render("Filter") :null}
                </div>
                <span>
                {column.isSorted ? (column as any).isSortedDesc ? " 🔽" : " 🔼" : ''}
                </span>
                </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {
          footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {
                footerGroup.headers.map(column =>(
                  <td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tfoot>
    </table>
    </>
  );
};

export default TapeDeck;
