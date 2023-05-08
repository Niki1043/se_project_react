const baseUrl = "http://localhost:3001";

//const baseUrl = "https://my-json-server.typicode.com/niki1043/se_project_react";

//Check for server response with promise state
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
};

//GET
//items GET https://localhost:3001/items
//fetch all clothing items, plced into applications state
//Extra steps in App.js to replace default clothing items
//(replaced with cards in Main, replace in useState in App)
//remove defaultclothing items from constants API
export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
};

//POST
// POST https://localhost:3001/items
//add a new clothing item
//pass in name, iimageUrl, weather -> used itemName, itemImageLink, weatherType for these in AddItemModal
//modify handler for adding new item in App ->handleAddItemSubmit
export const addClothingItem = ({ name, imageUrl, weather, token }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => checkResponse(res));
};

//DELETE
// DELETE https://localhost:3001/items/:id
//Create handler in App to remove item
export const deleteCard = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

//PATCH
//PATCH https://localhost:3001/users/me
//Create handler in App to edit and update profile info
export const editProfile = ({ name, avatarUrl, token }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatarUrl,
    }),
  }).then((res) => checkResponse(res));
};

//PUT
//PUT https://localhost:3001/items/id/likes
//handleCardLike handler in App
export const addCardLike = (id, user, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

//DELETE
//DELETE https://localhost:3001/items/id/likes
//handleCardLike handler in App
export const removeCardLike = (id, user, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};
