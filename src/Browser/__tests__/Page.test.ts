import { PageOMBrowser } from '..';
import { INITIALIZE_BROWSER_FIRST_ERROR } from '../constants/errors';

describe('PageOMBrowser', () => {
  describe('Page', () => {
    test('should throw an error when attempting to access Page without initializing', async () => {
      expect(() => PageOMBrowser.Page).toThrowError(INITIALIZE_BROWSER_FIRST_ERROR);
    });

    test('should not throw and error when accessing Page after initialization', async () => {
      await PageOMBrowser.initialize();
      expect(() => PageOMBrowser.Page).not.toThrow();
    });
  });
});
