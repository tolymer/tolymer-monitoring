import { IncomingWebhook, IncomingWebhookResult } from "@slack/webhook";
import { env } from "./Utils";

const url = env("SLACK_WEBHOOK_URL");
const webhook = new IncomingWebhook(url);
const defaultChannel = env("SLACK_CHANNEL");

type SendArguments = {
  text: string;
  username: string;
  icon_emoji: string;
  channel?: string;
};

async function postToSlack(
  args: SendArguments
): Promise<IncomingWebhookResult> {
  args.channel = args.channel || defaultChannel;
  return await webhook.send(args);
}

export { postToSlack };
