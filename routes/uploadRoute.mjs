import { default as express } from "express";
import { v4 as uuidv4 } from 'uuid'
import response from '../utils/reponses.mjs';
import proctAdmin from '../utils/firebase.mjs';
import User from '../model/user.mjs';
import formidable from "../middlewares/formidable.mjs"
// import formidable from 'formidable';


export const router = express.Router();

//Storage Reference
const bucket = proctAdmin().storage().bucket(`gs://pipsvile.appspot.com`);

 const uploadFile = async (file, filename) =>
  bucket.upload(file, {
    public: true,
    destination: `/uploads/pipsville/${filename}`,
    metadata: {
      firebaseStorgaeDownloadTokens: uuidv4(),
    },
  });

 const uploadPhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    //get picture from files
    const file = req.files.photo;

    const uploadFileFirebase = await uploadFile(file.filepath, file.newFilename);

    if (!uploadFileFirebase) {
      return response(res, 500, 'error uploading to firebase', null);
    }
    await User.findOneAndUpdate({ userId }, { imageUrl: uploadFileFirebase[0].metadata.mediaLink });

    return response(res, 200, 'success', uploadFileFirebase[0].metadata.mediaLink);
  } catch (err) {
    console.log(err);
    return response(res, 500, err.message, null);
  }
};

 const verifyUpload = async (req, res) => {
  try {
    const { userId } = req.params;
    //const file = await re.files.photo;
    const file = req.files.photo;

    console.log(file);
    const uploadFileFirebase = await uploadFile(file.filepath, file.newFilename);
    if (!uploadFileFirebase) {
      return response(res, 400, 'error uploading to firebase', null);
    }
    await User.findOneAndUpdate({ userId }, { IdImg: uploadFileFirebase[0].metadata.mediaLink });

    return response(res, 200, 'success', uploadFileFirebase[0].metadata.mediaLink);
  } catch (err) {
    console.log(err);
    response(res, 500, err.message, null);
  }
};


router.post("/verify/:userId",formidable, verifyUpload );
router.post("/photo/:userId",formidable, uploadPhoto );

