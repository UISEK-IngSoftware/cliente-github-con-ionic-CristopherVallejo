import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

// Mock IonReactRouter to provide a Router context (MemoryRouter)
vi.mock('@ionic/react-router', () => {
  const React = require('react');
  const reactRouter = require('react-router-dom');
  return {
    IonReactRouter: ({ children }: any) => React.createElement(reactRouter.MemoryRouter, null, children),
  };
});

import App from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
