const MessageService = require("../../services/messageService");
const messagesApi = new MessageService();
const listarMensajesNormalizados = require("../../utils/listarMensajesNormalizados");

const addProductsHandler = async (socket, io) => {
  socket.emit(
    "server_sendMessages",
    listarMensajesNormalizados(await messagesApi.buscar())
  );

  socket.on("client_newMessage", async (objmessage) => {
    objmessage.date = new Date().toLocaleString();
    console.log("HASTA ACA LLEGUE BIEN",objmessage);
    await messagesApi.agregar(objmessage);
    io.emit("server_sendMessages", listarMensajesNormalizados(await messagesApi.buscar())
    );
  });
};

module.exports = addProductsHandler;
