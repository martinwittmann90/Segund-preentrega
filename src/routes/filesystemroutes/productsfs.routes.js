import { Router } from "express";
const router = Router();
import ProductManager from "../../DAO/appManager/productManager.js";
import multer from "multer";
const newProductManager = new ProductManager('./src/DAO/db/products.json');
import { validateNumber } from "../../utils/utils.js";
import { checkRequest, checkCodeNotRepeated, checkNumberParams, } from "../../middleware/validators.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

router.get("/", async (req, res) => {
    try {
        const products = await newProductManager.getProducts();
        const limit = req.query.limit;
        const isValidLimit = validateNumber(limit);
        products
            ? isValidLimit
            ? res.status(200).json({
                status: "success",
                payload: products.slice(0, limit),
                })
            : res.status(200).json({
                status: "success",
                payload: products,
                })
            : res.status(200).json({ status: "success", payload: [] });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.get("/:productsId", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await newProductManager.getProductById(id);
        product
            ? res.status(200).json({
                status: "success",
                payload: product,
            })
            : res.status(404).json({
                status: "error",
                message: "Sorry, no product found by id: " + id,
                payload: {},
            });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.post("/", checkRequest, checkCodeNotRepeated, async (req, res) => {
    try {
        /* const newProduct = req.body;
        const photo = req.file;
        console.log(newProduct);
        console.log(photo);
        newProduct.thumbnails = "/uploads/" + photo.filename; */
        const productCreated = await newProductManager.addProduct(newProduct);
        console.log(productCreated);
        res.redirect("/");
      } catch (err) {
        res.status(err.status || 500).json({
          status: "error",
          payload: err.message,
        });
      }
    });

router.put("/:id", checkRequest, checkNumberParams, async (req, res) => {
    try {
        const id = req.params.id;
        const newProduct = req.body;
        const productUpdated = await newProductManager.updateProduct(id, newProduct);
        res.status(200).json({
            status: "success",
            payload: productUpdated,
        });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });

router.delete("/:id", checkNumberParams, async (req, res) => {
    try {
        console.log("delete");
        const id = req.params.id;
        const product = await newProductManager.getProductById(id);
        if (!product) {
            res.status(404).json({
            status: "error",
            message: "Sorry, no product found by id: " + id,
            payload: {},
            });
            return;
        }
        const productDeleted = await newProductManager.deleteProduct(id);
        res.status(200).json({
            status: "success",
            payload: productDeleted,
        });
        } catch (err) {
        res.status(err.status || 500).json({
            status: "error",
            payload: err.message,
        });
        }
    });
    

export default router;