import {render, screen} from '@testing-library/react'

import '@testing-library/jest-dom'
import App from "./App";

describe('header Component', () => {
    it('renders the header component', () => {
      // Render the component
      render(<App/>);
      expect(screen).toBeDefined();
      const headingElement = screen.getByText(/login/i); // case-insensitive match
      expect(headingElement).toBeInTheDocument();
    
    });
  });