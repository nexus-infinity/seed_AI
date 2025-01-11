import { LargeFileProcessor } from '../../src/back-end/largeFileProcessor';
import { LoggingSystem } from '../../src/utilities/loggingSystem';
import * as fs from 'fs';
import * as path from 'path';

describe('LargeFileProcessor', () => {
    let loggingSystem: LoggingSystem;
    let largeFileProcessor: LargeFileProcessor;

    beforeEach(() => {
        loggingSystem = new LoggingSystem();
        largeFileProcessor = new LargeFileProcessor(loggingSystem);
    });

    test('should process a large file in chunks', async () => {
        const testFilePath = path.join(__dirname, 'testFile.txt');
        fs.writeFileSync(testFilePath, 'a'.repeat(1024 * 1024)); // 1MB file
        const chunkSize = 1024; // 1 KB
        const result = await largeFileProcessor.processFile(testFilePath, chunkSize);
        
        expect(result).toBeDefined();
        expect(result.success).toBe(true);
        expect(result.processedChunks).toBeGreaterThan(0);
        fs.unlinkSync(testFilePath);
    });

    test('should handle errors during processing', async () => {
        const testFilePath = path.join(__dirname, 'nonexistentFile.txt');
        const chunkSize = 1024;

        await expect(largeFileProcessor.processFile(testFilePath, chunkSize)).rejects.toThrow();
    });

    test('should manage chunk sizes correctly', async () => {
        const testFilePath = path.join(__dirname, 'testFile.txt');
        fs.writeFileSync(testFilePath, 'a'.repeat(1024 * 1024)); // 1MB file
        const chunkSize = 2048; // 2 KB
        const result = await largeFileProcessor.processFile(testFilePath, chunkSize);
        
        expect(result.chunkSize).toBe(chunkSize);
        fs.unlinkSync(testFilePath);
    });

    it('should process a large file', async () => {
        const testFilePath = path.join(__dirname, 'testFile.txt');
        fs.writeFileSync(testFilePath, 'a'.repeat(1024 * 1024 * 5)); // 5MB file

        const result = await largeFileProcessor.processLargeFile(testFilePath);
        expect(result).toBeDefined();
        expect(result.success).toBe(true);

        fs.unlinkSync(testFilePath);
    });
});
