import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { AuthPresenter } from "./AuthPresenter";
import { AuthView, Presenter } from "./Presenter";

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

  private _userService: UserService;

  public constructor(view: AuthView) {
    super(view);
    this._userService = new UserService();
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl: string
  ) {
    await this.doAuth(
      rememberMe,
      () => this.serviceCall(alias, password),
      () => this.navigateCall,
      "login"
    );

    // await this.doAuth(
    //   rememberMe,
    //   () => {
    //     return this._userService.login(alias, password);
    //   },
    //   () => {
    //     if (!!originalUrl) {
    //       this._view.navigate(originalUrl);
    //     } else {
    //       this._view.navigate("/");
    //     }
    //   },
    //   "log"
    // );

    //   try {
    //     this._view.setIsLoading(true);

    //     const [user, authToken] = await this._userService.login(alias, password);

    //     this._view.updateUserInfo(user, user, authToken, rememberMe);

    //     if (!!originalUrl) {
    //       this._view.navigate(originalUrl);
    //     } else {
    //       this._view.navigate("/");
    //     }
    //   } catch (error) {
    //     this._view.displayErrorMessage(
    //       `Failed to log user in because of exception: ${error}`
    //     );
    //   } finally {
    //     this._view.setIsLoading(false);
    //   }
    // }
  }
}
