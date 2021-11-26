import playwright from 'playwright';
import { VisitOptions } from '../types/VisitOptions';
import PageomBrowser from '../Browser';
import { CANNOT_NAVIGATE_WITHOUT_SLUG } from './constants/errors';

export default abstract class PageomPage {
  slug?: string;

  page: playwright.Page;

  constructor(browser: PageomBrowser) {
    this.page = browser.Page;
  }

  /**
   * Navigates directly to the page. Requires the Page to have a slug set.
   */
  public visit = async (options?: VisitOptions) => {
    if (!this.slug) {
      throw new Error(CANNOT_NAVIGATE_WITHOUT_SLUG);
    }

    return this.page.goto(this.slug, options);
  };
}
