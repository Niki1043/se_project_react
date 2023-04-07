const baseUrl = "http://localhost:3001";

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
  }).then((res) => checkResponse(res));
};

//POST
// POST https://localhost:3001/items
//add a new clothing item
//pass in name, iimageUrl, weather -> used itemName, itemImageLink, weatherType for these in AddItemModal
//modify handler for adding new item in App ->handleAddItemSubmit
export const addClothingItem = (card) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({
      name: card.name,
      imageUrl: card.imageUrl,
      weather: card.weather,
    }),
  }).then((res) => checkResponse(res));
};

//DELETE
// DELETE https://localhost:3001/items/:id
//Create handler in App to remove item
export const deleteCard = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => checkResponse(res));
};
