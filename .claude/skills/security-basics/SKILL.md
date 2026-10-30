---
name: security-basics
description: Use whenever code handles passwords, tokens, personal data, user input, file uploads, payments, or adds a new dependency or GitHub workflow.
---
# Security basics

1. **Secrets** live in environment variables, never in files or commits. `.env` files are in `.gitignore`.
2. **User input** is never trusted. Escape it before showing it on a page; validate it before saving it.
3. **Personal data**: collect only what the intent needs. Never write it to logs or error messages.
4. **Dependencies**: add one only when the spec needs it. Prefer well-known packages. Say why in the plan.
5. **Access**: a user can only read and change their own data.
6. **Workflows**: GitHub Actions use the least permissions they need (`permissions: contents: read`).
7. **Data stays on the device**: the page keeps data in the browser (such as localStorage). Sending data to a server needs its own intent first.

This skill is advice. The hooks in `tools/hooks/` enforce rules 1 and part of 6 so they hold even when this skill is skipped.
