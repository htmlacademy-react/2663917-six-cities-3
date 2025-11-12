import { render, screen } from '@testing-library/react';
import AnonymousHeaderUserProfile from './anonymous-header-user-profile';
import { withBrowserRouter } from '../../utils/mock-component';

describe('Component: AnonymousHeaderUserProfile', () => {
  it('should render correct', () => {
    const expectedText = 'Sign in';

    const preparedComponent = withBrowserRouter(<AnonymousHeaderUserProfile />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

