"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get weather by ZIP code
router.get('/:zipCode', async (req, res) => {
    try {
        const { zipCode } = req.params;
        // Mock weather data for now
        const weatherData = {
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
    }
    catch (error) {
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
    }
    catch (error) {
        console.error('Error clearing weather cache:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear weather cache'
        });
    }
});
exports.default = router;
//# sourceMappingURL=weather.js.map