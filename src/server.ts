import dotenv from "dotenv";
import App from "./App";

dotenv.config();
const app = new App();
const port = process.env.PORT || 3030;

app.app.listen(port, () => {
  console.log(`App Started on ${port}`);
});
