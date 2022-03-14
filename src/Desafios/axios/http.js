const axios = require("axios")

async function get(){
  const response = await axios.get("http://localhost:4000/noticias")
  console.log(response.data)
}

const data = {
    titulo:"titulo1",
    cuerpo:"cuerpo1",
    autor:"autor1",
    imagen:"https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg",
    vista:false
  }

async function post(){
  const response = await axios.post("http://localhost:4000/noticias",data)
  console.log(response)
  get()
}