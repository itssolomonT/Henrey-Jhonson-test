import express from 'express';
import { getBrandByZipCode } from '@safehaven/shared';

const router = express.Router();

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
    updatedAt: new Date()
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
    updatedAt: new Date()
  }
];

// Get brand by ZIP code
router.get('/brand/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;
    
    // First try to find in mock data
    let brand = mockBrands.find(b => 
      b.zipCodes.includes(zipCode) && b.isActive
    );

    // Fallback to shared brands if not in mock data
    if (!brand) {
      const sharedBrand = getBrandByZipCode(zipCode);
      if (sharedBrand) {
        brand = {
          id: sharedBrand.id,
          name: sharedBrand.name,
          displayName: sharedBrand.displayName,
          states: sharedBrand.states,
          zipCodes: sharedBrand.zipCodes,
          phoneNumber: sharedBrand.phoneNumber,
          website: sharedBrand.website,
          colors: sharedBrand.colors as any,
          logo: sharedBrand.logo,
          ctaText: sharedBrand.ctaText,
          ctaColor: sharedBrand.ctaColor,
          description: sharedBrand.description,
          features: sharedBrand.features,
          testimonials: sharedBrand.testimonials as any,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
    }

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
  } catch (error) {
    console.error('Error fetching brand by ZIP:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch brand by ZIP'
    });
  }
});

// Get location info by ZIP code
router.get('/info/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;
    
    // Mock location data
    const locationData = {
      zipCode,
      city: zipCode === '27000' ? 'Charlotte' : zipCode === '29000' ? 'Columbia' : zipCode === '37000' ? 'Nashville' : 'Atlanta',
      state: zipCode === '27000' ? 'NC' : zipCode === '29000' ? 'SC' : zipCode === '37000' ? 'TN' : 'GA',
      county: 'Local County',
      coordinates: { lat: 35.2271, lng: -80.8431 },
      timezone: 'America/New_York',
      population: 850000,
      crimeRate: 'Low',
      responseTime: '24 hours'
    };

    res.json({
      success: true,
      data: locationData
    });
  } catch (error) {
    console.error('Error fetching location info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch location info'
    });
  }
});

export default router; 