import { SYM_SCHEMA_CHECK } from '../../constants';
import { parser } from '../../core/Parser';
import types from '../../types/index';
import { schemas } from '../data/index';

export default () => describe('Parser', () => {
  it('it should parse schemas', () => {
    parser(types, schemas, {});
  });
  it('it should recognize object symbol', () => {
      const parsed = parser(types, schemas, {});
      Object.keys(parsed.UserResources).should.be.deep.equal(Object.keys(schemas.UserResources));
      parsed.UserResources.files.should.have.property(SYM_SCHEMA_CHECK as any);
      parsed.UserResources.comments.should.have.property(SYM_SCHEMA_CHECK as any);
  });
});
