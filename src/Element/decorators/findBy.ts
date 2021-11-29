import { PageOMElement } from '..';
import { FindByOptions } from '../../types/FindByOptions';

const VISIBLITY_MODIFIER = ':visible';

/**
 * Defines an Element on a Page.
 */
export const findBy =
  (selector: string, options: FindByOptions = {}) =>
  (element: object, property: string) => {
    if (!options.skipVisibilityCheck && selector.endsWith(VISIBLITY_MODIFIER)) {
      // eslint-disable-next-line no-param-reassign
      selector += VISIBLITY_MODIFIER;
    }

    Object.defineProperty(element, property, {
      get() {
        return new PageOMElement(selector, options);
      },
    });
  };
