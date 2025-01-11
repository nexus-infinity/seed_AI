import { logMessage, logError } from '../../src/utilities/loggingSystem';

describe('Logging System', () => {
    beforeEach(() => {
        // Clear any previous logs if necessary
    });

    test('should log a message correctly', () => {
        const message = 'This is a test message';
        logMessage(message);
        // Add assertions to verify the message was logged
    });

    test('should log an error correctly', () => {
        const error = new Error('This is a test error');
        logError(error);
        // Add assertions to verify the error was logged
    });
});