import { AuthToken, RegisterRequest, User } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";
import "isomorphic-fetch";
import { StatusService } from "../../src/model/service/StatusService";

describe("postStatus", () => {
  let userService: UserService;
  let statusService: StatusService;

  beforeEach(() => {
    userService = new UserService();
    statusService = new StatusService();
  });

  it("Properly Logs in and posts a status", async () => {
    const alias: string = "@chris";
    const password: string = "pass";

    let user: User;
    let authToken: AuthToken;

    [user, authToken] = await userService.login(alias, password);
    console.log("Returned user: ", user);
    console.log("Returned AuthToken", authToken);

    expect(user).not.toBeNull();
    expect(authToken).not.toBeNull();
  });
});
