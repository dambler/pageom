import { TypeActionOptions } from '../types/TypeActionOptions';
import { PageOMBrowser } from '../Browser';
import { ClickActionOptions } from '../types/ClickActionOptions';
import { FindByOptions } from '../types/FindByOptions';
import { PageOMElementCollection } from './Collection';

export class PageOMElement {
  #selector: string;

  #options: FindByOptions;

  constructor(
    selector: string,
    options: FindByOptions = { parent: undefined, index: undefined }
  ) {
    this.#selector = selector;
    this.#options = options;
  }

  /**
   * Return the Element locator. The root of the Element is based on the parent
   * parameter. If supplied, the parent is used as the root Element, otherwise
   * the Playwright Page will be the root.
   */
  get #locator() {
    const { parent, index } = this.#options;

    const root = parent || PageOMBrowser.Page;
    return index ? root.locator(this.#selector).nth(index) : root.locator(this.#selector);
  }

  /**
   *
   * @param options
   */
  public click = async (options?: ClickActionOptions) => {
    await this.#locator.click(options);
  };

  /**
   *
   * @param text
   */
  public type = async (text: string, options?: TypeActionOptions) => {
    await this.#locator.type(text, options);
  };

  public get all() {
    return new PageOMElementCollection(this.#selector, this.#options.parent);
  }

  /**
   * The playwright Locator object. This can be used if something is not yet implemented
   * in PageOM.
   */
  public get locator() {
    return this.#locator;
  }
}
