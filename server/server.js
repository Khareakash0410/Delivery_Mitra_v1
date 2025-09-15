import "./config/config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {sequelize} from "./models/index.js";
import apiRouter from "./routes/index.js";
import { error } from "./middleware/Error.js";


const app = express();

app.use(cors({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        process.env.VENDOR_URL || "http://localhost:5174",
        process.env.DELIVERY_URL || "http://localhost:5175",
        process.env.ADMIN_URL || "http://localhost:5176",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));


app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Server is Healthy!");
});

app.use(error);
app.use(apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
    sequelize.authenticate()
    .then(() => {
        console.log("Connected to Database")
        return sequelize.sync({ alter: true }); 
    }).then(() => {
        console.log("Tables synced successfully");
    }).catch((err) => {
        console.log("Error connecting to database:", err);
    })
});