/* eslint-disable no-console */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const log = (level: LogLevel, message: string, ...args: unknown[]) => {
  if (process.env.NODE_ENV === 'production' && level === 'debug') return;

  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  switch (level) {
    case 'error':
      console.error(formattedMessage, ...args);
      break;
    case 'warn':
      console.warn(formattedMessage, ...args);
      break;
    case 'debug':
      console.debug(formattedMessage, ...args);
      break;
    default:
      console.log(formattedMessage, ...args);
  }
};

export const logger = {
  info: (msg: string, ...args: unknown[]) => log('info', msg, ...args),
  warn: (msg: string, ...args: unknown[]) => log('warn', msg, ...args),
  error: (msg: string, ...args: unknown[]) => log('error', msg, ...args),
  debug: (msg: string, ...args: unknown[]) => log('debug', msg, ...args),
};
