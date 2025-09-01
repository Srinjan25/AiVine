import express from 'express';
import { genrateArticle, genrateImage, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aiController.js';
import { genrateBlogTitle } from '../controllers/aiController.js';
import { auth } from '../middlewares/auth.js';
import { upload } from '../configs/multer.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, genrateArticle)
aiRouter.post('/generate-blog-title', auth, genrateBlogTitle)
aiRouter.post('/generate-image', auth, genrateImage)

aiRouter.post('/remove-image-background', upload.single('file'), auth, removeImageBackground)
aiRouter.post('/remove-image-object', upload.single('image'), auth, removeImageObject)
//aiRouter.post('/remove-image-object', auth, upload.single('image'), removeImageObject);
aiRouter.post('/resume-review', upload.single('resume'), auth, resumeReview)

export default aiRouter