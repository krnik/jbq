import { SYM_SCHEMA_CHECK } from '../../constants';
import { parser } from '../../core/Parser';
import { parserFN } from '../../core/ParserFN';
import { createTypes } from '../../types/index';
import { schemas } from '../data/index';

export default () => describe('Parser', () => {
  it('it should parse schemas', () => {
    parser(createTypes(), schemas, {});
  });
  it('it should recognize object symbol', () => {
      const parsed = parser(createTypes(), schemas, {});
      Object.keys(parsed.UserResources).should.be.deep.equal(Object.keys(schemas.UserResources));
      parsed.UserResources.files.should.have.property(SYM_SCHEMA_CHECK as any);
      parsed.UserResources.comments.should.have.property(SYM_SCHEMA_CHECK as any);
  });
  it.only('asd', () => {
    const sc = parserFN(createTypes(), { Name: schemas.Name }, {})
  });
});
