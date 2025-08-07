"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Mock brands data
const mockBrands = [
    {
        id: '1',
        name: 'safehaven-nc',
        displayName: 'SafeHaven NC',
        states: ['NC'],
        zipCodes: ['27000', '27001', '27002'],
        phoneNumber: '(919) 555-0123',
        website: 'https://safehaven-nc.com',
        colors: { primary: '#1e40af', secondary: '#3b82f6' },
        logo: '/logo-nc.png',
        ctaText: 'Get NC Security Quote',
        ctaColor: '#1e40af',
        description: 'North Carolina\'s trusted home security provider with 15+ years of experience protecting families across the state.',
        features: [
            '24/7 Professional Monitoring',
            'Smart Home Integration',
            'Mobile App Control',
            'HD Video Surveillance',
            'Environmental Monitoring'
        ],
        testimonials: [
            {
                id: '1',
                rating: 5,
                text: 'SafeHaven has been protecting our family for over 3 years. Excellent service and reliable monitoring!',
                name: 'Sarah Johnson',
                location: 'Raleigh, NC',
                date: '2024-01-15'
            },
            {
                id: '2',
                rating: 5,
                text: 'Professional installation and great customer support. Highly recommend!',
                name: 'Mike Chen',
                location: 'Charlotte, NC',
                date: '2024-01-10'
            }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: {
            leads: 150,
            sessions: 300
        }
    },
    {
        id: '2',
        name: 'safehaven-sc',
        displayName: 'SafeHaven SC',
        states: ['SC'],
        zipCodes: ['29000', '29001', '29002'],
        phoneNumber: '(803) 555-0123',
        website: 'https://safehaven-sc.com',
        colors: { primary: '#059669', secondary: '#10b981' },
        logo: '/logo-sc.png',
        ctaText: 'Get SC Security Quote',
        ctaColor: '#059669',
        description: 'South Carolina\'s leading security company, providing state-of-the-art protection for your home and family.',
        features: [
            'Advanced Detection Systems',
            'HD Video Monitoring',
            'Professional Installation',
            '24/7 Support',
            'Smart Home Integration'
        ],
        testimonials: [
            {
                id: '3',
                rating: 5,
                text: 'Best security system we\'ve ever had. The monitoring is top-notch!',
                name: 'Jennifer Brown',
                location: 'Columbia, SC',
                date: '2024-01-05'
            },
            {
                id: '4',
                rating: 5,
                text: 'Great value and excellent customer service. Highly recommend!',
                name: 'Robert Davis',
                location: 'Greenville, SC',
                date: '2024-01-08'
            }
        ],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: {
            leads: 120,
            sessions: 250
        }
    }
];
// Get all brands with enhanced filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 20, state, isActive, search, sortBy = 'name', sortOrder = 'asc' } = req.query;
        // Filter brands based on query parameters
        let filteredBrands = mockBrands;
        if (state) {
            filteredBrands = filteredBrands.filter(brand => brand.states.includes(state));
        }
        if (isActive !== undefined) {
            filteredBrands = filteredBrands.filter(brand => brand.isActive === (isActive === 'true'));
        }
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredBrands = filteredBrands.filter(brand => brand.name.toLowerCase().includes(searchTerm) ||
                brand.displayName.toLowerCase().includes(searchTerm) ||
                brand.description.toLowerCase().includes(searchTerm));
        }
        // Sort brands
        filteredBrands.sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
            if (sortOrder === 'desc') {
                return String(bValue).localeCompare(String(aValue));
            }
            return String(aValue).localeCompare(String(bValue));
        });
        // Pagination
        const total = filteredBrands.length;
        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = startIndex + Number(limit);
        const paginatedBrands = filteredBrands.slice(startIndex, endIndex);
        res.json({
            success: true,
            data: paginatedBrands,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch brands'
        });
    }
});
// Get brand by ID with detailed analytics
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { includeAnalytics = 'false' } = req.query;
        const brand = mockBrands.find(b => b.id === id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                error: 'Brand not found'
            });
        }
        let analytics = null;
        if (includeAnalytics === 'true') {
            analytics = {
                totalLeads: brand._count.leads,
                totalSessions: brand._count.sessions,
                conversionRate: ((brand._count.leads / brand._count.sessions) * 100).toFixed(2),
                averageRating: 4.8,
                monthlyGrowth: 12.5
            };
        }
        res.json({
            success: true,
            data: {
                ...brand,
                analytics
            }
        });
    }
    catch (error) {
        console.error('Error fetching brand:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch brand'
        });
    }
});
// Get brand by ZIP code
router.get('/zip/:zipCode', async (req, res) => {
    try {
        const { zipCode } = req.params;
        const brand = mockBrands.find(b => b.zipCodes.includes(zipCode));
        if (!brand) {
            return res.status(404).json({
                success: false,
                error: 'No brand found for this ZIP code'
            });
        }
        res.json({
            success: true,
            data: brand
        });
    }
    catch (error) {
        console.error('Error fetching brand by ZIP:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch brand by ZIP'
        });
    }
});
// Create new brand
router.post('/', async (req, res) => {
    try {
        const brandData = req.body;
        // Mock brand creation
        const newBrand = {
            id: Date.now().toString(),
            ...brandData,
            createdAt: new Date(),
            updatedAt: new Date(),
            _count: {
                leads: 0,
                sessions: 0
            }
        };
        res.status(201).json({
            success: true,
            data: newBrand
        });
    }
    catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create brand'
        });
    }
});
// Update brand
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const brand = mockBrands.find(b => b.id === id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                error: 'Brand not found'
            });
        }
        // Mock brand update
        const updatedBrand = {
            ...brand,
            ...updateData,
            updatedAt: new Date()
        };
        res.json({
            success: true,
            data: updatedBrand
        });
    }
    catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update brand'
        });
    }
});
// Delete brand
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const brand = mockBrands.find(b => b.id === id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                error: 'Brand not found'
            });
        }
        res.json({
            success: true,
            message: 'Brand deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete brand'
        });
    }
});
exports.default = router;
//# sourceMappingURL=brands.js.map