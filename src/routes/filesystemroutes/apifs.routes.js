import { Router } from "express";
import router from "./productsfs.routes.js";
import cartRouter from "./cartsfs.routes.js";

export const apiRouter = Router()

apiRouter.use("/fs/products", router)
apiRouter.use("/fs/carts", cartRouter)