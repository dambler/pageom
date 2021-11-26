describe('PageOMBrowser', () => {});

// describe('PageOMBrowser', () => {
//   const newPage = jest.fn().mockReturnValue(() => jest.fn());
//   const newContext = jest.fn().mockReturnValue({ newPage });
//   const close = jest.fn();
//   const options: PageOMBrowserOptions = {
//     browserType: {
//       launch: jest.fn().mockReturnValue({ newContext, close }),
//     } as unknown as BrowserType,
//     launchOptions: { headless: true },
//     contextOptions: {},
//   };

//   describe('default launch options', () => {
//     test('can initialize with default parameters', async () => {
//       PageOMBrowser.initialize();
//       expect(playwrightMock.launch).toHaveBeenCalled();
//       expect(playwrightMock.newContext).toHaveBeenCalled();
//       expect(playwrightMock.newPage).toHaveBeenCalled();
//     });
//   });

//   describe('initialize', () => {
//     describe('using default launch options', () => {
//       beforeEach(async () => {
//         PageOMBrowser.initialize();
//       });

//       test('should call browser launch with default launch options', () => {
//         expect(playwrightMock.launch).toHaveBeenCalled();
//         expect(playwrightMock.launch).toHaveBeenCalledWith(
//           DEFAULT_LAUNCH_OPTIONS.launchOptions
//         );
//       });

//       test('should call create new context', () => {
//         expect(playwrightMock.newContext).toHaveBeenCalled();
//       });

//       test('should call create new page', () => {
//         expect(playwrightMock.newPage).toHaveBeenCalled();
//       });

//       test('should be able to retrieve Page after initialization', () => {
//         expect(PageOMBrowser.Page).not.toThrow();
//       });
//     });

//     describe('using provided launch options', () => {
//       beforeEach(async () => {
//         PageOMBrowser.initialize(options);
//       });

//       test('should call browser launch with provided launch options', () => {
//         expect(options.browserType.launch).toHaveBeenCalled();
//         expect(options.browserType.launch).toHaveBeenCalledWith(options.launchOptions);
//       });

//       test('should call create new context', () => {
//         expect(newContext).toHaveBeenCalled();
//       });

//       test('should call create new page', () => {
//         expect(newPage).toHaveBeenCalled();
//       });

//       test('should be able to retrieve Page after initialization', () => {
//         expect(PageOMBrowser.Page).not.toThrow();
//       });
//     });
//   });

//   describe('close', () => {
//     test('should call browser close', async () => {
//       await PageOMBrowser.close();
//       expect(close).toHaveBeenCalled();
//     });
//   });

//   test('should throw error when calling close before initializing', async () => {
//     await expect(async () => await PageOMBrowser.close()).rejects.toThrow(
//       INITIALIZE_BROWSER_FIRST_ERROR
//     );
//   });

//   test('should throw error when attempting to call Page before initializing', () => {
//     expect(() => PageOMBrowser.Page).toThrowError(INITIALIZE_BROWSER_FIRST_ERROR);
//   });
// });
