// Run with: npm run test (which runs node --test)
const test = require('node:test');
const assert = require('node:assert/strict');
const { greeting } = require('../src/greeting.js');

test('morning, afternoon and evening', () => {
  assert.equal(greeting(9), 'Good morning');
  assert.equal(greeting(14), 'Good afternoon');
  assert.equal(greeting(20), 'Good evening');
});
