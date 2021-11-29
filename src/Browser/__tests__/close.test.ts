import { PageOMBrowser } from '..';
import { close } from '../../../__mocks__/playwright';
import { INITIALIZE_BROWSER_FIRST_ERROR } from '../constants/errors';

describe('PageOMBrowser', () => {
  describe('close', () => {
    test('should call playwright browser close', async () => {
      await PageOMBrowser.initialize();
      await PageOMBrowser.close();
      expect(close).toHaveBeenCalled();
    });

    test('should throw an error when attempting to close without initializing', async () => {
      await expect(async () => PageOMBrowser.close()).rejects.toThrowError(
        INITIALIZE_BROWSER_FIRST_ERROR
      );
    });
  });
});
