const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      const uniquename = uuidv4();
      cb(null, uniquename+path.extname(file.originalname));
    }
  });
  
  function fileFilter (req, file, cb) {
     
    cb(null, false)

    cb(null, true)
  
    cb(new Error('I don\'t have a clue!'))
  
  }

  const upload = multer({ storage: storage })

  module.exports = upload;