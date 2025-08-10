class RatingStarsWidthResolver {
  public static resolve(rating: number): string {
    const starsCount = Math.floor(rating);
    return `${starsCount * 20}%`;
  }
}

export default RatingStarsWidthResolver;
