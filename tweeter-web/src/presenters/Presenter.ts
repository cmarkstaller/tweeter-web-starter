import { NavigateFunction } from "react-router-dom";
import { User, AuthToken, Status } from "tweeter-shared";

export interface View {
  displayErrorMessage: (message: string) => void;
}

export interface MessageView extends View {
  displayInfoMessage: (message: string, duration: number) => void;
  clearLastInfoMessage: () => void;
}

export interface AuthView extends View {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
}

export interface ItemView<I extends Status | User> extends View {
  addItems: (newItems: I[]) => void;
}

export class Presenter<V extends View> {
  protected _view: V;

  public constructor(view: V) {
    this._view = view;
  }

  protected get view(): V {
    return this._view;
  }

  public async doFailureReportingOperation(
    operation: () => Promise<void>,
    operationDescription: string
  ) {
    try {
      await operation();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to ${operationDescription} because of exception: ${error}`
      );
    }
  }
}
