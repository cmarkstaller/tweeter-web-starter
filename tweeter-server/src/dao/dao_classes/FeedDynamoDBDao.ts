// import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
// import { StatusDao } from "../dao_interfaces/StatusDao";
// import { StatusEntity } from "../entities/StoryEntity";
// import { DataPage } from "../entities/DataPage";
// import { StoryDao } from "../dao_interfaces/StoryDao";

// export class FeedDynamoDBDao implements FeedDao {
//   readonly tableName = "story";

//   readonly aliasAttr = "alias";
//   readonly timeStampAttr = "time_stamp";
//   readonly postAttr = "post";

//   private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

//   public async putFeed(status: StatusEntity): Promise<void> {
//     const params = {
//       TableName: this.tableName,
//       Item: {
//         [this.aliasAttr]: status.alias,
//         [this.timeStampAttr]: status.time_stamp,
//         [this.postAttr]: status.post,
//       },
//     };
//     await this.client.send(new PutCommand(params));
//   }

//   private async executeStoryQuery(
//     params: any
//   ): Promise<DataPage<StatusEntity>> {
//     const items: StatusEntity[] = [];
//     const data = await this.client.send(new QueryCommand(params));
//     const hasMorePages = data.LastEvaluatedKey !== undefined;
//     data.Items?.forEach((item) =>
//       items.push({
//         alias: item[this.aliasAttr]?.S || "",
//         time_stamp: item[this.timeStampAttr]?.N
//           ? Number(item[this.timeStampAttr].N)
//           : 0,
//         post: item[this.postAttr]?.S || "",
//       })
//     );
//     return new DataPage<StatusEntity>(items, hasMorePages);
//   }

//   public async getPageOfStories(
//     alias: string,
//     pageSize: number,
//     timestamp: number | undefined
//   ): Promise<DataPage<StatusEntity>> {
//     const params = {
//       TableName: this.tableName,
//       KeyConditionExpression: `${this.aliasAttr} = :s`,
//       ExpressionAttributeValues: {
//         ":s": { S: alias }, // ✅ Wrap alias as an AWS string attribute
//       },
//       Limit: pageSize,
//       ScanIndexForward: false, // ✅ Ensures most recent stories appear first
//       ExclusiveStartKey:
//         timestamp === undefined
//           ? undefined
//           : {
//               [this.aliasAttr]: { S: alias }, // ✅ Wrap alias as an AWS string
//               [this.timeStampAttr]: { N: timestamp.toString() }, // ✅ Convert number to AWS number
//             },
//     };
//     const data = await this.executeStoryQuery(params);
//     return data;
//   }
// }
