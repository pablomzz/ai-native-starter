// A tiny function with a test, so the feedback loop works from day one.
function greeting(hour) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

module.exports = { greeting };
