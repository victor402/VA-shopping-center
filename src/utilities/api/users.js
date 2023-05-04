import sendRequest from "./send-request";

const BASE_URL = "/api/users";
// const sendRequest = require('../send-request');

export function signUp(userData) {
  // console.log(userData)
  return sendRequest(BASE_URL, "POST", userData);
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  // const options = {
  //     method:'POST',
  //     headers: DEFAULT_HEADERS,
  //     body: JSON.stringify(userData) // shows up as payload in browser netwok tab
  // }

  //     const res = await fetch(BASE_URL, options);

  //  // Check if request was successful
  // if(res.ok){
  //     return res.json() // converts json to JS obj
  // }else{
  //     throw new Error('Invalid Sign Up')
  // }
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
  //     // Fetch uses an options object as a second arg to make requests
  //     // other than basic GET requests, include data, headers, etc.
  //     const options = {
  //         method: 'POST',
  //         headers: DEFAULT_HEADERS,
  //         body: JSON.stringify(credentials) // shows up as payload in browser netwok tab
  //     }

  //     const res = await fetch(`${BASE_URL}/login`, options);

  //     // Check if request was successful
  //     if (res.ok) {
  //         return res.json() // converts json to JS obj
  //     } else {
  //         throw new Error('Invalid Credentials')
  //     }
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
