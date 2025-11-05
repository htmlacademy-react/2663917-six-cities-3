import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeFakeComment } from '../../utils/mocks';

describe('Component: Review', () => {
  it('should render correct', () => {
    const mockComment = makeFakeComment();

    render(<Review comment={mockComment} />);

    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
  });
});

