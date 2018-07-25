import chai from 'chai';
import unit from './unit/index';
chai.should();

for (const test of unit) test();

