import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnonymousHeaderUserProfile from './anonymous-header-user-profile';

describe('Component: AnonymousHeaderUserProfile', () => {
  it('should render correct', () => {
    const expectedText = /Sign in/i;

    render(
      <BrowserRouter>
        <AnonymousHeaderUserProfile />
      </BrowserRouter>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

