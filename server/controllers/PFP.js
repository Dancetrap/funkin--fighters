const models = require('../models');

const { PFP } = models;

const uploadFile = async (req, res) => {
  /* First we will check if req.files doesn't exist, or if it does exist
       we will ensure req.files.sampleFile also exists. If req.files doesn't
       exist it means that the Express-FileUpload library did not find any
       files in the incoming request. If req.files.sampleFile doesn't exist
       it means we were not sent one tagged as sampleFile.

       Express-FileUpload works very similar to bodyParser in that it will
       look for files being sent as a part of POST or PUT requests. When
       it sees one, it will populate the req.files object with them.

       The name sampleFile is arbitrary, and simply comes from the upload
       form in upload.handlebars.
    */
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  /* Now that we know we have req.files AND there is a sampleFile
         entry in that object, we will grab that file. Again, the
         name sampleFile is arbitrary and simply comes from the name
         attribute on the file input on our upload form in upload.handlebars.
      */
  const { sampleFile } = req.files;

  /* If you uncomment the line below and run the code, you will be
         able to see what an incoming file object looks like. This can
         be useful as it shows you what data there is to possibly store
         in your database.
      */
  // console.log(sampleFile);

  /* Once we have our file in memory on our server, we need to store
         it into our database. Take a look at models/filestore.js to see
         what sort of data we are actually storing. You can also uncomment
         the console statement above to see what is sent to us when someone
         uploads a file.

         This process is the same as any other database creation we have
         done in the past. sampleFile is an object, and we have configured
         our file schema to match that format so it is as simple as passing
         sampleFile to the File model and saving the result.

         If there is an error, we will let the user know. Otherwise, we will
         send them a 201 and tell them the file has been created successfully.
         For testing purposes we will also return the _id of the file in
         the database.
      */
  try {
    const newFile = new PFP(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json({
      message: 'File stored successfully!',
      fileId: doc._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Something went wrong uploading file!',
    });
  }
};

module.exports = {
  uploadFile,
};
