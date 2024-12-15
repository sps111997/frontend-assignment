import '@testing-library/jest-dom';
import { render, screen,fireEvent } from "@testing-library/react";
import React from "react";
import Table from "./../../src/component/Table";


describe("Table tests", () => {
    const header = ['Name', 'Age', 'Location'];
    const data = [
      { Name: 'Alice', Age: 25, Location: 'New York' },
      { Name: 'Bob', Age: 30, Location: 'Los Angeles' },
      { Name: 'Charlie', Age: 35, Location: 'Chicago' },
      { Name: 'David', Age: 40, Location: 'Houston' },
      { Name: 'Eve', Age: 45, Location: 'Phoenix' },
      { Name: 'Frank', Age: 50, Location: 'San Francisco' },
      { Name: 'Grace', Age: 55, Location: 'Seattle' },
      { Name: 'Hank', Age: 60, Location: 'Boston' },
      { Name: 'Ivy', Age: 65, Location: 'Dallas' },
      { Name: 'Jack', Age: 70, Location: 'Austin' },
    ];
  
    it('renders table with data and headers', () => {
      render(<Table header={header} data={data} />);
  
      header.forEach((column) => {
        expect(screen.getByText(column)).toBeInTheDocument();
      });

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getByText('David')).toBeInTheDocument();
      expect(screen.getByText('Eve')).toBeInTheDocument();
  
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
  
    it('handles pagination on "Next" button click', () => {
      render(<Table header={header} data={data} />);
  
      fireEvent.click(screen.getByText('Next'));
  
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();  
      expect(screen.queryByText('Bob')).not.toBeInTheDocument(); 
      expect(screen.queryByText('Charlie')).not.toBeInTheDocument();  
      expect(screen.queryByText('David')).not.toBeInTheDocument();  
      expect(screen.queryByText('Eve')).not.toBeInTheDocument(); 
      expect(screen.getByText('Frank')).toBeInTheDocument();  
      expect(screen.getByText('Grace')).toBeInTheDocument(); 
    });
  
    it('handles pagination on "Prev" button click', () => {
      render(<Table header={header} data={data} />);

      fireEvent.click(screen.getByText('Next'));
  
      fireEvent.click(screen.getByText('Prev'));
  
      expect(screen.getByText('Alice')).toBeInTheDocument();  
      expect(screen.getByText('Bob')).toBeInTheDocument();  
      expect(screen.getByText('Charlie')).toBeInTheDocument(); 
      expect(screen.getByText('David')).toBeInTheDocument();  
      expect(screen.getByText('Eve')).toBeInTheDocument(); 
    });
  
    it('does not show pagination if data is less than or equal to page size', () => {
      const smallData = [
        { Name: 'Alice', Age: 25, Location: 'New York' },
        { Name: 'Bob', Age: 30, Location: 'Los Angeles' },
        { Name: 'Charlie', Age: 35, Location: 'Chicago' },
      ];
  
      render(<Table header={header} data={smallData} />);
  
      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });
  
    it('correctly slices data on initial render (first page)', () => {
      render(<Table header={header} data={data} />);
  
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getByText('David')).toBeInTheDocument();
      expect(screen.getByText('Eve')).toBeInTheDocument();
  
      expect(screen.queryByText('Frank')).not.toBeInTheDocument();
    });
  
    it('updates the table data correctly when changing pages', () => {
      render(<Table header={header} data={data} />);
  
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Next'));

      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
      expect(screen.getByText('Frank')).toBeInTheDocument();
      expect(screen.getByText('Grace')).toBeInTheDocument();
    });
});
