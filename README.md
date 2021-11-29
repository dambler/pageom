# PageOM

Page Object Model framework for Playwright.dev.

Still very much work in progress and isn't ready for general use yet.

# Page Class Example

```
// login.page.ts
import { findBy, PageOMPage, PageOMElement } from 'pageom'

class LoginPage extends PageOMPage {
  slug = "/login"

  @findBy('.login-btn') submitButton: PageOMElement;

  @findBy('.username) usernameField: PageOMElement;

  @findBy('.password) passwordField: PageOMElement;

  /*
   * Attempt to log in to a users account using the provided credentials.
   */
  public login = async ({ username, password }: LoginCredentials) => {
    await this.usernameField.type(username);
    await this.passwordField.type(password);
    await this.submitButton.click();
  }
}
```
