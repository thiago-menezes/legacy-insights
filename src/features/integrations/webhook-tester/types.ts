export interface WebhookTesterProps {
  webhookUrl: string;
  source: string;
  secret?: string;
}

export interface TestResponse {
  ok: boolean;
  status: number;
  data: unknown;
}
