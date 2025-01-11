import { runCLI } from './front-end/cli';
import { WorkflowManager } from './middle-end/workflowManager';
import { TaskQueue } from './middle-end/taskQueue';
import { FileScanner } from './back-end/fileScanner';
import { MetadataExtractor } from './back-end/metadataExtractor';
import { LargeFileProcessor } from './back-end/largeFileProcessor';
import { LoggingSystem } from './utilities/loggingSystem';
import { AuthAPI } from './utilities/authAPI';
import { ErrorHandling } from './utilities/errorHandling';

// Initialize components
const loggingSystem = new LoggingSystem();
const authAPI = new AuthAPI();
const errorHandling = new ErrorHandling();
const fileScanner = new FileScanner(loggingSystem);
const metadataExtractor = new MetadataExtractor(loggingSystem);
const largeFileProcessor = new LargeFileProcessor(loggingSystem);
const taskQueue = new TaskQueue(loggingSystem);
const workflowManager = new WorkflowManager(taskQueue, loggingSystem);
runCLI(workflowManager, loggingSystem);
