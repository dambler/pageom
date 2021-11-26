import { findBy, PageOMPage } from '.';
import PageOMElement from './Element';

export default class TestingPage extends PageOMPage {
  @findBy('.selector') element: PageOMElement;

  public doSomething = async () => {
    await this.element.click();
  };
}
