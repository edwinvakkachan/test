import express from 'express'
const app = express();
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: true }));

import userRoutes from  "./routes/userRoutes.js";

app.use('/',userRoutes);



app.listen(3000,()=>{
    console.log("server is running in 3000");
})

