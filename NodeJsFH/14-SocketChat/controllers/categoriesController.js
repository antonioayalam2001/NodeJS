const {Category, Usuario} = require('../models')
const {request: req, response: res} = require('express');
const getCategories = async (req, res) => {
      const {inicio = 0, limite = 5} = req.query;
      const [categories, total] = await Promise.all([
            await Category.find({state: true}).populate({path: 'user', select: ['nombre', 'email', 'state']}).skip(inicio).limit(limite),
            await Category.find({state: true}).count()
      ])
      res.status(200).json({
            categories,
            total,
            inicio,
            limite
      })
}

const getCategoryById = async (req, res) => {
      const category = await Category.findById(req.params.id).populate({path: 'user', select: ['nombre', 'email', 'state']})
      res.status(200).json({
            category,
      })
}

const insertCategory = async (req, res) => {
      const {name, description} = req.body;
      const categoryDB = await Category.findOne({name: name.toUpperCase()});
      if (categoryDB && categoryDB.state === false) {
            await Category.findOneAndUpdate({name: name.toUpperCase()}, {state: true});
            res.status(200).json({
                  msg: "Category inserted again successfully "
            })
      }
      //data to storage
      const data = {
            name: name.toUpperCase(),
            description,
            user: req.user._id
      };
      const category = await new Category(data);
      try {
            await category.save();
            res.status(201).json({
                  category
            })
      } catch (e) {
            res.status(400).json({
                  msg: "Ocurrio un error"
            })
      }
}

const updateCategoryById = async (req, res) => {
      const {name, description} = req.body;
      const {id} = req.params;
      let category;
      category = await Category.findOne({_id: id})
      if (!category.state) {
            res.status(404).json({
                  msg: 'Category does not exists'
            })
      }
      if (name) {
            category = await Category.findOne({name: name.toUpperCase()});
            if (category && category.state === true) {
                  return res.status(401).json({
                        msg: "Category already in database System"
                  })
            }
            const data =
                {
                      name: name.toUpperCase(),
                      description
                }
            const options = {
                  returnDocument: 'after'
            }

            try {
                  category = await Category.findOneAndUpdate({_id: id}, data, options)
                  res.status(200).json({
                        msg: 'Updated with success',
                        category
                  })
            } catch (e) {

            }
      } else {
            category = await Category.findOneAndUpdate({_id: id}, {description});
            res.status(200).json({
                  msg: 'Updated description',
                  category
            })
      }
}

const deleteCategoryById = async (req, res) => {
      const {id} = req.params;
      const options = {returnDocument: 'after'}
      const category = await Category.findOneAndUpdate({id}, {state: false}, options);
      res.status(200).json({
            msg: 'Todo bien DELETE',
            category
      })
}

const deleteCollectionCat = async (req, res) => {
      const success = await Category.deleteMany({});
      res.status(200).json({
            msg: 'Puedes borrar',
            success
      })
}




module.exports = {
      getCategories,
      getCategoryById,
      insertCategory,
      updateCategoryById,
      deleteCategoryById,
      deleteCollectionCat
}