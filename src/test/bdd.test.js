const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

describe('Tests API de PRODUCTOS', () => {
  describe('GET /products/get', () => {
    it('Deberia traer productos con status 200', async () => {
      let response = await request.get('/products/get')
      expect(response.status).to.equal(200)
      // expect(response.body.length).to.equal(2)
    })
  })
  describe('DELETE BY ID /products/get/6230e255104c51ab844d8db9', () => {
    it('Deberia traer un solo producto con status 200', async () => {
      let response = await request.get('/products/get/6230e255104c51ab844d8db9')
      expect(response.status).to.equal(200)
      // expect(response.body.length).to.equal(2)
    })
  })
  describe('DELETE BY ID /products/delete/6230f9dbdcc2cee119273ba3', () => {
      it('Deberia traer un solo producto con status 200', async () => {
        let response = await request.delete('/products/delete/6230f9dbdcc2cee119273ba3')
        expect(response.status).to.equal(200)
        // expect(response.body.length).to.equal(2)
      })
    })
  
//   describe('POST', () => {
//     it('Deberia agregar una noticia',async () => {
//       let noticia = noticias.getNoticia()
//       let response = await request.post('/noticias').send(noticia)
//       expect(response.status).to.equal(200)
//       expect(response.body).to.include.keys('_id', 'titulo','autor', 'fyh')
//       expect(response.body.autor).to.equal(noticia.autor)
//     })
//   })
})