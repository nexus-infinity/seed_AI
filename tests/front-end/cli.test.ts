import { startFileScanning, displayProgress } from '../../src/front-end/cli';

describe('CLI Functionality', () => {
    test('should start file scanning process', () => {
        const result = startFileScanning();
        expect(result).toBeDefined();
        expect(result).toEqual(expect.stringContaining('Scanning started'));
    });

    test('should display progress updates', () => {
        const progress = displayProgress(50);
        expect(progress).toBeDefined();
        expect(progress).toEqual('Progress: 50%');
    });
});