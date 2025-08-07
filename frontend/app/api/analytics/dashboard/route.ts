import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock analytics data for frontend deployment
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
    }

    return NextResponse.json({
      success: true,
      data: mockData
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch analytics'
      },
      { status: 500 }
    )
  }
}
