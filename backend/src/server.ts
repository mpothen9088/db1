import cors from "cors";
import express, { json } from "express";
import postgresDataSource from "./strategy/postgresql";
import truckApi from "./strategy/postgresql/truck";

(async () => {
  const app = express();
  app.use(cors());
  app.use(json());

  const datasource = await postgresDataSource.initialize();

  new truckApi(datasource, app);
  app.get("/", (_, res) => {
    return res.send("hello world");
  });

  app.listen(8000, () => {
    console.log(`express server started on 8000`);
  });
})().catch((err) => console.log(err));
