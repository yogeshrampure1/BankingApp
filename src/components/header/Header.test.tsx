import {render, screen} from '@testing-library/react'

import '@testing-library/jest-dom'
import Header from "./Header";

describe('header Component', () => {
    it('renders the header component', () => {
      // Render the component
      render(<Header userName= {"Sundar"}/>);
      const headingElement = screen.getByText(/sundar/i); // case-insensitive match
      expect(headingElement).toBeInTheDocument();
    
    });
  });