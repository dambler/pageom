const newPage = jest.fn().mockReturnValue(() => jest.fn());
const newContext = jest.fn().mockReturnValue({ newPage });
const launch = jest.fn().mockReturnValue({ newContext });

const playwright = {
  chromium: {
    launch,
  },
};

export default playwright;
export { newPage, newContext, launch };
