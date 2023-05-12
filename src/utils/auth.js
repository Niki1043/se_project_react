import { checkResponse } from "./api";

const baseUrl = "http://localhost:3001";

// //Check for server response with promise state
// const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   } else {
//     return Promise.reject(`Error ${res.status}`);
//   }
// };

// /signup for user registration
export const userSignUp = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => checkResponse(res));
};

// /signin for user authorization
export const userSignIn = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

// /user/me for token check
export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};
