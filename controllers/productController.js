import { Op } from "sequelize";
import Product from "../models/productModel.js";
import fs from "fs";
import { deleteFile } from "../helpers/deleteFile.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error("Please select the image you want to upload");
    }

    const fileName = file.filename;
    const pathFile = `${req.protocol}://${req.get(
      "host"
    )}/assets/uploads/${fileName}`;
    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      image: pathFile,
    });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllProductsByFilter = async (req, res) => {
  try {
    const { name, limit = 6, page = 1, sortBy, orderBy } = req.query;

    const offset = (page - 1) * +limit;

    const products = await Product.findAndCountAll({
      limit: +limit,
      offset,
      where: {
        ...(name
          ? {
              name: {
                [Op.like]: "%" + name + "%",
              },
            }
          : {}),
      },
      order: [[sortBy, orderBy]],
    });

    const result = {
      totalPages: Math.ceil(products?.count / limit),
      totalItems: products?.count,
      products: products?.rows,
    };

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;

    const productUpdate = await Product.findOne({
      where: {
        id,
      },
    });

    if (!productUpdate) {
      res.status(404);
      throw new Error("Product not found");
    }

    const file = req.file;

    if (file) {
      const nameImage = productUpdate.image.replace(
        `${req.protocol}://${req.get("host")}/assets/uploads/`,
        ""
      );
      const filePath = `./assets/uploads/${nameImage}`;
      deleteFile(filePath);

      const fileName = file.filename;
      const pathFile = `${req.protocol}://${req.get(
        "host"
      )}/assets/uploads/${fileName}`;

      productUpdate.image = pathFile;
    }

    productUpdate.name = name || productUpdate.name;
    productUpdate.price = price || productUpdate.price;
    productUpdate.quantity = quantity || productUpdate.quantity;
    productUpdate.description = description || productUpdate.description;

    productUpdate.save();

    res.status(200).json(productUpdate);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productDelete = await Product.findOne({
    where: {
      id,
    },
  });

  if (productDelete) {
    const nameImage = productDelete.image.replace(
      `${req.protocol}://${req.get("host")}/assets/uploads/`,
      ""
    );
    const filePath = `./assets/uploads/${nameImage}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(404);
        throw new Error("File not found");
      }
    });

    productDelete.destroy();

    return res.status(200).json({ msg: "Delete Success" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};
