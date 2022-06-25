import formidable from 'formidable';

const form = formidable({ keepExtensions: true, maxFileSize: 3 * 1024 * 1024 }); // multiples means req.files will be an array

export default async function parseMultipartForm(req, res, next) {
  const contentType = req.headers['content-type'];
  console.log(contentType);
  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields; // sets the body field in the request object
        req.files = files; // sets the files field in the request object
        console.log(files);
      }
      next(); // continues to the next middleware or to the route
    });
  } else {
    next();
  }
}
