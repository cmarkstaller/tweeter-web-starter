import type { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export const handler = async (
  request: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService();
  const success = await statusService.postStatus(request.token, request.status);

  return { success: success, message: "Attempted to post status" };
};
