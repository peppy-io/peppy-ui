import { apiBaseUrl, token } from './globals';

let baseUrl = "";
let tokenVal = "";

apiBaseUrl.subscribe((val) => baseUrl = val);
token.subscribe((val) => tokenVal = val);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function postReq(endpoint: string, body: any): Promise<Response> {
  const resp = fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenVal,
    },
    body: JSON.stringify(body)
  });

  return resp;
}

export async function getReq(endpoint: string): Promise<Response> {
  const resp = await fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': tokenVal,
    }
  });

  return resp;
}
