module.exports = (app) => {
    const multer = require('multer');
    const storage = multer.diskStorage({
      destination: app.get('destination'),
      filename: function (req, file, cb) {
        let fn = file.originalname
        // Mimetype stores the file type, set extensions according to filetype
        if (req.token) {
          fn = token + '_' + file.originalname
        }
  
        cb(null, fn);
      }
    });
    const upload = multer({storage: storage});
    
    


    app.post('/uploadHandler', upload.single('file'), function (req, res, next) {
      if (req.file && req.file.originalname) {
        console.log(`Received file ${req.file.originalname}`);
      }
  
      res.send({ responseText: req.file.path }); // You can send any response to the user here
    });
    app.post('/getstatus', function (req, res, next) {
        if (req.file && req.file.originalname) {
          console.log(`Received file ${req.file.originalname}`);
        }
    
        res.send({ responseText: "file conversion in progress :" + req.file.path }); // You can send any response to the user here
      });

    
  }