import PageomPage from '.';
import PageomBrowser from '../Browser';

class DummyPage extends PageomPage {}

describe('PageomPage', () => {
  describe('visit', () => {
    test('should call Page goto', async () => {
      const goto = jest.fn();
      const dummyPage = new DummyPage({
        initialize: jest.fn(),
        Page: { goto },
      } as unknown as PageomBrowser);
      await dummyPage.visit();
      expect(goto).toHaveBeenCalled();
    });
  });
});
