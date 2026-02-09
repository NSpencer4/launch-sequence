import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Wire up GraphQL schema and resolvers
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: null }),
  }
}
