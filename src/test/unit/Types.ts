import { IType } from 'types';
import { TYPE_METHOD } from '../../constants';
import { types } from '../../types/index';
const { VALIDATE, PARSE } = TYPE_METHOD;

export default () => describe('Types', () => {
  it('it throw an error if type lacks method validation or parsing function', (done) => {
    const name = 'TestType';
    const type = {
      prop1 () {},
    };
    try {
      types().set(name, type);
      done('Should throw an error');
    } catch (err) {
      done();
    }
  });
  it('it throw an error if type lacks method parsing function', (done) => {
    const name = 'TestType';
    const type = {
      prop1 () {},
      [VALIDATE]: {
        prop1 () {},
      },
    };
    try {
      types().set(name, type);
      done('Should throw an error');
    } catch (err) {
      done();
    }
  });
  it('it should succesfully add valid type to the types', () => {
    const name = 'TestType';
    const type = {
      prop1 () {},
      [VALIDATE]: {
        prop1 () {},
      },
      [PARSE]: {
        prop1 () {},
      },
    };
    const typesWrapper = types().set(name, type);
    const _type = typesWrapper.get(name) as IType;
    for (const key of Object.keys(type)) {
      (_type[VALIDATE] as IType).should.have.property(key);
      (_type[PARSE] as IType).should.have.property(key);
    }
  });
});
