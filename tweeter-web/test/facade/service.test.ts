import { AuthToken } from "tweeter-shared";
import { StatusService } from "../../src/model/service/StatusService";
import "isomorphic-fetch";

describe("service", () => {
  let service: StatusService;

  beforeEach(() => {
    service = new StatusService();
  });

  it("load more story items works from the service level", async () => {
    const authToken: AuthToken = new AuthToken("token", Date.now());
    const userAlias = "alias";
    const pageSize = 10;
    const lastItem = null;

    const [status, hasMore] = await service.loadMoreStoryItems(
      authToken,
      userAlias,
      pageSize,
      lastItem
    );

    expect(status).not.toBeNull();
    expect(hasMore).not.toBeNull();
  });
});
