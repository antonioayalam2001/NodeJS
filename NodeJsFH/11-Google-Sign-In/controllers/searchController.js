const {request: req, response: res} = require('express');
const {Product, Role, User, Category, Usuario} = require('../models')
const {ObjectId} = require('mongoose').Types;
const allowedCollecions = ['categories', 'products', 'users', 'roles'];

const searchUsers = async (search = '' , res) => {
      const isMongoId = ObjectId.isValid(search);
      if (isMongoId){
            const user = await Usuario.findById(search);
            return res.status(200).json({
                  results : user ? [user] : []
            })
      }
      //Insensible search
      const regex = new RegExp(search,'i')
      const [users,total] =await  Promise.all([

          await Usuario.find({
            $and : [
                {$or: [{nombre: regex}, {email: regex}, {role: regex}]},
                  {state:true}
            ],
      }),
            await Usuario.find({
                  $and : [
                        {$or: [{nombre: regex}, {email: regex}, {role: regex}]},
                        {state:true}
                  ],
            }).count()
      ])
      res.json({
            results : users,
            total
      })
}

const searchProduct =async (search ='' ,res) => {
      const isMondoId = ObjectId.isValid(search);
      if (isMondoId){
            const product = await Product.findById(search).populate({path : 'user' , select : ['nombre']});
            res.status(302).json({
                  results : product ? [product] : []
            })
      }

      const regex = new RegExp(search,'i')
      const [products , total ] = await Promise.all([
          await Product.find({name : regex}).populate({path : 'user' , select : ['nombre']}),
          await Product.find({name:regex,state:true}).count()
      ])

      res.status(302).json({
            results: products,
            total
      })
}


const searchCategory = async (search = '',res) => {
      const isMongoId = ObjectId.isValid(search);
      if (isMongoId){
            const category = await Category.findById(search);
            res.status(302).json({
                  results : category ? [category] : []
            });
      }
      const newRegex = new RegExp(search,'i');

      const [categories , total ] = await Promise.all([
          await Category.find(
              {
                    $or : [{name: newRegex},{description:newRegex}],
                    $and : [{state:true}],
              },{
                    name:true,
                    description:true,
                    user:true
              },
          ).populate({path : 'user' , select : ['nombre']}) ,
          await Category.find({name: newRegex, state : true}).count()
      ])

      res.json({
            results : categories,
            total
      })
}

const search = async (req, res) => {
      const {collection, search} = req.params;
      if (!allowedCollecions.includes(collection)) {
            return res.status(400).json({
                  msg: `The specified collection is not in the API`
            })
      }
      switch (collection) {
            case 'categories':
                  await searchCategory(search,res)
                  break
            case 'products':
                  await searchProduct(search,res);
                  break
            case 'users':
                  await searchUsers(search,res)
                  break
            case 'roles':
                  res.json({
                        msg: "roles"
                  })
                  break
            default:
                  res.status(500).json({
                        msg: 'Aun no implementado'
                  })
      }
}


const productByCategory  =async (req,res)=>{
      const {categoryName,product} = req.params;
      const category = await Category.find({name:categoryName.toUpperCase() , state : true});
      const regExp = new RegExp(product,'i')
      const products = await Product.find({category : ObjectId(category[0]._id), name : regExp})

      res.json({
            categoryName,
            product,
            category,
            products
      })
}

module.exports = {
      search,
      productByCategory
}