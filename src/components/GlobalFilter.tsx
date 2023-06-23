import React from "react";

interface Props {
  filter: string;
  setFilter: (value: string) => void;
}

export const GlobalFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <div>
      <span>
        Search:{" "}
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
};
