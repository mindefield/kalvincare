import express from 'express';
import { Breed, DogHealthData, HealthReport } from '../types';

const router = express.Router();

/**
 * @swagger
 * /api/health/analyze:
 *   post:
 *     summary: Analyze dog health data
 *     description: Generate a health report based on breed and health data
 *     tags: [Health]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               breeds:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     confidence:
 *                       type: number
 *                     temperament:
 *                       type: array
 *                       items:
 *                         type: string
 *               healthData:
 *                 type: object
 *                 properties:
 *                   age:
 *                     type: number
 *                   weight:
 *                     type: number
 *                   height:
 *                     type: number
 *                   gender:
 *                     type: string
 *                     enum: [male, female, other]
 *                   activityLevel:
 *                     type: string
 *                     enum: [low, medium, high]
 *                   diet:
 *                     type: string
 *                   healthIssues:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: Health analysis successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weightStatus:
 *                   type: string
 *                 activityRecommendations:
 *                   type: array
 *                   items:
 *                     type: string
 *                 overallHealthScore:
 *                   type: number
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to analyze health data
 */
router.post('/analyze', async (req, res) => {
  try {
    const { breeds, healthData } = req.body;

    // Mock health report generation
    const report: HealthReport = {
      weightStatus: 'Normal',
      activityRecommendations: [
        'Regular daily walks',
        'Interactive play sessions',
        'Mental stimulation activities'
      ],
      overallHealthScore: 85
    };

    res.json(report);
  } catch (error) {
    console.error('Health analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze health data' });
  }
});

export const healthRoutes = router; 