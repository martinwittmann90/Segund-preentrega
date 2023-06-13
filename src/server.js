/* -------IMPORTS-------*/
import express from 'express'
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";

import viewsRouter from "./routes/view.routes.js";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import chatRouter from "./routes/chat.routes.js"

import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { connectMongo } from "./utils/utils.js";

/*-------VARIABLES-------*/
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

/*-------SETTING MIDDLEWARES-------*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/*-------SETTING HANDLEBARS-------*/
app.engine ('handlebars', exphbs.engine());
app.set('views',__dirname + "/views");
app.set("view engine", "handlebars");

/*-------SETTING ROUTES-------*/
app.use('/', viewsRouter); 
app.use('/realtimeproducts', viewsRouter); 
app.use('/products', viewsRouter);
app.use("/chat", chatRouter);
app.use('/carts/:cid', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/carts/:cid', cartRouter);
app.use('/api/carts/:cid/products/:pid', cartRouter);

/*-------SERVIDORES-------*/
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
websockets(io);
connectMongo();

const server = httpServer.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT}. at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));

app.get('/*', async (req, res) => {
  return res.status(404).json({ status: 'error', message: 'incorrect route' })
})