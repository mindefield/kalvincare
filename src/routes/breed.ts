import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// Mock breed detection for now
const detectBreed = (imagePath: string) => {
  const breeds = [
    { name: 'Labrador Retriever', confidence: 0.85, temperament: ['Friendly', 'Active', 'Outgoing'] },
    { name: 'Golden Retriever', confidence: 0.10, temperament: ['Intelligent', 'Kind', 'Confident'] },
  ];
  return breeds;
};

/**
 * @swagger
 * /api/breed/detect:
 *   post:
 *     summary: Detect dog breed from image
 *     description: Upload an image of a dog to detect its breed
 *     tags: [Breed]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the dog (JPG, JPEG, or PNG)
 *     responses:
 *       200:
 *         description: Breed detection successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 breeds:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       confidence:
 *                         type: number
 *                       temperament:
 *                         type: array
 *                         items:
 *                           type: string
 *       400:
 *         description: No image file provided
 *       500:
 *         description: Failed to process image
 */
router.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const breeds = detectBreed(req.file.path);
    res.json({ breeds });
  } catch (error) {
    console.error('Breed detection error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

export const breedRoutes = router;

 