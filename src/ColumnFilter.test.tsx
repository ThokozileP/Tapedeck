import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColumnFilter } from './components/ColumnFilter';

describe('ColumnFilter', () => {
  const column = {
    filterValue: '',
    placeholder: 'search...',
    setFilter: jest.fn(),
  };

  it('renders an input element', () => {
    render(<ColumnFilter column={column} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders an input element with the correct props', () => {
    render(<ColumnFilter column={column} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('value', column.filterValue);
  });

  it('calls setFilter when the input value changes', () => {
    render(<ColumnFilter column={column} />);
    const input = screen.getByRole('textbox');
    const newValue = 'new value';
    fireEvent.change(input, { target: { value: newValue } });
    expect(column.setFilter).toHaveBeenCalledWith(newValue);
  });
});
