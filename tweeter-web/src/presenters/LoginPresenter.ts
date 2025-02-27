import { User, AuthToken } from "tweeter-shared";
import { AuthPresenter } from "./AuthPresenter";
import { AuthView } from "./Presenter";

export class LoginPresenter extends AuthPresenter<AuthView> {
  protected serviceCall(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]> {
    return this._userService.login(alias, password);
  }
  protected navigateCall(originalUrl: string): void {
    if (!!originalUrl) {
      this._view.navigate(originalUrl);
    } else {
      this._view.navigate("/");
    }
  }

  public constructor(view: AuthView) {
    super(view);
  }

  public async doLogin(alias: string, password: string, originalUrl: string) {
    console.log("Doing do login");
    await this.doAuth(
      this._rememberMe,
      () => this.serviceCall(alias, password),
      () => this.navigateCall(originalUrl),
      "login"
    );
  }
}
