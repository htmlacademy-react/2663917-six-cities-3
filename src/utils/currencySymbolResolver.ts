class CurrencySymbolResolver {
  private static readonly _symbols: Record<string, string> = {
    euro: '€'
  };

  public static resolve(currencyCode: string): string {
    return this._symbols[currencyCode] || '';
  }
}

export default CurrencySymbolResolver;
