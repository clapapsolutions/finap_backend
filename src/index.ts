//Library Imports
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { https } from "firebase-functions/v2";
import { graphqlHTTP } from "express-graphql";

import expenseRoutes from "./routes/expenseRoutes.js";
import appRoutes from "./routes/appRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//Project level Modules/files imports
import connectDB from "./config/db.js";
import schema from "./graphql/schema.js";

//Initialize the App by Express
const app: Express = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use("/api/expense", expenseRoutes);
app.use("/api/user", userRoutes);

// graphQL 
app.use(
  "/graphQL",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello ji - I came from GITHUB").status(200);
});

export default https.onRequest(app);
