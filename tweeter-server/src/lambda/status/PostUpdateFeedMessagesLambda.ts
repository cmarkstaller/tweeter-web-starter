import { Status, StatusDto, UserDto } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { FollowService } from "../../model/service/FollowService";

let sqsClient = new SQSClient();

async function sendMessage(body: string): Promise<void> {
  const sqs_url =
    "https://sqs.us-east-1.amazonaws.com/058264259435/UpdateFeedQueue";
  const messageBody = body;

  const params = {
    DelaySeconds: 0,
    MessageBody: messageBody,
    QueueUrl: sqs_url,
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageID:", data.MessageId);
  } catch (err) {
    throw err;
  }
}

export const handler = async function (event: any) {
  const followService = new FollowService(new DynamoDBFactory());
  for (let i = 0; i < event.Records.length; ++i) {
    const { body } = event.Records[i];
    // TODO: Add code to print message body to the log.

    const statusDto: StatusDto = JSON.parse(body);

    let hasMore: boolean = true;

    const alias: string = statusDto.user.alias;
    let lastItem: string | undefined = undefined;

    while (hasMore) {
      const [followerList, morePages] = await followService.getBatch(
        alias,
        lastItem,
        100
      );
      const newBody = { followerList: followerList, statusDto: statusDto };
      console.log("New Body: ", newBody);
      await sendMessage(JSON.stringify(newBody));
      hasMore = morePages;
      lastItem = followerList[followerList.length - 1];
    }
  }
  return null;
};

// export const handler = async function (event: any) {
//   for (let i = 0; i < event.Records.length; ++i) {
//     const { body } = event.Records[i];
//     const statusDto: StatusDto = JSON.parse(body);

//     const followService = new FollowService(new DynamoDBFactory());

//     let hasMore: boolean = true;
//     let lastUserAlias: string | undefined = undefined;
//     const userAlias = statusDto.user.alias;

//     while (hasMore) {
//       const followerList: string[] = await followService.getBatch(
//         userAlias,
//         100,
//         lastUserAlias
//       );
//       lastUserAlias = followerList[followerList.length - 1];

//       console.log(
//         "lastUserALias in PostUpdateFeedMessagesLambda: ",
//         lastUserAlias
//       );

//       if (followerList.length < 100) {
//         hasMore = false;
//       }

//       const followerStatusBody = {
//         followerList: followerList,
//         statusDto: statusDto,
//       };
//       const jsonStatus: string = JSON.stringify(followerStatusBody);
//       await sendMessage(jsonStatus);
//     }
//   }
//   return null;
// };
