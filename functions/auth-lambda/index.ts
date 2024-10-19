import type { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda';
import { generatePolicy, validateToken } from '@/helpers/lambda';

export async function fetch(request: Request & { aws: APIGatewayAuthorizerEvent }): Promise<APIGatewayAuthorizerResult> {
  console.log("[Auth lambda]: request", request);

  const headers = request.headers;
  const token = headers.get("authorization");
  const isValid = validateToken(token ?? "");

  return generatePolicy('user', isValid ? 'Allow' : 'Deny', request.aws.methodArn ?? "");
}
