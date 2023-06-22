import React from 'react';

interface ColumnFilterProps {
  column: {
    filterValue: string;
    setFilter: (value: string) => void;
  };
}

export const ColumnFilter: React.FC<ColumnFilterProps> = ({column}) => {
  const {filterValue, setFilter} = column;
  
  return (
    <div>
      <span>
        Search: {' '}
        <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
      </span>
    </div>
  );
}

