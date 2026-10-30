# Loop entries

One file per release, incident or process change: `npm run new -- loop <short-name>`. Each says what you tried, what happened and what changes next. An open item here can become the next intent.

One file per entry (not one long file) means two people can add entries on different branches without a merge conflict.

## Your week
- **Demo.** Once a week, show what works to one real person. Write down what they said.
- **Retro.** Then take 15 minutes: `npm run new -- loop week-<number>`. What went well, what was hard, one thing to change.
- **Next.** Ask Claude: "Read docs/loop/. Which open item should become the next intent?"

A throw-away "spike" (a quick try to learn something) is fine on its own branch. Delete the branch afterwards, and write what you learned in the intent.
