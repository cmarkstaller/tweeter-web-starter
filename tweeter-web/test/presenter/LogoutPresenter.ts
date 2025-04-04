import { AuthToken } from "tweeter-shared";
import {
  LogoutPresenter,
  LogoutView,
} from "../../src/presenters/LogoutPresenter";
import {
  instance,
  mock,
  verify,
  spy,
  when,
  anything,
} from "@typestrong/ts-mockito";
import { UserService } from "../../src/model/service/UserService";

describe("LogoutPresenter", () => {
  let mockLogoutPresenterView: LogoutView;
  let logoutPresenter: LogoutPresenter;
  let mockUserService: UserService;

  const authToken = new AuthToken("abc123", Date.now());

  beforeEach(() => {
    mockLogoutPresenterView = mock<LogoutView>();
    const mockLogoutPresenterViewInstance = instance(mockLogoutPresenterView);

    const logoutPresenterSpy = spy(
      new LogoutPresenter(mockLogoutPresenterViewInstance)
    );
    logoutPresenter = instance(logoutPresenterSpy);

    mockUserService = mock<UserService>();
    const mockUserServiceInstance = instance(mockUserService);

    when(logoutPresenterSpy.userService).thenReturn(mockUserServiceInstance);
  });

  it("Tells the view to display a logging out message", async () => {
    await logoutPresenter.logOut(authToken);
    verify(
      mockLogoutPresenterView.displayInfoMessage("Logging Out...", 0)
    ).once();
  });

  it("calls logout on the user service with the correct auth token", async () => {
    await logoutPresenter.logOut(authToken);
    verify(mockUserService.logout(authToken)).once();
  });

  it("tells the view ot clear the last info message, clear the user info when logout is successful", async () => {
    await logoutPresenter.logOut(authToken);

    verify(mockLogoutPresenterView.clearLastInfoMessage()).once();
    verify(mockLogoutPresenterView.clearUserInfo()).once();

    verify(mockLogoutPresenterView.displayErrorMessage(anything())).never();
  });

  it("Displays an error message and does not clear the last info message, clear the user info when logout fails", async () => {
    const error = new Error("An error occured");
    when(mockUserService.logout(authToken)).thenThrow(error);

    await logoutPresenter.logOut(authToken);

    verify(
      mockLogoutPresenterView.displayErrorMessage(
        "Failed to log user out because of exception: An error occured"
      )
    ).once();

    verify(mockLogoutPresenterView.clearLastInfoMessage()).never();
    verify(mockLogoutPresenterView.clearUserInfo()).never();
  });
});
