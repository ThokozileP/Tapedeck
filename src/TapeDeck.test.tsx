import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TapeDeck from "./components/TapeDeck";

describe("TapeDeck", () => {
  it("renders a table with tapes", async () => {
    render(<TapeDeck />);
    
    const table = await screen.findByRole("table");
    const rows = await screen.findAllByRole("row", {}, { timeout: 5000 });
    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(1);

    const headerRow = screen.getByRole("row", { name: /brand/i });
    const brandHeader = within(headerRow).getByRole("columnheader", { name: /brand/i });
    userEvent.click(brandHeader);
    userEvent.click(brandHeader);

    const firstRow = screen.getByRole("row", { name: /brand/i });
    const brandCell = within(firstRow).getByRole("columnheader", { name: /brand/i });
    expect(brandCell).toHaveTextContent("Brand 🔽");
  });
});
