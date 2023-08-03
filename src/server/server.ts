import dotenv from "dotenv";
import App from "./App";
import database from "../app/database";

dotenv.config();
const app = new App();
const port = process.env.PORT || 3030;

database
  .sync()
  .then(() => {
    app.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
