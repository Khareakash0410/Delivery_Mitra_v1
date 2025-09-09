import { Op } from "sequelize";
import { CatchAsyncError } from "../middleware/CatchAsyncError.js";
import ProductService from "../services/ProductService.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";

export const getSingleproduct = CatchAsyncError(async(req, res) => {
   const {id} = req.params;
    const fieldValidate = validateFields(id);
    if (fieldValidate) {
       return res.status(400).json(errorResponse(fieldValidate)); 
    }

    try {
        const result = await ProductService.getProductById(id);

        if(!result) {
            return res.status(400).json(errorResponse(result.message));
        }

        return res.status(200).json(successResponse("Product fetched successful", {product: result.data}));
    } catch (error) {
        return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
    }
});


export const getRecommendedProduct = CatchAsyncError(async(req, res) => {
   const productId = req.params;
   const fieldValidate = validateFields(productId);
    if (fieldValidate) {
       return res.status(400).json(errorResponse(fieldValidate)); 
    }
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await ProductService.getRecommended(productId, limit);

        if(!result) {
            return res.status(400).json(errorResponse(result.message));
        }

        return res.status(200).json(successResponse("Products fetched successful", {products: result.data}));
    } catch (error) {
        return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
    }
});


export const getProducts = CatchAsyncError(async(req, res) => {
  const {category, search, maxPrice, sortBy, limit} = req.query;

  let query = {};

  // Category filter
  if (category && category.toLowerCase() !== "all") {
    query.category = category;
  }

  // Max price filter
  if (maxPrice) {
    query.price = { [Op.lte]: Number(maxPrice) };
  }

  // Search filter (on name, category, description)
  if (search) {
    query[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { category: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  // Sorting
  let order = [];
  if (sortBy) {
    switch (sortBy) {
      case "priceAsc":
        order = [["price", "ASC"]];
        break;
      case "priceDesc":
        order = [["price", "DESC"]];
        break;
      case "latest":
        order = [["createdAt", "DESC"]];
        break;
      default:
        order = [["createdAt", "DESC"]];
    }
  }

  try {
  const result = await ProductService.getProducts(query, order, limit);
  if(!result) {
    return res.status(400).json(errorResponse(result.message));
  }

  return res.status(200).json(successResponse("Product fetched successful", {products: result.data}));
  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});


export const getFreshProducts = CatchAsyncError(async(req, res) => {
    const limit = parseInt(req.query.limit) || 10;

    try {
        const result = await ProductService.getLatest(limit);
        if(!result) {
            return res.status(400).json(errorResponse(result.message));
        }
        return res.status(200).json(successResponse("Products fetched successful", {products: result.data}));
    } catch (error) {
        return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
    }
});


export const bestSellingProducts = CatchAsyncError(async(req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  try {
    const result = await ProductService.bestSelling(limit);
    if(!result) {
      return res.status(400).json(errorResponse(result.message));
    }
    return res.status(200).json(successResponse("Products fetched successful", {products: result.data}));

  } catch (error) {
    return res.status(500).json(errorResponse(error.message || "Internal Server Error"));
  }
});