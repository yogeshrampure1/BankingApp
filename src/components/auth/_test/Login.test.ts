// src/components/Login.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../Login';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Login Component', () => {
  test('renders login form with username, password, and login button', () => { 
    render(<Login />); 
  });
 
});
