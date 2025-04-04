import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { StatusEntity } from "../entities/StoryEntity";
import { DataPage } from "../entities/DataPage";
import { FeedDao } from "../dao_interfaces/FeedDao";
import { StatusDto } from "tweeter-shared";

export class FeedDynamoDBDao implements FeedDao {
  readonly tableName = "feed";

  readonly aliasAttr = "alias";
  readonly timeStampAttr = "time_stamp";
  readonly statusAttr = "status";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async putFeed(
    followerAlias: string,
    status: StatusDto
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.aliasAttr]: followerAlias,
        [this.timeStampAttr]: status.timestamp.toString(),
        [this.statusAttr]: JSON.stringify(status),
      },
    };
    // await this.client.send(new PutCommand(params));
    console.log("Putting feed into DynamoDB:", JSON.stringify(params, null, 2)); // Debugging
    try {
      await this.client.send(new PutCommand(params));
      console.log("Put item successfully!");
    } catch (error) {
      console.error("Error putting item:", error);
    }
  }

  private async executeFeedQuery(params: any): Promise<DataPage<StatusDto>> {
    const items: StatusDto[] = [];
    const data = await this.client.send(new QueryCommand(params));
    const hasMorePages = data.LastEvaluatedKey !== undefined;
    data.Items?.forEach((item) => {
      items.push(JSON.parse(item["status"].S!));
    });
    return new DataPage<StatusDto>(items, hasMorePages);
  }

  //   items.push({
  //     alias: item[this.authorAliasAttr]?.S || "",
  //     time_stamp: item[this.timeStampAttr]?.S
  //       ? Number(item[this.timeStampAttr].S) // Convert string to number
  //       : 0,
  //     post: item[this.postAttr]?.S || "",
  //   })

  public async getPageOfFeed(
    alias: string,
    pageSize: number,
    timestamp: number | undefined
  ): Promise<DataPage<StatusDto>> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `${this.aliasAttr} = :s`,
      ExpressionAttributeValues: {
        ":s": { S: alias }, // ✅ Wrap alias as an AWS string attribute
      },
      Limit: pageSize,
      ScanIndexForward: false, // ✅ Ensures most recent status appear first
      ExclusiveStartKey:
        timestamp === undefined
          ? undefined
          : {
              [this.aliasAttr]: { S: alias }, // ✅ Wrap alias as an AWS string
              [this.timeStampAttr]: { N: timestamp.toString() }, // ✅ Convert number to AWS number
            },
    };
    const data = await this.executeFeedQuery(params);
    return data;
  }
}
