export function getAutorizationData(headers: Headers): null | Record<string, any> {
  const authorizerData = headers.get("x-amzn-authorizer");

  if (!authorizerData) {
    return null;
  }

  return JSON.parse(authorizerData);
}