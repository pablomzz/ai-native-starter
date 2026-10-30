# Review checklist

The `reviewer` agent reads every pull request against this list, then a person decides. Report each finding with the file, the line and why it matters. Say "no findings" when there are none.

1. **Matches the plan.** Every changed file is in the plan's "Files that change", or the plan was updated.
2. **Proof exists.** The tests named in the plan's "Proof" exist and pass.
3. **No secrets.** No password, token, key or personal data in the diff or in logs.
4. **Small and focused.** One intent per pull request. Unrelated edits go in their own change.
5. **Readable.** Names say what things are. Docs follow `plain-language`.
6. **Safe to undo.** It is clear how to roll this back.
7. {{ADD_A_RULE_YOUR_PROJECT_NEEDS}}
