import { AuthToken, PagedItemRequest, Status, StatusDto } from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class StatusService {
  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const facade = new ServerFacade();
    const request: PagedItemRequest<StatusDto> = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };
    return facade.loadMoreFeedItems(request);
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    const facade = new ServerFacade();
    const request: PagedItemRequest<StatusDto> = {
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };
    // const res = await facade.loadMoreStoryItems(request);
    // console.log(res[0]);
    // return res;
    return facade.loadMoreStoryItems(request);
  }

  public async postStatus(
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {
    const facade = new ServerFacade();
    await facade.postStatus({ token: authToken.token, status: newStatus.dto });
  }
}
