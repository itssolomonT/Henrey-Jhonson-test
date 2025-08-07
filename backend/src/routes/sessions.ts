import express from 'express';

const router = express.Router();

// Mock sessions data
const mockSessions = [
  {
    id: '1',
    sessionId: 'sess_001',
    brandId: '1',
    zipCode: '27000',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    ipAddress: '192.168.1.1',
    referrer: 'https://google.com',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'security_systems',
    pageViews: 5,
    timeOnSite: 180,
    isReturnVisitor: false,
    leadGenerated: true,
    leadId: 'lead_001',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:45:00Z')
  },
  {
    id: '2',
    sessionId: 'sess_002',
    brandId: '2',
    zipCode: '29000',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
    ipAddress: '192.168.1.2',
    referrer: 'https://facebook.com',
    utmSource: 'facebook',
    utmMedium: 'social',
    utmCampaign: 'home_security',
    pageViews: 3,
    timeOnSite: 120,
    isReturnVisitor: true,
    leadGenerated: false,
    leadId: null,
    createdAt: new Date('2024-01-15T14:20:00Z'),
    updatedAt: new Date('2024-01-15T14:35:00Z')
  }
];

// Create new session
router.post('/', async (req, res) => {
  try {
    const sessionData = req.body;
    
    // Mock session creation
    const newSession = {
      id: Date.now().toString(),
      sessionId: `sess_${Date.now()}`,
      ...sessionData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In a real app, you would save to database here
    mockSessions.push(newSession);

    res.status(201).json({
      success: true,
      data: newSession
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create session'
    });
  }
});

// Get session by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const session = mockSessions.find(s => s.id === id);

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session'
    });
  }
});

// Update session
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const sessionIndex = mockSessions.findIndex(s => s.id === id);
    
    if (sessionIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Mock session update
    const updatedSession = {
      ...mockSessions[sessionIndex],
      ...updateData,
      updatedAt: new Date()
    };

    mockSessions[sessionIndex] = updatedSession;

    res.json({
      success: true,
      data: updatedSession
    });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update session'
    });
  }
});

// Get all sessions with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      brandId, 
      zipCode,
      isReturnVisitor,
      leadGenerated,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Filter sessions based on query parameters
    let filteredSessions = mockSessions;
    
    if (brandId) {
      filteredSessions = filteredSessions.filter(session => 
        session.brandId === brandId
      );
    }
    
    if (zipCode) {
      filteredSessions = filteredSessions.filter(session => 
        session.zipCode === zipCode
      );
    }
    
    if (isReturnVisitor !== undefined) {
      filteredSessions = filteredSessions.filter(session => 
        session.isReturnVisitor === (isReturnVisitor === 'true')
      );
    }
    
    if (leadGenerated !== undefined) {
      filteredSessions = filteredSessions.filter(session => 
        session.leadGenerated === (leadGenerated === 'true')
      );
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      filteredSessions = filteredSessions.filter(session => 
        session.createdAt >= start && session.createdAt <= end
      );
    }

    // Sort sessions
    filteredSessions.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'desc') {
        return new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
      }
      return new Date(aValue as string).getTime() - new Date(bValue as string).getTime();
    });

    // Pagination
    const total = filteredSessions.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedSessions = filteredSessions.slice(startIndex, endIndex);

    // Calculate analytics
    const analytics = {
      totalSessions: total,
      returnVisitors: filteredSessions.filter(s => s.isReturnVisitor).length,
      newVisitors: filteredSessions.filter(s => !s.isReturnVisitor).length,
      leadConversionRate: filteredSessions.length > 0 ? 
        (filteredSessions.filter(s => s.leadGenerated).length / filteredSessions.length * 100).toFixed(2) : '0',
      averageTimeOnSite: filteredSessions.length > 0 ? 
        (filteredSessions.reduce((sum, s) => sum + s.timeOnSite, 0) / filteredSessions.length).toFixed(0) : '0',
      averagePageViews: filteredSessions.length > 0 ? 
        (filteredSessions.reduce((sum, s) => sum + s.pageViews, 0) / filteredSessions.length).toFixed(1) : '0'
    };

    res.json({
      success: true,
      data: paginatedSessions,
      analytics,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sessions'
    });
  }
});

// Get session analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const { id } = req.params;
    
    const session = mockSessions.find(s => s.id === id);

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Mock analytics data
    const analytics = {
      sessionId: session.sessionId,
      brandId: session.brandId,
      zipCode: session.zipCode,
      isReturnVisitor: session.isReturnVisitor,
      leadGenerated: session.leadGenerated,
      conversionRate: session.leadGenerated ? 100 : 0,
      timeOnSite: session.timeOnSite,
      pageViews: session.pageViews,
      averageTimePerPage: session.timeOnSite / session.pageViews,
      utmPerformance: {
        source: session.utmSource,
        medium: session.utmMedium,
        campaign: session.utmCampaign
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching session analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session analytics'
    });
  }
});

export default router; 