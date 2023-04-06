const baseUrl = "http://localhost:3001";

//Check for server response with promise state

//GET
//items GET https://localhost:3001/items
//fetch all clothing items, plced into applications state
//Extra steps in App.js to replace default clothing items
//(replaced with cards in Main, replace in useState in App)
//remove defaultclothing items from constants API

//POST
// POST https://localhost:3001/items
//add a new clothing item
//pass in name, iimageUrl, weather -> used itemName, itemImageLink, weatherType for these in AddItemModal
//modify handler for adding new item in App ->handleAddItemSubmit

//DELETE
// DELETE https://localhost:3001/items/:id
//Create handler in App to remove item
