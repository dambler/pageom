const newPage = jest
  .fn()
  .mockReturnValue(() => jest.fn())
  .mockName('newPage');
const close = jest.fn().mockName('close');
const newContext = jest.fn().mockReturnValue({ newPage }).mockName('newContext');
const launch = jest.fn().mockReturnValue({ newContext, close }).mockName('launch');

const chromium = {
  launch,
};

export { newPage, newContext, launch, close, chromium };
