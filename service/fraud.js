const axios = require('axios');

async function scan(url) {
  try {
    // Step 1: Submit URL for scanning
    const submitResponse = await axios.post("https://www.virustotal.com/api/v3/urls",
      new URLSearchParams({ url }),
      {
        headers: {
          "x-apikey": "65e9cdb8d8f891527b3c3f1705347dde135e6ae44b965da28ffd74f40513d22a"
        }
      }
    );
    
    const analysisId = submitResponse.data.data.id;
    console.log('Analysis ID:', analysisId); // Debug log [web:12]

    // Step 2: Poll for completion (better than fixed delay)
    let status = 'queued';
    let attempts = 0;
    const maxAttempts = 12; // ~2 minutes max

    while (status !== 'completed' && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 10000)); // 10s wait
      const analysisResponse = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        headers: {
          "x-apikey": "65e9cdb8d8f891527b3c3f1705347dde135e6ae44b965da28ffd74f40513d22a"
        }
      });

      const data = analysisResponse.data.data;
      status = data.attributes?.status; // Check status first
      console.log(`Attempt ${++attempts}, Status: ${status}`); // Debug [web:14]

      if (status === 'completed') {
        const stats = data.attributes?.stats; // Use stats for analysis object [web:13]
        if (stats && stats.malicious > 0) {
          return "malicious";
        }
        return "clean";
      }
    }

    console.log('Analysis timeout or failed');
    return "unknown";

  } catch (error) {
    console.error('VirusTotal error:', error.response?.data || error.message);
    return "error";
  }
}

module.exports = scan;
