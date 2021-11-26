import { Locator } from 'playwright';

type FindByOptions = {
  skipVisibilityCheck?: boolean;
  parent?: Locator;
  index?: number;
};

export default FindByOptions;
