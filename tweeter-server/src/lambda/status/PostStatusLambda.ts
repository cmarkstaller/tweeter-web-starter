import type { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";

export const handler = async (
  request: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService(new DynamoDBFactory());
  const success = await statusService.postStatus(request.token, request.status);

  return { success: success, message: "Attempted to post status" };
};
