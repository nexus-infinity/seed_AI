import { connectToGmail, connectToGoogleDrive } from '../../src/utilities/authAPI';

describe('Authentication API', () => {
    test('should connect to Gmail successfully', async () => {
        const result = await connectToGmail();
        expect(result).toBeTruthy();
    });

    test('should connect to Google Drive successfully', async () => {
        const result = await connectToGoogleDrive();
        expect(result).toBeTruthy();
    });
});