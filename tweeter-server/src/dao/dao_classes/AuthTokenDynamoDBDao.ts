import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  DeleteCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { AuthTokenDao } from "../dao_interfaces/AuthTokenDao";
import { AuthTokenEntity } from "../entities/AuthTokenEntity";

export class AuthTokenDynamoDBDao implements AuthTokenDao {
  readonly tableName = "authTokens";
  readonly aliasAttr = "alias";
  readonly tokenAttr = "token";
  readonly timeStampAttr = "time_stamp";
  readonly TIMEOUT = 60000;

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  public async putAuthToken(authToken: AuthTokenEntity): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.aliasAttr]: authToken.alias,
        [this.tokenAttr]: authToken.token,
        [this.timeStampAttr]: authToken.timeStamp,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  public async getAuthToken(
    token: string
  ): Promise<AuthTokenEntity | undefined> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(token),
    };
    const output = await this.client.send(new GetCommand(params));
    return output.Item == undefined
      ? undefined
      : {
          alias: output.Item[this.aliasAttr],
          token: output.Item[this.tokenAttr],
          timeStamp: output.Item[this.timeStampAttr],
        };
  }

  public async updateAuthToken(
    token: string,
    timeStamp: number
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: this.generateTokenItem(token),
      ExpressionAttributeValues: {
        ":timeStamp": timeStamp,
      },
      UpdateExpression: "SET " + this.timeStampAttr + " = :timeStamp",
    };
    await this.client.send(new UpdateCommand(params));
  }

  public async deleteAuthToken(token: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.tokenAttr]: token,
      },
    };
    await this.client.send(new DeleteCommand(params));
  }

  public async checkAuthToken(token: string): Promise<boolean> {
    await this.deleteExpiredAuthTokens();

    const authTokenEntity = await this.getAuthToken(token);

    if (!authTokenEntity) {
      return false;
    } else {
      this.updateAuthToken(token, Date.now());
      return true;
    }

    // const time = authTokenEntity.timeStamp;
    // if (Date.now() - time > this.TIMEOUT) {
    //   await this.deleteAuthToken(token);
    //   return false;
    // } else {
    //   this.updateAuthToken(token, Date.now());
    //   return true;
    // }
  }

  // public async getAllAuthTokens(): Promise<AuthTokenEntity[]> {
  //   const params = {
  //     TableName: this.tableName,
  //   };
  //   const output = await this.client.send(new ScanCommand(params));

  //   return (
  //     output.Items?.map((item) => ({
  //       alias: item[this.aliasAttr]?.S ?? "", // Extract string value
  //       token: item[this.tokenAttr]?.S ?? "",
  //       timeStamp: Number(item[this.timeStampAttr]?.S)
  //         ? Number(item[this.timeStampAttr].N)
  //         : 0, // Convert to number
  //     })) ?? []
  //   );
  // }

  public async getAllAuthTokens(): Promise<AuthTokenEntity[]> {
    const params = {
      TableName: this.tableName,
    };

    const output = await this.client.send(new ScanCommand(params));

    return (
      output.Items?.map((item) => {
        const unmarshalled = unmarshall(item);
        return {
          alias: unmarshalled[this.aliasAttr],
          token: unmarshalled[this.tokenAttr],
          timeStamp: Number(unmarshalled[this.timeStampAttr]),
        };
      }) ?? []
    );
  }

  public async deleteExpiredAuthTokens(): Promise<void> {
    const authTokenEntities: AuthTokenEntity[] = await this.getAllAuthTokens();
    for (const entity of authTokenEntities) {
      const time = entity.timeStamp;
      if (Date.now() - time > this.TIMEOUT) {
        await this.deleteAuthToken(entity.token);
      }
    }
  }

  private generateTokenItem(token: string) {
    return {
      [this.tokenAttr]: token,
    };
  }
}
