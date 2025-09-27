import { OrderItem, Product, ProductImage } from "../models/index.js";

export default class ProductService {

    static async getProductById (id) {
      try {
      const product = await Product.findOne({
        where: { id },
        attributes: ["id", "name", "category", "description", "price", "stocks"],
        include: [
            {
            model: ProductImage,
            as: "images",
            attributes: ["id", "imageUrl"],
            },
            {
            model: ProductOptions,
            as: "options",
            attributes: ["id", "optionName", "optionPrice"],
            },
            {
            model: Vendor,
            as: "vendor",
            attributes: ["id", "shopName"],
            },
        ],
      });

      if(!product) {
        return {status: 0, message: "No product found"}
      }

      return {status: 1, message: "Product found successful", data: product.get({plain: true})};

      } catch (error) {
        return {status: 0, message: "Failed to fetch product"}
      }
    }


    static async getRecommended (id, limit = 10) {
        try {
            const product = await Product.findOne({
                where: {id},
                attributes: ["id", "name", "category"]
            });

            if(!product) {
                return {status: 0, message: "No product found"}
            }

            const products = await Product.findAll({
                where: {
                    category: product.category,
                    id: { [Op.ne]: product.id },
                },
                limit,
                attributes: ["id", "name", "price"],
                include: [
                  { model: ProductImage, as: "images", attributes: ["id", "imageUrl"] },
                ],

            });

            if(!products) {
                return {status: 0, message: "Failed to get recommended products"}
            }

            return {status: 1, message: "Recommended products", data: products.map(product => product.get({plain: true}))}
        } catch (error) {
            return {status: 0, message: "Failed to fetch products"}
        }
    }


    static async getProducts (query, order, limit) {
      try {
        const {count, rows: products} = await Product.findAndCountAll({
            where: query,
            order,
            limit: Number(limit),
            attributes: ["id", "name", "category", "description", "price"],
            include: [
                 {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "imageUrl"],
                },
            ],
        });

        if(count === 0) {
            return {status: 0, message: "No products found"}
        }

        return {status: 1, message: "Product fetched", data: products.map(product => product.get({plain: true}))};
      } catch (error) {
        return {status: 0, message: "Failed to fetch products"}
      }
    }



    static async getLatest (limit = 10) {
        try {
            const {count, rows: products} = await Product.findAndCountAll({
               order: [["createdAt", "DESC"]],
               limit: Number(limit),
               attributes: ["id", "name", "price", "category"],
               include: [
                { model: ProductImage, as: "images", attributes: ["id", "imageUrl"] },
               ],
            });

            if(count === 0) {
                return {status: 0, message: "Failed to get recommended products"}
            }

            return {status: 1, message: "Latest fresh products", data: products.map(product => product.get({plain: true}))};
        } catch (error) {
            return {status: 0, message: "Failed to fetch products"}
        }
    }

    static async bestSelling (limit = 10) {
        try {
        const {count, rows: products} = await OrderItem.findAll({
            attributes: [
            "productId",
            [sequelize.fn("SUM", sequelize.col("quantity")), "totalSold"],
            ],
            group: ["productId", "product.id", "product->images.id"],
            order: [[sequelize.literal("totalSold"), "DESC"]],
            limit: Number(limit),
            include: [
            {
                model: Product,
                as: "product",
                attributes: ["id", "name", "price", "category"],
                include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "imageUrl"],
                },
                ],
            },
            ],
        });

        if(count === 0) {
            return {status: 0, message: "Currently no products"}
        }

        return {sttaus: 1, message: "Products fetched successful", data: products.map(product => product.get({plain: true}))};
        } catch (error) {
           return {status: 0, message: "Failed to fetch products"}
        }
    }

    
}