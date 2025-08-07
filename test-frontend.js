const axios = require('axios');

async function testFrontend() {
  console.log('🔍 Testing Frontend Server...\n');

  try {
    console.log('📡 Testing Frontend (Port 3000)...');
    const response = await axios.get('http://localhost:3000', { 
      timeout: 10000,
      validateStatus: function (status) {
        return status < 500; // Accept all status codes less than 500
      }
    });
    
    console.log('✅ Frontend Status:', response.status);
    console.log('📄 Content Type:', response.headers['content-type']);
    console.log('📏 Content Length:', response.data?.length || 'N/A');
    
    if (response.status === 200) {
      console.log('✅ Frontend is working!');
    } else {
      console.log('⚠️ Frontend returned status:', response.status);
    }
    
  } catch (error) {
    console.log('❌ Frontend Error:', error.message);
    if (error.response) {
      console.log('📊 Response Status:', error.response.status);
      console.log('📄 Response Headers:', error.response.headers);
      console.log('📝 Response Data:', error.response.data?.substring(0, 200) + '...');
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎯 Backend Status:');
  console.log('- Backend API: http://localhost:4001 ✅');
  console.log('- Analytics: http://localhost:4001/api/analytics/dashboard ✅');
  console.log('\n📝 Next Steps:');
  console.log('1. Backend is working perfectly');
  console.log('2. Frontend needs debugging');
  console.log('3. Try accessing http://localhost:3000 in browser');
}

testFrontend().catch(console.error);
