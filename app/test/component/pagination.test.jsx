import '@testing-library/jest-dom';
import { render, screen,fireEvent } from "@testing-library/react";
import React from "react";
import Pagination from "./../../src/component/Pagination";


describe("Table tests", () => {
  it("renders pagination with correct range and total", () => {
    render(
      <Pagination
        totalSize={50}
        currentPage={1}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );

    expect(screen.getByText(/1-10 in 50 records/i)).toBeInTheDocument();
  });

  it("disables Prev button on the first page", () => {
    render(
      <Pagination
        totalSize={50}
        currentPage={1}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );

    expect(screen.getByText("Prev")).toBeDisabled();
  });

  it("enables Prev button after the first page", () => {
    render(
      <Pagination
        totalSize={50}
        currentPage={2}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );

    expect(screen.getByText("Prev")).toBeEnabled();
  });

  it("disables Next button when on last page", () => {
    render(
      <Pagination
        totalSize={50}
        currentPage={5}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("enables Next button when not on last page", () => {
    render(
      <Pagination
        totalSize={50}
        currentPage={4}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );

    expect(screen.getByText("Next")).toBeEnabled();
  });

  it("clicking Prev button calls onPrev function", () => {
    const onPrevMock = jest.fn();
    render(
      <Pagination
        totalSize={50}
        currentPage={2}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={onPrevMock}
      />
    );

    fireEvent.click(screen.getByText("Prev"));
    expect(onPrevMock).toHaveBeenCalledTimes(1);
  });

  it("clicking Next button calls onNext function", () => {
    const onNextMock = jest.fn();
    render(
      <Pagination
        totalSize={50}
        currentPage={1}
        pageSize={10}
        onNext={onNextMock}
        onPrev={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  it("handles edge case where totalSize < pageSize", () => {
    render(
      <Pagination
        totalSize={5}
        currentPage={1}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );

    // Check if the item range correctly handles smaller totalSize
    expect(screen.getByText(/1-5 in 5 records/i)).toBeInTheDocument();
  });

  it("handles edge case where totalSize is 0", () => {
    render(
      <Pagination
        totalSize={0}
        currentPage={1}
        pageSize={10}
        onNext={jest.fn()}
        onPrev={jest.fn()}
      />
    );
  });
});
