import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { withBrowserRouter } from '../../utils/mock-component';

describe('Component: NotFound page', () => {
  it('should render correct', () => {
    const expectedText = /Page not found/i;
    const preparedComponent = withBrowserRouter(<NotFound />);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
