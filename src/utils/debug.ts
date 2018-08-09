const DEBUG_ENV = process && process.env && process.env.NODE_ENV === 'debug';

export function debug (col: string, msg: string, indent?: string) {
  if (!DEBUG_ENV) return;
  const colors: { [k: string]: string } = {
      reset: '\x1b[0m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
  };
  return process.stdout.write(`${colors[col]}${indent || ''}${msg}${colors.reset}\n`);
}
