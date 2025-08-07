const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Analytics: http://localhost:${PORT}/api/analytics/dashboard`);
});

module.exports = app;
