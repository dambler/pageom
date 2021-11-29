import { PageOMBrowser } from '..';
import { launch, newContext, newPage } from '../../../__mocks__/playwright';

describe('PageOMBrowser', () => {
  describe('initialize', () => {
    beforeAll(async () => {
      await PageOMBrowser.initialize();
    });

    [launch, newContext, newPage].forEach((m) => {
      test(`initialize should call browser ${m.getMockName()}`, async () => {
        expect(m).toHaveBeenCalled();
      });
    });
  });
});
