/* import { Router } from "express";
const router = Router()
import ProductManager from "../../DAO/appManager/productManager.js";
const path = "src/DAO/db/products.json";
const newProductManager = new ProductManager(path);
import { validateNumber } from "../../utils/utils.js";

router.get("/", async (req, res) => {
    try {
        const products = await newProductManager.getProducts();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
            ? isValidLimit
            ? res.render("home", {
                products: products.slice(0, limit),
                })
            : res.render("home", {
                products: products,
                })
            : res.render("home", {
                products: [],
            });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.get("/realtimeproducts", async (req, res) => {
    try {
        const { page, limit, sort } = req.query;
        const queryResult = await newProductManager.getAllProducts(page, limit, sort);
        const {docs, ...paginationInfo} = queryResult;
        const prods = docs.map((product) => {
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                category: product.category                
            }
        });

        const nextPage = parseInt(page)+1;
        const nextPageUrl = `/realtimeproducts?page=${nextPage}&limit=${limit}&sort=${sort}`;
        res.render('realtimeproducts', {prods, paginationInfo, nextPageUrl, sort});
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

export default router; */