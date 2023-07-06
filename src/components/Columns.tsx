interface Column {
    Header: string;
    accessor: string;
    disableFilters?: boolean;
    disableSortBy?: boolean;
  }

  export const COLUMNS: Column[] = [
   
    {
        Header: "Page",
        accessor: "page",
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
        disableFilters: false,
        disableSortBy: true
    },
    {
        Header: "Type",
        accessor: "type",
        disableFilters: false,
        disableSortBy: true
    },
    {
        Header: "Brand",
        accessor: "brand",
        disableFilters: false
    },
    {
        Header: "Color",
        accessor: "color",
        disableFilters: false,
        disableSortBy: true
    },
];





