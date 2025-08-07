import express from 'express';

const router = express.Router();

// Get SafeHaven-specific analytics dashboard
router.get('/dashboard', async (req, res) => {
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

// Get lead performance by ZIP code (for geographic scaling)
router.get('/geographic/:zipCode', async (req, res) => {
  try {
    const { zipCode } = req.params;
    const { brandId, startDate, endDate } = req.query;

    const where: any = { zipCode };
    if (brandId) where.brandId = brandId;
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    }

    // Mock data for geographic performance
    const mockData = {
      zipCode,
      marketSegment: getMarketSegment(zipCode),
      performance: [
        { brandId: 'safehaven-nc', status: 'converted', callSource: 'inbound', _count: { id: 25 }, _avg: { leadScore: 82.1, timeToClose: 1.6 } },
        { brandId: 'safehaven-sc', status: 'pending', callSource: 'outbound', _count: { id: 18 }, _avg: { leadScore: 75.8, timeToClose: 1.8 } }
      ],
      totalLeads: 43,
      averageLeadScore: 78.9,
      averageTimeToClose: 1.7
    };

    res.json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Error fetching geographic performance:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch geographic performance'
    });
  }
});

// Get sales team performance (national call center vs branch level)
router.get('/sales-teams', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where: any = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    }

    // Mock data for sales team performance
    const mockData = {
      nationalCallCenter: {
        totalLeads: 798,
        averageLeadScore: 81.2,
        averageTimeToClose: 1.6,
        breakdown: [
          { salesTeam: 'national_call_center', callSource: 'inbound', _count: { id: 456 }, _avg: { leadScore: 85.2, timeToClose: 1.4 } },
          { salesTeam: 'national_call_center', callSource: 'online', _count: { id: 342 }, _avg: { leadScore: 72.1, timeToClose: 1.8 } }
        ]
      },
      branchLevel: {
        totalLeads: 449,
        averageLeadScore: 74.2,
        averageTimeToClose: 1.9,
        breakdown: [
          { salesTeam: 'branch_level', callSource: 'door_knocking', _count: { id: 289 }, _avg: { leadScore: 79.8, timeToClose: 1.9 } },
          { salesTeam: 'branch_level', callSource: 'outbound', _count: { id: 160 }, _avg: { leadScore: 68.3, timeToClose: 2.1 } }
        ]
      }
    };

    res.json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Error fetching sales team performance:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sales team performance'
    });
  }
});

// Get brand scaling metrics (for 5-10 new brands per year)
router.get('/brand-scaling', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where: any = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string)
      };
    }

    // Mock data for brand scaling metrics
    const mockData = {
      totalBrands: 2,
      averageConversionRate: 23.4,
      averageTimeToClose: 1.7,
      brands: [
        {
          brandId: 'safehaven-nc',
          brandName: 'SafeHaven NC',
          totalLeads: 647,
          conversionRate: 24.1,
          averageTimeToClose: 1.6,
          averageLeadScore: 81.2,
          marketCoverage: 45
        },
        {
          brandId: 'safehaven-sc',
          brandName: 'SafeHaven SC',
          totalLeads: 600,
          conversionRate: 22.7,
          averageTimeToClose: 1.8,
          averageLeadScore: 75.8,
          marketCoverage: 38
        }
      ]
    };

    res.json({
      success: true,
      data: mockData
    });
  } catch (error) {
    console.error('Error fetching brand scaling metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch brand scaling metrics'
    });
  }
});

// Helper functions
async function getSalesCycleMetrics(where: any) {
  // Mock sales cycle metrics
  return {
    totalConverted: 291,
    avgTimeToClose: 1.7,
    targetTimeToClose: 1.7, // SafeHaven target
    performanceVsTarget: 'on_target'
  };
}

async function getGeographicPerformance(where: any) {
  // Mock geographic performance data
  return [
    { zipCode: '27000', leadCount: 45, averageScore: 82.1, marketSegment: 'premium_urban' },
    { zipCode: '27001', leadCount: 38, averageScore: 79.5, marketSegment: 'suburban_family' },
    { zipCode: '27002', leadCount: 32, averageScore: 76.8, marketSegment: 'rural_community' },
    { zipCode: '29000', leadCount: 42, averageScore: 81.2, marketSegment: 'premium_urban' },
    { zipCode: '29001', leadCount: 35, averageScore: 77.9, marketSegment: 'suburban_family' }
  ];
}

async function getBrandPerformance(where: any) {
  // Mock brand performance data
  return [
    { brandId: 'safehaven-nc', leadCount: 647, averageScore: 81.2, averageTimeToClose: 1.6 },
    { brandId: 'safehaven-sc', leadCount: 600, averageScore: 75.8, averageTimeToClose: 1.8 }
  ];
}

async function getConversionRates(where: any) {
  // Mock conversion rates data
  return {
    overall: 23.4,
    byTeam: {
      national_call_center: { total: 798, converted: 187 },
      branch_level: { total: 449, converted: 104 }
    }
  };
}

function getMarketSegment(zipCode: string): string {
  const zipPrefix = zipCode.substring(0, 3);
  
  if (['100', '101', '102', '200', '201', '202'].includes(zipPrefix)) {
    return 'premium_urban';
  }
  
  if (['300', '301', '400', '401', '500', '501'].includes(zipPrefix)) {
    return 'suburban_family';
  }
  
  if (['600', '601', '700', '701', '800', '801'].includes(zipPrefix)) {
    return 'rural_community';
  }
  
  return 'standard_market';
}

export default router; 