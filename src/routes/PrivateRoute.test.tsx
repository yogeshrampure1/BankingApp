import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const DummyComponent = () => <div>Empty Component</div>;
describe('PrivateRoute', () => {
    it('should render children when user is authenticated', () => {
      render(
        <Router>
          <PrivateRoute isAuthenticated={true} redirectPath="/login">
            <DummyComponent />
          </PrivateRoute>
        </Router>
      );
  
      // Check if the MockComponent is rendered
      expect(screen.queryByText('Empty Component')).toBeTruthy();
    });
    it('should redirect to the login page when user is not authenticated', async () => {
        render(
          <Router>
            <PrivateRoute isAuthenticated={false} redirectPath="/login">
              <DummyComponent />
            </PrivateRoute>
          </Router>
        );
    
        // Wait for redirect to occur (in this case, checking for a redirect)
        await waitFor(() => expect(screen.queryByText('Empty Component/i')).toBeFalsy());
        
        // Check if the URL has changed to the login page
        expect(window.location.pathname).toBe('/login');
      });
    });
