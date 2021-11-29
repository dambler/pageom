import { Locator } from 'playwright';

export type FindByOptions = {
  skipVisibilityCheck?: boolean;
  parent?: Locator;
  index?: number;
};
