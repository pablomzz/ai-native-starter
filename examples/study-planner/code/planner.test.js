// Run with: node --test examples/study-planner/code/planner.test.js
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { addSession, weeklyTotals, parseMinutes } = require('./planner');

// A fixed "today" (Wednesday 5 Nov 2025), so the tests never depend on the real date.
const TODAY = new Date(2025, 10, 5, 12, 0);

test('totals per subject, biggest first', () => {
  let list = [];
  list = addSession(list, { subject: 'Maths', minutes: 30, at: new Date(2025, 10, 3, 18) });
  list = addSession(list, { subject: 'Chemistry', minutes: 15, at: new Date(2025, 10, 4, 18) });
  list = addSession(list, { subject: 'Maths', minutes: 45, at: new Date(2025, 10, 5, 9) });
  assert.deepEqual(weeklyTotals(list, TODAY), [
    { subject: 'Maths', minutes: 75 },
    { subject: 'Chemistry', minutes: 15 },
  ]);
});

test('Sunday 23:30 counts in the week that started the Monday before', () => {
  const sunday = new Date(2025, 10, 9, 23, 30);
  const list = addSession([], { subject: 'History', minutes: 20, at: sunday });
  assert.deepEqual(weeklyTotals(list, TODAY), [{ subject: 'History', minutes: 20 }]);
});

test('last week is left out', () => {
  const lastSunday = new Date(2025, 10, 2, 22, 0);
  const list = addSession([], { subject: 'Biology', minutes: 50, at: lastSunday });
  assert.deepEqual(weeklyTotals(list, TODAY), []);
});

test('minutes must be a whole number from 1 to 600', () => {
  for (const bad of [0, -5, 601, 'abc', '']) {
    assert.throws(() => addSession([], { subject: 'Maths', minutes: bad, at: TODAY }));
  }
});

// Guardrail added by 06-incident.md: "1h" used to become NaN and broke the totals.
test('hours are understood: "1h" is 60 and "1h30" is 90', () => {
  assert.equal(parseMinutes('1h'), 60);
  assert.equal(parseMinutes('1h30'), 90);
  const list = addSession([], { subject: 'Physics', minutes: '1h', at: TODAY });
  assert.deepEqual(weeklyTotals(list, TODAY), [{ subject: 'Physics', minutes: 60 }]);
});
