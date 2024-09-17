const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();


require("./dataBase/dataBase")();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
    optionsSuccessStatus: 200,
  })
);

const managerRouter = require("./routers/managerRouter");
const productsRouter = require("./routers/productsRouter");
const userRouter = require("./routers/userRouter");
const ProfileRouter = require("./routers/profileRouter");
const ordersRouter = require("./routers/ordersRouter");
const { jwtAuth } = require("./middleware/jwtAuth");
const payment_router = require("./routers/paypalRouter");
const brand_router = require("./routers/brandRouter");
const contactUs = require("./routers/contactUsRouter");
const ad_router = require("./routers/adsRouter")
const category_router = require("./routers/categoryRouter")


app.use("/payment", payment_router);
app.use("/managers", managerRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", userRouter);
app.use("/profile", ProfileRouter);
app.use("/brands", brand_router);
app.use("/complaints", contactUs);
app.use("/ads", ad_router);
app.use("/categories", category_router);

const port = process.env.PORT;

app.listen(port, console.log(`running on port ${port}`));
