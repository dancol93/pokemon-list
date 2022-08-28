import { convertToTitleCase } from '../../utils/convertToTitleCase';

describe('convertToTitleCase method', () => {
  it('should convert kebab-case to Title Case', () => {
    expect(convertToTitleCase('this-is-a-title')).toEqual('This Is A Title')
  })
})
