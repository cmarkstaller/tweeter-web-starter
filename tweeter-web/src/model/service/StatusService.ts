import {
  AuthToken,
  FakeData,
  PagedItemRequest,
  Status,
  StatusDto,
} from "tweeter-shared";
import { ServerFacade } from "../../network/ServerFacade";

export class StatusService {
  // public async loadMoreFeedItems(
  //   authToken: AuthToken,
  //   userAlias: string,
  //   pageSize: number,
  //   lastItem: Status | null
  // ): Promise<[Status[], boolean]> {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  // }

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

  // public async loadMoreStoryItems(
  //   authToken: AuthToken,
  //   userAlias: string,
  //   pageSize: number,
  //   lastItem: Status | null
  // ): Promise<[Status[], boolean]> {
  //   // TODO: Replace with the result of calling server
  //   return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  // }

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
