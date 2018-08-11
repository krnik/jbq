import { SYM_SCHEMA_CHECK, SYM_SCHEMA_PROPERTIES } from '../../constants';
import { ISchemas, parser } from '../../core/Parser';
import { createTypes } from '../../types/index';
import { schemas } from '../data/index';

export default () => describe('Parser', () => {
  it('it should parse schemas', () => {
    parser(createTypes(), schemas, {});
  });
  it('it should recognize object symbol', () => {
      const parsed = parser(createTypes(), schemas, {});
      (parsed.UserResources[SYM_SCHEMA_PROPERTIES] as ISchemas).files.should.have.property(SYM_SCHEMA_CHECK as any);
      (parsed.UserResources[SYM_SCHEMA_PROPERTIES] as ISchemas).comments.should.have.property(SYM_SCHEMA_CHECK as any);
  });
//   it.only('asd', () => {
//     const sc = parser(createTypes(), { Name: schemas.Name }, {});
//     console.log(sc);
//   });
});
