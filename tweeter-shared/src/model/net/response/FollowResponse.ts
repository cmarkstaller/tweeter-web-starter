import { TweeterResponse } from "./TweeterResponse";

export interface FollowResponse extends TweeterResponse {
  readonly numFollower: number;
  readonly numFollowee: number;
}
