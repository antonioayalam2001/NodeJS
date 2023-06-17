const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2
const {request: req, response: res} = require('express');
const {uploadFiles} = require("../helpers");
const {Product, Category, Usuario} = require('../models')
cloudinary.config({
      cloud_name: 'coursenodejs',
      api_key: '975742338913573',
      api_secret: 'A08L1TZBzQg82N10ga0dxRdyp2I'
});

const uploadFile = async (req, res) => {
      const extensions = ["txt", 'img'];
      try {
            //undefined if we want to keep the original one that we established in the function
            const fileName = await uploadFiles(req.files, undefined, 'temp')
            res.json({fileName})
      } catch (e) {
            res.json({e})
      }
}

// Function without Cloudinary
const updateImageLocal = async (req, res) => {
      const {collection, id} = req.params;
      let model;
      switch (collection) {
            case 'users':
                  model = await Usuario.findById(id)
                  if (!model) {
                        return res.status(400).json({msg: "The given Id is not an existent user"})
                  }
                  break
            case 'products':
                  model = await Product.findById(id)
                  if (!model) {
                        return res.status(400).json({msg: "The given Id is not an existent product"})
                  }
                  break
            default:
                  return res.status(500).json({msg: "Forget to update this one "})
      }
      //      Clean previous files (images)
      if (model.img) {
            //      Delete image from server
            const pathImg = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImg)) {
                  fs.unlinkSync(pathImg);
            }
      }
      try {
            model.img = await uploadFiles(req.files, undefined, collection);
            await model.save();
      } catch (e) {
            // console.log(e)
            return res.json({msg: e})
      }
      res.json(model);
}

//Upload Image with cloudinary
const updateImgCloudinary = async (req, res) => {
      const {collection, id} = req.params;
      let model;
      switch (collection) {
            case 'users':
                  model = await Usuario.findById(id)
                  if (!model) {
                        return res.status(400).json({msg: "The given Id is not an existent user"})
                  }
                  break
            case 'products':
                  model = await Product.findById(id)
                  if (!model) {
                        return res.status(400).json({msg: "The given Id is not an existent product"})
                  }
                  break
            default:
                  return res.status(500).json({msg: "Forget to update this one "})
      }
      //      Clean previous files (images)
      if (model.img) {
            //      Delete image from server
            const imgName = model.img.split('/').at(-1).split('.')[0];
            cloudinary.uploader.destroy(`node-Cafe/${collection}/${imgName}`);
      }
      //Temporal route where the file is stored while we decided where to put it
      const {tempFilePath} = req.files.file;
      const {secure_url} = await cloudinary.uploader.upload(tempFilePath, {folder: `node-Cafe/${collection}`})

      try {
            model.img = secure_url
            await model.save();
      } catch (e) {
            // console.log(e)
            return res.json({msg: e})
      }
      res.json(model);
}


const showImg = async (req, res) => {
      const {collection, id} = req.params;
      let model;
      switch (collection) {
            case 'users':
                  model = await Usuario.findById(id)
                  if (!model) {
                        // return res.status(400).json({msg: "The given Id is not an existent user"})
                        return res.sendFile(path.join(__dirname, '../assets/missplaceholer.jpg'))
                  }
                  break
            case 'products':
                  model = await Product.findById(id)
                  if (!model) {
                        // return res.status(400).json({msg: "The given Id is not an existent product"})
                        return res.sendFile(path.join(__dirname, '../assets/missplaceholer.jpg'))
                  }
                  break
            default:
                  return res.status(500).json({msg: "Forget to update this one "})
      }
      //      Clean previous files (images)
      if (model.img) {
            return res.redirect(model.img);
      }
      return res.sendFile(path.join(__dirname, '../assets/missplaceholer.jpg'));
}

const showImgLocal = async (req, res) => {
      const {collection, id} = req.params;
      let model;
      switch (collection) {
            case 'users':
                  model = await Usuario.findById(id)
                  if (!model) {
                        // return res.status(400).json({msg: "The given Id is not an existent user"})
                        return res.sendFile(path.join(__dirname, '../assets/missplaceholer.jpg'))
                  }
                  break
            case 'products':
                  model = await Product.findById(id)
                  if (!model) {
                        // return res.status(400).json({msg: "The given Id is not an existent product"})
                        return res.sendFile(path.join(__dirname, '../assets/missplaceholer.jpg'))
                  }
                  break
            default:
                  return res.status(500).json({msg: "Forget to update this one "})
      }
      //      Clean previous files (images)
      if (model.img) {
            if (fs.existsSync(path.join(__dirname, "../uploads/", collection, model.img)))
                  return res.sendFile(path.join(__dirname, "../uploads/", collection, model.img));
      }

      return res.sendFile(path.join(__dirname, '../assets/missplaceholer.jpg'));
}


const uploadMultipleFiles = (req, res) => {
      let uploadPath;
      if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
      }
      const array = []
      for (let file in req.files) {
            array.push(req.files[file])
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      // Use the mv() method to place the file somewhere on your ser ver
      array.forEach(file => {
            uploadPath = path.join(__dirname, "../uploads/", file.name);
            file.mv(uploadPath, function (err) {
                  if (err)
                        return res.status(500).send(err);
            });
      })
      res.status(200).json({
            msg: 'Exito'
      })
}

module.exports = {
      uploadFile,
      updateImgCloudinary,
      updateImageLocal,
      showImg,
      showImgLocal
}


//
//Save image with some options of style
// const response = await cloudinary.uploader.explicit('cld-sample-5', {
//       type: "upload",
//       eager: [
//             {
//                   width: 400, height: 400,
//                   crop: "crop", gravity: "face"
//             },
//             {
//                   width: 660, height: 400,
//                   crop: "pad", background: "blue"
//             }]
// });