import { orders } from './orders';

describe('loginFlow', () => {
  it('should return the initial state', () => {
    const expectedResult = [];
    const result = orders(undefined, ['order']);
    expect(result).toEqual(expectedResult)
  })
});