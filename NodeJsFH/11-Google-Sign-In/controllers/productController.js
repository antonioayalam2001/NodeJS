// Model
const {Product, Category} = require('../models');
const {request: req, response: res} = require('express')

const getProducts = async (req, res) => {
      const {inicio = 0, limite = 5} = req.query;
      const [products, total] = await Promise.all([
            await Product.find({available: true, state: true})
                .populate({path: 'user', select: ['nombre', 'email', 'state']})
                .populate({path: 'category', select: ['name', 'description']})
                .skip(inicio).limit(limite),
            await Product.find({state: true}).count()
      ])
      res.status(200).json({
            products,
            total,
            inicio,
            limite
      })
}

const getProductById = async (req, res) => {
      const product = await Product.findById(req.params.id)
          .populate({path: 'user', select: ['nombre', 'email', 'state']})
          .populate({path: 'category', select: ['name', 'description']})
      res.status(200).json({
            product,
      })
}

const insertProduct = async (req, res) => {
      const {name, description, price, category} = req.body;
      const productDB = await Product.findOne({name: name.toUpperCase()});
      const categoryDB = await Category.findOne({name: category.toUpperCase(), state:true});
      if (productDB) {
            return res.status(400).json({
                  msg: "Product already in DB"
            })
      }
      //data to storage
      const data = {
            name: name.toUpperCase(),
            description,
            price,
            category: categoryDB._id,
            user: req.user._id
      };
      const product = await new Product(data);
      try {
            await product.save();
            res.status(201).json({
                  product
            })
      } catch (e) {
            console.log(e)
            res.status(400).json({
                  msg: "Ocurrio un error"
            })
      }
}

const updateProductById = async (req, res) => {
      const {name, ...datas} = req.body;
      const {id} = req.params;
      let product;
      product = await Product.findOne({_id: id})
      if (!product.state) {
            res.status(404).json({
                  msg: 'Product does not exists'
            })
      }
      if (name) {
            //Verify if there is already a product with that name
            product = await Product.findOne({name});
            if (product && product.state === true) {
                  return res.status(201).json({
                        msg: "Product already exists"
                  })
            }
            const options = {
                  returnDocument: 'after'
            }
            try {
                        product = await Product.findOneAndUpdate({_id: id},{name: name.toUpperCase(), ... datas})
                        return res.status(201).json({
                              msg: "Product updated",
                              product
                        })

            } catch (e) {
            }
      } else {
            product = await Product.findOneAndUpdate({_id: id}, datas);
            res.status(200).json({
                  msg: 'Updated description',
                  product
            })
      }
}

const deleteProductById = async (req, res) => {
      const {id} = req.params;
      const options = {returnDocument: 'after'}
      const product = await Product.findOneAndUpdate({id}, {state: false}, options);
      res.status(200).json({
            msg: 'Todo bien DELETE',
            product
      })
}

const deleteCollection = async (req, res) => {
      const success = await Product.deleteMany({});
      res.status(200).json({
            msg: 'Puedes borrar',
            success
      })
}

module.exports = {
      deleteProductById,
      deleteCollection,
      getProductById,
      getProducts,
      insertProduct,
      updateProductById
}