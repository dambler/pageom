import playwright from 'playwright';

import PageomBrowser from '../Browser';
import { WaitUntilValues } from '../types/WaitUntilValues';

export default abstract class PageomPage {
  slug: string = '';

  page: playwright.Page;

  constructor(browser: PageomBrowser) {
    this.page = browser.Page;
  }

  visit = async (options?: {
    referer?: string;
    timeout?: number;
    waitUntil?: WaitUntilValues;
  }) => this.page.goto(this.slug, options);
}
