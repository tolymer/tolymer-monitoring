import "source-map-support/register";
import { ScheduledHandler } from "aws-lambda";
import { postToSlack } from "../lib/Slack";
import fetch from "node-fetch";

export const handler: ScheduledHandler = async event => {
  const endpoint = "https://tolymer-grpc.hokaccha.dev/tolymer.v1.Events/GetEvent";
  const res = await fetch(endpoint, {
    headers: {
      accept: "application/grpc-web-text",
      "content-type": "application/grpc-web-text",
      "sec-fetch-mode": "cors",
      "x-grpc-web": "1"
    },
    body: "AAAAACoKKGU1NmM3MDk3YWZmMWZmZThlMzY5YzY0NjA1MDhmZmM5ZjhiYjc5ZjU=",
    method: "POST"
  }).catch(err => {
    console.error(err);
    return notify(`${endpoint}: failed request`);
  });

  if (res && !res.ok) {
    await notify(`${endpoint} returns ${res.status}`);
  }
};

async function notify(text: string): Promise<void> {
  await postToSlack({
    text,
    username: "監視くん",
    icon_emoji: ":exclamation:"
  });
}
