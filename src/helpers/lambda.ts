import type { APIGatewayAuthorizerResult, Statement } from 'aws-lambda';

type statusCode = 200 | 202 | 400 | 404 | 500;

export const CreateResponse = <T>(status: statusCode, body?: T) => new Response(JSON.stringify(body || ""), {
  status,
  headers: {
    "Content-Type": "application/json",
  }
})

export function validateToken(token: string | undefined): boolean {
  const [type, value] = (token ?? "").split(" ");
  console.log("token recived", { type, value });

  return value === "valid-token";
}

export function generatePolicy(principalId: string, effect: string, resource: string): APIGatewayAuthorizerResult {
  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ] as Statement[],
  };

  const result = {
    principalId,
    policyDocument,
    context: {
      id: "some-user-id"
    }
  }

  console.log("generatePolicy", result)
  return result;
}