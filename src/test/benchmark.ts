import Benchmark from 'benchmark';
import { parser } from '../core/Parser';
import { patterns } from './data/index';
import types from '../types/index';
import { Validator } from '../core/_Validator';

const pat1 = parser(types, patterns, {}).PrimitiveString;
const pat2 = parser(types, patterns, {}).PrimitiveString;

const perfCheck = new Benchmark.Suite;

// add tests
perfCheck.add('Curry', function() {
  Validator(pat1, 'ABCDABCDABCDABCDABCDABCDABCDABCD');
})
.add('Bound', function() {
  Validator(pat2, 'ABCDABCDABCDABCDABCDABCDABCDABCD');
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
