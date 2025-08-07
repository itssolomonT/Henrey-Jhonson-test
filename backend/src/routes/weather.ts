import express from 'express';
import axios from 'axios';
// Mock data - no database needed
import { WeatherData } from '@safehaven/shared';

const router = express.Router();

// Get weather by ZIP code
router.get('/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;

    // Mock weather data for now
    const weatherData: WeatherData = {
      temperature: 72,
      condition: 'Sunny',
      humidity: 45,
      windSpeed: 8,
      location: `ZIP ${zipCode}`
    };

    res.json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather data'
    });
  }
});

// Clear weather cache
router.delete('/cache/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;

    res.json({
      success: true,
      message: 'Weather cache cleared'
    });
  } catch (error) {
    console.error('Error clearing weather cache:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear weather cache'
    });
  }
});

export default router; 