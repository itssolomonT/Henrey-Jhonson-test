const axios = require('axios');

async function testServers() {
  console.log('🧪 Testing SafeHaven Servers...\n');

  // Test Backend Server
  try {
    console.log('📡 Testing Backend Server (Port 4001)...');
    const backendHealth = await axios.get('http://localhost:4001/health');
    console.log('✅ Backend Health Check:', backendHealth.data);
    
    const analytics = await axios.get('http://localhost:4001/api/analytics/dashboard');
    console.log('✅ Analytics Endpoint:', analytics.data.success ? 'Working' : 'Failed');
    console.log('📊 Analytics Data Available:', analytics.data.data ? 'Yes' : 'No');
  } catch (error) {
    console.log('❌ Backend Server Error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test Frontend Server
  try {
    console.log('🌐 Testing Frontend Server (Port 3000)...');
    const frontend = await axios.get('http://localhost:3000', { timeout: 15000 });
    console.log('✅ Frontend Server:', frontend.status === 200 ? 'Running' : 'Error');
  } catch (error) {
    console.log('❌ Frontend Server Error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
  console.log('🎯 Summary:');
  console.log('- Backend API: http://localhost:4001');
  console.log('- Frontend App: http://localhost:3000');
  console.log('- Analytics Dashboard: http://localhost:3000/admin');
  console.log('\n📝 Login Credentials:');
  console.log('- Username: admin');
  console.log('- Password: safehaven2024');
}

testServers().catch(console.error);
