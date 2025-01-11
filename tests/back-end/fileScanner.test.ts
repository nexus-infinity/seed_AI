import { FileScanner } from '../../src/back-end/fileScanner';

describe('FileScanner', () => {
    let fileScanner: FileScanner;

    beforeEach(() => {
        fileScanner = new FileScanner();
    });

    test('should scan a directory and return categorized files', async () => {
        const result = await fileScanner.scanDirectory('/path/to/test/directory');
        expect(result).toHaveProperty('categorizedFiles');
        expect(Array.isArray(result.categorizedFiles)).toBe(true);
    });

    test('should handle empty directories', async () => {
        const result = await fileScanner.scanDirectory('/path/to/empty/directory');
        expect(result.categorizedFiles).toEqual([]);
    });

    test('should categorize files correctly', async () => {
        const result = await fileScanner.scanDirectory('/path/to/test/directory');
        // Assuming the expected categories are 'images', 'documents', etc.
        expect(result.categorizedFiles).toContainEqual(expect.objectContaining({ category: 'images' }));
        expect(result.categorizedFiles).toContainEqual(expect.objectContaining({ category: 'documents' }));
    });

    test('should throw an error for invalid directory', async () => {
        await expect(fileScanner.scanDirectory('/invalid/path')).rejects.toThrow('Invalid directory path');
    });
});