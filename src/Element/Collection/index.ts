import { Page, Locator } from 'playwright';
import { PageOMElement } from '..';
import { PageOMBrowser } from '../../Browser';

type IterablePageOMElement = Omit<PageOMElement, 'all'>;

export class PageOMElementCollection implements AsyncIterable<PageOMElement> {
  private readonly context: Page | Locator;

  private readonly selector: string;

  private readonly parent?: Locator;

  public constructor(selector: string, parent?: Locator) {
    this.selector = selector;
    this.parent = parent;
    this.context = this.parent || PageOMBrowser.Page;
  }

  [Symbol.asyncIterator]() {
    let index = -1;
    let count: number;

    const { selector, parent, context } = this;
    return {
      async next(): Promise<IteratorResult<PageOMElement>> {
        count ||= await context.locator(selector).count();

        if (index > count) return { done: true, value: null };
        const value = new PageOMElement(selector, { index: index++, parent });
        return { done: false, value };
      },
    };
  }

  public map = async <T>(
    callback: (_element: IterablePageOMElement, _index: number) => Promise<T> | T
  ) =>
    async function* inner(source: AsyncIterable<IterablePageOMElement>) {
      let index = 0;
      for await (const item of source) {
        yield await callback(item, index++);
      }
    };

  /**
   * Iterates over each item executing the provided callback.
   */
  public forEach = async (
    callback: (_element: IterablePageOMElement) => Promise<void>
  ): Promise<void> => {
    for await (const element of this) callback(element);
  };

  /**
   * Finds the first element where the callback returns true.
   */
  public find = async (
    callback: (_element: PageOMElement) => Promise<boolean>
  ): Promise<IterablePageOMElement | undefined> => {
    for await (const element of this) if (await callback(element)) return element;
    return undefined;
  };

  /**
   * Finds all elements that return true from the provided callback.
   */
  public filter = async (
    callback: (_element: PageOMElement) => Promise<boolean>
  ): Promise<IterablePageOMElement[]> => {
    const filtered: IterablePageOMElement[] = [];
    for await (const element of this) {
      if (await callback(element)) filtered.push(element);
    }

    return filtered;
  };

  public get length(): Promise<number> {
    return this.context
      .locator(this.selector)
      .count()
      .then((count) => count);
  }
}
