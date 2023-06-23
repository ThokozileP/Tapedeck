import React from "react";

interface ColumnFilterProps {
  column: {
    filterValue: string;
    placeholder: string;
    setFilter: (value: string) => void;
  };
}

export const ColumnFilter: React.FC<ColumnFilterProps> = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <div>
      {/* Search:{" "} */}
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="search input"
      />
    </div>
  );
};
