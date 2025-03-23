import express from 'express';
import { LeadData } from '../types';

const router = express.Router();

/**
 * @swagger
 * /api/lead/capture:
 *   post:
 *     summary: Capture lead information
 *     description: Store lead information for follow-up
 *     tags: [Lead]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the lead
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the lead
 *               phone:
 *                 type: string
 *                 description: Phone number of the lead
 *               dogBreed:
 *                 type: string
 *                 description: Breed of the dog
 *     responses:
 *       200:
 *         description: Lead information captured successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to capture lead information
 */
router.post('/capture', async (req, res) => {
  try {
    const leadData: Omit<LeadData, 'createdAt'> = req.body;
    
    // Mock lead data storage
    console.log('Lead data received:', leadData);
    
    res.json({ message: 'Lead information captured successfully' });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Failed to capture lead information' });
  }
});

export const leadRoutes = router; 