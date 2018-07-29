import chai from 'chai';
import { unitTests } from './unit/index';
chai.should();

for (const test of unitTests) test();
