import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Compression and logging
app.use(compression());
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: {
      api: 'connected'
    }
  });
});

// Analytics dashboard endpoint
app.get('/api/analytics/dashboard', (req, res) => {
  try {
    // Mock analytics data
    const mockData = {
      overview: {
        totalLeads: 1247,
        averageLeadScore: 78.5,
        averageSalesCycle: 1.7,
        conversionRate: 23.4
      },
      leadSources: [
        { source: 'website', count: 456, averageScore: 82.3 },
        { source: 'phone', count: 342, averageScore: 75.8 },
        { source: 'referral', count: 289, averageScore: 79.2 },
        { source: 'social', count: 160, averageScore: 68.5 }
      ],
      callSources: [
        { callSource: 'inbound', count: 456, averageScore: 85.2 },
        { callSource: 'outbound', count: 342, averageScore: 72.1 },
        { callSource: 'online', count: 289, averageScore: 78.9 },
        { callSource: 'door_knocking', count: 160, averageScore: 76.3 }
      ],
      salesCycle: {
        totalConverted: 291,
        avgTimeToClose: 1.7,
        targetTimeToClose: 1.7,
        performanceVsTarget: 'on_target'
      },
      geographic: [
        { zipCode: '27000', leadCount: 45, averageScore: 82.1, marketSegment: 'premium_urban' },
        { zipCode: '27001', leadCount: 38, averageScore: 79.5, marketSegment: 'suburban_family' },
        { zipCode: '27002', leadCount: 32, averageScore: 76.8, marketSegment: 'rural_community' },
        { zipCode: '29000', leadCount: 42, averageScore: 81.2, marketSegment: 'premium_urban' },
        { zipCode: '29001', leadCount: 35, averageScore: 77.9, marketSegment: 'suburban_family' }
      ],
      brands: [
        { brandId: 'safehaven-nc', leadCount: 647, averageScore: 81.2, averageTimeToClose: 1.6 },
        { brandId: 'safehaven-sc', leadCount: 600, averageScore: 75.8, averageTimeToClose: 1.8 }
      ],
      conversions: {
        overall: 23.4,
        byTeam: {
          national_call_center: { total: 798, converted: 187 },
          branch_level: { total: 449, converted: 104 }
        }
      }
    };

    res.json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
});

// Mock brands API
app.get('/api/brands', (req, res) => {
  const brands = [
    {
      id: 'safehaven-nc',
      name: 'SafeHaven NC',
      displayName: 'SafeHaven Security Systems',
      states: ['NC'],
      zipCodes: ['27000', '27001', '27002', '27003', '27004'],
      phoneNumber: '(919) 555-0123',
      website: 'https://safehaven-nc.com',
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        accent: '#f59e0b'
      },
      logo: '/logos/safehaven-nc.svg',
      ctaText: 'Get Your Free Security Quote',
      ctaColor: '#1e40af',
      description: 'North Carolina\'s trusted home security provider.',
      features: [
        '24/7 Professional Monitoring',
        'Smart Home Integration',
        'Mobile App Control',
        'Video Surveillance',
        'Environmental Monitoring'
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          location: 'Raleigh, NC',
          rating: 5,
          text: 'SafeHaven has been protecting our family for over 3 years. Excellent service!'
        },
        {
          name: 'Mike Chen',
          location: 'Charlotte, NC',
          rating: 5,
          text: 'Professional installation and great customer support. Highly recommend!'
        }
      ],
      isActive: true,
      _count: {
        leads: 45,
        sessions: 120
      }
    },
    {
      id: 'safehaven-sc',
      name: 'SafeHaven SC',
      displayName: 'SafeHaven Security Systems',
      states: ['SC'],
      zipCodes: ['29000', '29001', '29002', '29003', '29004'],
      phoneNumber: '(803) 555-0123',
      website: 'https://safehaven-sc.com',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        accent: '#f59e0b'
      },
      logo: '/logos/safehaven-sc.svg',
      ctaText: 'Get Your Free Security Quote',
      ctaColor: '#059669',
      description: 'South Carolina\'s trusted home security provider.',
      features: [
        '24/7 Professional Monitoring',
        'Smart Home Integration',
        'Mobile App Control',
        'Video Surveillance',
        'Environmental Monitoring'
      ],
      testimonials: [
        {
          name: 'Jennifer Davis',
          location: 'Columbia, SC',
          rating: 5,
          text: 'SafeHaven has been protecting our family for over 2 years. Excellent service!'
        },
        {
          name: 'Robert Wilson',
          location: 'Greenville, SC',
          rating: 5,
          text: 'Professional installation and great customer support. Highly recommend!'
        }
      ],
      isActive: true,
      _count: {
        leads: 38,
        sessions: 95
      }
    }
  ];

  res.json({
    success: true,
    data: brands
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SafeHaven API server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
  console.log(`🔗 Frontend URL: http://localhost:3000`);
  console.log(`📈 Analytics endpoint: http://localhost:${PORT}/api/analytics/dashboard`);
});

export default app;
