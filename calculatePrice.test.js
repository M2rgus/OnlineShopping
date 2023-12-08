const {
  applyAgeRestrictions,
  applyProductPriceRules,
  generateProductPrice,
  calculateProductPrice,
} = require('./calculatePrice');

describe('Functionality Tests for applyAgeRestrictions()', () => {
  test('Deny access: age 25 and product type C', () => {
    expect(applyAgeRestrictions(25, 'C')).toBe(false);
  });

  test('Allow access: age 26 and product type D', () => {
    expect(applyAgeRestrictions(26, 'D')).toBe(true);
  });

  test('Allow access: age 26 and product type C', () => {
    expect(applyAgeRestrictions(26, 'C')).toBe(true);
  });

  test('Deny access: age under 21', () => {
    expect(applyAgeRestrictions(20, 'A')).toBe(false);
  });
});

describe('Functionality Tests for applyProductPriceRules()', () => {
  test('Calculate price for product D, hasReturns true, isLoyaltyMember true', () => {
    expect(applyProductPriceRules(100, 'D', true, true)).toBe(243);
  });

  test('Calculate price for product A, hasReturns false, isLoyaltyMember false', () => {
    expect(applyProductPriceRules(100, 'A', false, false)).toBe(100);
  });

  test('Calculate price for product B, hasReturns true, isLoyaltyMember false', () => {
    expect(applyProductPriceRules(100, 'B', true, false)).toBe(250);
  });

  test('Calculate price for product C, hasReturns false, isLoyaltyMember true', () => {
    expect(applyProductPriceRules(100, 'C', false, true)).toBe(90);
  });
});

describe('Functionality Tests for generateProductPrice()', () => {
  test('Generate price for age 20', () => {
    expect(generateProductPrice(20)).toBe(35);
  });

  test('Generate price for age 30', () => {
    expect(generateProductPrice(30)).toBe(45);
  });

  test('Generate price for age 50', () => {
    expect(generateProductPrice(50)).toBe(65);
  });
});

describe('Functionality Tests for calculateProductPrice()', () => {
  test('Check exceeded price: age 10000, product type D, hasReturns true, isLoyaltyMember false', () => {
    expect(calculateProductPrice(10000, 'D', true, false)).toBe("Maximum price exceeded: $2000");
  });
});
