import { parser } from '../../core/Parser';
import { createTypes } from '../../types/index';
import { schemas } from '../data/index';

export default () => describe('Parser', () => {
  it('it should parse schemas', () => {
    parser(createTypes(), schemas.valid, {});
    parser(createTypes(), schemas.invalid, {});
  });
  it.only('it should parse', () => {
      parser(createTypes(), schemas.valid, {});
  });
});
