import { getToken } from "../services/users";

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

export default async function sendRequest(url, method = "GET", payload = null) {
  // Will aggregate all out network requests into one place
  // all that changes is the url, method and the options
  const options = { method };

  if (payload) {
    options.headers = { ...DEFAULT_HEADERS };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    // check to see if there is a headers object, if not create one for us
    // this is because on a GET request, we dont actually create a headers
    // see line 12 where we check for a payload
    options.headers ||= {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json(); // converts json to JS obj

  throw new Error("Bad Request");
}
