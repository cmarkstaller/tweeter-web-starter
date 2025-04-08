import type { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";
import { DynamoDBFactory } from "../../factory/DynamoDBFactory";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

let sqsClient = new SQSClient();

async function sendMessage(body: string): Promise<void> {
  const sqs_url =
    "https://sqs.us-east-1.amazonaws.com/058264259435/PostStatusQueue";
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

export const handler = async (
  request: PostStatusRequest
): Promise<TweeterResponse> => {
  const statusService = new StatusService(new DynamoDBFactory());
  const success = await statusService.postStatus(request.token, request.status);

  const jsonStatus: string = JSON.stringify(request.status);
  await sendMessage(jsonStatus);
  return { success: success, message: "Attempted to post status" };
};
