import express, { Express, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "sw"

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { v1 } from "./routes/v1";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploadsImage", express.static("uploadsImage"));
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument,{
//   explorer: true,
//   swaggerOptions: {
//     persisA
//   },

// }))
app.use("/api/v1", v1);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`port running at : ${port}`);
});
