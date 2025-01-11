import * as fs from 'fs';
import * as path from 'path';
import { WorkflowManager } from '../middle-end/workflowManager';
import { LoggingSystem } from '../utilities/loggingSystem';

export function startFileScanning(directory: string): void {
    console.log(`Starting file scanning in directory: ${directory}`);
    const files = [];
    function walkDir(currentPath: string) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) walkDir(fullPath);
            else files.push(fullPath);
        }
    }
    walkDir(directory);
    console.log(`Found ${files.length} files.`);
}

export function displayProgress(current: number, total: number): void {
    const percentage = ((current / total) * 100).toFixed(2);
    console.log(`Progress: ${current} of ${total} files scanned (${percentage}%)`);
}

export function runCLI(workflowManager: WorkflowManager, loggingSystem: LoggingSystem): void {
    // Implementation of runCLI
    console.log('Running CLI...');
    // Example usage of workflowManager and loggingSystem
    loggingSystem.log('CLI started');
    workflowManager.start();
}
