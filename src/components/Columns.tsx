
interface Column {
    Header: string;
    accessor: string;
    disableFilters?: boolean;
  }

  export const COLUMNS: Column[] = [
   
    {
        Header: "Page",
        accessor: "page",
        disableFilters: true

    },
    {
        Header: "Image",
        accessor: "img",
        disableFilters: true
    },
    {
        Header: "Thumb",
        accessor: "thumb",
        disableFilters: true
    },
    {
        Header: "Play Time",
        accessor: "playingTime",
        disableFilters: false

    },
    {
        Header: "Type",
        accessor: "type",
        disableFilters: false

    },
    {
        Header: "Brand",
        accessor: "brand",
        disableFilters: false

    },
    {
        Header: "Color",
        accessor: "color",
        disableFilters: false

    },
];





