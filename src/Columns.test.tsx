import React from 'react';
import { render, screen } from '@testing-library/react';
import { COLUMNS } from './components/Columns';

describe('Test COLUMNS', () => {
  test('renders all columns', () => {
    render(
      <table>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.accessor}>
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    );

    COLUMNS.forEach((column) => {
      const header = screen.getByText(column.Header);
      expect(header).toBeInTheDocument();
    });
  });
});
