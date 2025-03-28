import {
  PagedItemRequest,
  RegisterRequest,
  UserDto,
  UserRequest,
} from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";
import "isomorphic-fetch";

describe("facade", () => {
  let facade: ServerFacade;

  beforeEach(() => {
    facade = new ServerFacade();
  });

  it("Properly Registering a user", async () => {
    const request: RegisterRequest = {
      token: "fakeToken",
      alias: "alias",
      password: "password",
      firstName: "firstName",
      lastName: "lastName",
      userImageBytes: "my image",
      imageFileExtension: "fileEXT",
    };
    const [user, authToken] = await facade.register(request);
    expect(user).not.toBeNull();
    expect(authToken).not.toBeNull();
  });

  it("get more followers returns users and a boolean has more value", async () => {
    const request: PagedItemRequest<UserDto> = {
      token: "fakeToken",
      userAlias: "fakeUser",
      pageSize: 10,
      lastItem: null,
    };
    const [items, hasMore] = await facade.getMoreFollowers(request);
    expect(items).not.toBeNull();
    expect(hasMore).not.toBeNull();
  });

  it("Get Follower Count", async () => {
    const request: UserRequest = {
      token: "fakeToken",
      user: {
        alias: "alias",
        firstName: "firstName",
        lastName: "lastName",
        imageUrl: "imageUrl",
      },
    };
    const num = await facade.getFollowerCount(request);
    expect(typeof num).toBe("number");
  });
});
