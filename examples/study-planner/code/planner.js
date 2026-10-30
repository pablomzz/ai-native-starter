// Study planner: pure functions, so they are easy to test.
'use strict';

// Accepts "45", 45, or "1h" / "1h30" (added after the incident in 06-incident.md).
function parseMinutes(value) {
  const text = String(value).trim().toLowerCase();
  const hours = /^(\d+)\s*h\s*(\d+)?\s*(m|min)?$/.exec(text);
  if (hours) return Number(hours[1]) * 60 + Number(hours[2] || 0);
  if (/^\d+$/.test(text)) return Number(text);
  return NaN;
}

function addSession(list, session) {
  const minutes = parseMinutes(session.minutes);
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 600) {
    throw new Error('Type the minutes as a number, like 45 or 1h30.');
  }
  const subject = String(session.subject || '').trim();
  if (!subject) throw new Error('Type a subject.');
  return [...list, { subject, minutes, at: session.at }];
}

// Monday 00:00 of the week that contains `day`, in local time.
function weekStart(day) {
  const d = new Date(day);
  d.setHours(0, 0, 0, 0);
  const sinceMonday = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - sinceMonday);
  return d;
}

function weeklyTotals(list, today) {
  const start = weekStart(today).getTime();
  const end = start + 7 * 24 * 60 * 60 * 1000;
  const totals = {};
  for (const s of list) {
    const t = new Date(s.at).getTime();
    if (t >= start && t < end) totals[s.subject] = (totals[s.subject] || 0) + s.minutes;
  }
  return Object.entries(totals)
    .map(([subject, minutes]) => ({ subject, minutes }))
    .sort((a, b) => b.minutes - a.minutes);
}

module.exports = { parseMinutes, addSession, weeklyTotals, weekStart };
