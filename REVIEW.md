# Review checklist

The `reviewer` agent reads every pull request against this list, then a person decides. Report each finding with the file, the line and why it matters. Say "no findings" when there are none.

1. **Matches the plan.** Every changed file is in the plan's "Files that change", or the plan was updated.
2. **Proof exists.** The tests named in the plan's "Proof" exist and pass.
3. **No secrets.** No password, token, key or personal data in the diff or in logs.
4. **Small and focused.** One intent per pull request. Unrelated edits go in their own change.
5. **Readable.** Names say what things are. Docs follow `plain-language`.
6. **Safe to undo.** It is clear how to roll this back.
7. **Works for everyone.** Every button and form field has a label, and the page still works on a phone-sized screen.
8. **Checks still check.** No existing test was weakened or deleted, no check was skipped (`--no-verify`), and CI and the npm scripts still run the tests. If one did change, the pull request says why the old check was wrong.
