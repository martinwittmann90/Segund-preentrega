import ProductModel from "../DAO/models/product.model.js";

class MongoDBProducts {
    async getAllProducts(page, limit, sort, category, status) {
        try {
            const options = {}
            if(page){
                options.page = page || 1
            }
            if(limit){
                options.limit = 5
            }
            if(sort){
                options.sort = { price: sort === 'desc' ? -1 : 1 };
            }

            const filter = {};
            if(category){
                filter.category = category || '';
            }
            if(status){
                filter.status = status || true;
            }
            const products = await ProductModel.paginate(filter, options);

            return products;
        } catch (err) {
            throw err;
        }
    }

    async getProductById(productId) {
        try {
            const one = await ProductModel.findById(productId);
            return one;
        } catch (err) {
            throw new Error(err);
        }
    }

    async createProduct(productData) {
        try {
            const newProd = await ProductModel.create(productData);
            return newProd;
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(productId, productData) {
        try {
            const productUpdate = await ProductModel.findByIdAndUpdate(
                productId,
                productData,
                { new: true }
            );
            return productUpdate;
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(productId) {
        try {
            const delProd = await ProductModel.findByIdAndDelete(productId);
            return delProd;
        } catch (err) {
            throw new Error(err);
        }
    }
};

export default MongoDBProducts;