import { User, AuthToken } from "tweeter-shared";
import { Presenter, AuthView } from "./Presenter";
import { UserService } from "../model/service/UserService";

export abstract class AuthPresenter<T extends AuthView> extends Presenter<T> {
  protected _userService: UserService;

  protected constructor(view: T) {
    super(view);
    this._userService = new UserService();
  }

  public async doAuth(
    rememberMe: boolean,
    serviceCall: () => Promise<[User, AuthToken]>,
    navigateCall: () => void,
    operationDescription: string
  ) {
    try {
      this._view.setIsLoading(true);

      const [user, authToken] = await serviceCall();

      this._view.updateUserInfo(user, user, authToken, rememberMe);

      navigateCall;
    } catch (error) {
      this._view.displayErrorMessage(
        `Failed to ${operationDescription} user in because of exception: ${error}`
      );
    } finally {
      this._view.setIsLoading(false);
    }
  }
}
