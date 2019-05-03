import pino from 'pino';
import { setLogger } from '../../src/lib';
import { LogService } from '../../src/util/log_service';
import { equal } from 'assert';

const logger = pino({ name: 'CrazyLogs' });
logger.level = 'trace';

setLogger(logger);

let called = false;
const logFn = (msg: string, ...args: unknown[]): void => {
    called = true;
    return logger.debug(msg, ...args);
};

setLogger({ debug: logFn });
const logService = new LogService(true);
logService['log']('Example log');

equal(called, true);
