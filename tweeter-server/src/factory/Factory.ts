import { AuthTokenDao } from "../dao/dao_interfaces/AuthTokenDao";
import { FeedDao } from "../dao/dao_interfaces/FeedDao";
import { FollowsDao } from "../dao/dao_interfaces/FollowsDao";
import { ImageDao } from "../dao/dao_interfaces/ImageDao";
import { StoryDao } from "../dao/dao_interfaces/StoryDao";
import { UserDao } from "../dao/dao_interfaces/UserDao";

export interface Factory {
  getFollowsDao(): FollowsDao;
  getUserDao(): UserDao;
  getAuthTokenDao(): AuthTokenDao;
  getImageDao(): ImageDao;
  getStoryDao(): StoryDao;
  getFeedDao(): FeedDao;
}
