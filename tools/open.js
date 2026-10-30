// node tools/open.js <file>: open a file in the default app on Windows, macOS or Linux.
'use strict';
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const file = path.resolve(process.argv[2] || 'src/index.html');
if (!fs.existsSync(file)) { console.log(`${file} does not exist yet.`); process.exit(1); }
const [cmd, args] =
  process.platform === 'win32' ? ['cmd', ['/c', 'start', '""', file]]
  : process.platform === 'darwin' ? ['open', [file]]
  : ['xdg-open', [file]];
const child = spawn(cmd, args, { stdio: 'ignore', detached: true });
child.on('error', () => console.log(`Could not open it automatically. Open this file in your browser: ${file}`));
child.unref();
console.log(`Opening ${file}`);
