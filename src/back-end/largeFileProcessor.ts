import { Readable } from 'stream';
import * as fs from 'fs';
import { LoggingSystem } from '../utilities/loggingSystem';

export class LargeFileProcessor {
    private chunkSize: number;
    loggingSystem: LoggingSystem;

    constructor(loggingSystem: LoggingSystem, chunkSize: number = 1024 * 1024) { // Default chunk size is 1MB
        this.loggingSystem = loggingSystem;
        this.chunkSize = chunkSize;
    }

    public async processLargeFile(filePath: string): Promise<void> {
        const fileStream = this.openFileStream(filePath);
        await this.processFile(fileStream);
    }

    public async processFile(fileStream: Readable): Promise<void> {
        for await (const chunk of fileStream) {
            await this.processChunk(chunk as Buffer);
        }
        await this.closeFileStream(fileStream);
    }

    private openFileStream(filePath: string): Readable {
        return fs.createReadStream(filePath, { highWaterMark: this.chunkSize });
    }

    private async processChunk(chunk: Buffer): Promise<void> {
        // Implementation here
        this.loggingSystem.log(`Processing chunk of size: ${chunk.length}`);
    }

    private async closeFileStream(fileStream: Readable): Promise<void> {
        return new Promise((resolve, reject) => {
            fileStream.on('close', resolve);
            fileStream.on('error', reject);
            fileStream.destroy();
        });
    }
}

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

    it('should process a large file', async () => {
        const testFilePath = path.join(__dirname, 'testFile.txt');
        fs.writeFileSync(testFilePath, 'a'.repeat(1024 * 1024 * 5)); // 5MB file

        await largeFileProcessor.processLargeFile(testFilePath);

        fs.unlinkSync(testFilePath);
    });
});
