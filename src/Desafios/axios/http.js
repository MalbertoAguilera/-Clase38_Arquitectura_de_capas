const axios = require("axios")

async function get(){
  const response = await axios.get("http://localhost:8080/products/get/")
  console.log("Desde axios----------",response.data)
}

const data = {
  "title": "escuadra desde axios",
  "price": 155.55,
  "stock": 10,
  "thumbnail": "https://picsum.photos/50",
}

async function post(){
  const response = await axios.post("http://localhost:8080/products/add",data)
  console.log(response.status)
  await get();
}

async function deleteItem(){
  const response = await axios.delete("http://localhost:8080/products/delete/62306f10bf946c68ef607296")
  console.log(response.status)
  await get();
}

module.exports = {get,post,deleteItem}