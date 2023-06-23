import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { GlobalFilter } from "./components/GlobalFilter";

describe("GlobalFilter", () => {
  test("renders input element with correct value", () => {
    const filter = "search term";
    const setFilter = jest.fn();
    render(<GlobalFilter filter={filter} setFilter={setFilter} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(filter);
  });

  test("calls setFilter when input value changes", () => {
    const filter = "";
    const setFilter = jest.fn();
    render(<GlobalFilter filter={filter} setFilter={setFilter} />);
    const inputElement = screen.getByRole("textbox");
    const newFilterValue = "new search term";
    fireEvent.change(inputElement, { target: { value: newFilterValue } });
    expect(setFilter).toHaveBeenCalledTimes(1);
    expect(setFilter).toHaveBeenCalledWith(newFilterValue);
  });
});
