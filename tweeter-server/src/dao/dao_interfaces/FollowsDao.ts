import { DataPage } from "../entities/DataPage";
import { FollowEntity } from "../entities/FollowEntity";

export interface FollowsDao {
  putFollower(follower: FollowEntity): Promise<void>;

  updateFollower(
    follower: FollowEntity,
    follower_name: string,
    followee_name: string
  ): Promise<void>;

  getFollower(follower: FollowEntity): Promise<FollowEntity | undefined>;

  deleteFollower(follower: FollowEntity): Promise<void>;

  getPageOfFollowees(
    followerHandle: string,
    pageSize: number,
    lastFolloweeHandle: string | undefined
  ): Promise<DataPage<FollowEntity>>;

  getPageOfFollowers(
    followeeHandle: string,
    pageSize: number,
    lastFollowerHandle: string | undefined
  ): Promise<DataPage<FollowEntity>>;
}
