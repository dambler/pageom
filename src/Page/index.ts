import { VisitOptions } from '../types/VisitOptions';
import PageOMBrowser from '../Browser';
import { CANNOT_NAVIGATE_WITHOUT_SLUG } from './constants/errors';

export default abstract class PageOMPage {
  slug?: string;

  page = PageOMBrowser.Page;

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
