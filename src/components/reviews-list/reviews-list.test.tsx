import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeFakeComment } from '../../utils/mocks';

describe('Component: ReviewsList', () => {
  it('should render correct', () => {
    const mockComments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
    const expectedCount = 3;

    render(<ReviewsList comments={mockComments} />);

    const reviewItems = screen.getAllByRole('listitem');

    expect(reviewItems.length).toBe(expectedCount);
  });
});

