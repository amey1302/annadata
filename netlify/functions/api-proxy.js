const axios = require('axios');

exports.handler = async function (event) {
  const path = event.path.replace('/.netlify/functions/api-proxy', '');
  const backendUrl = `http://13.203.215.199:8080/food-donation${path}`;

  try {
    const response = await axios({
      method: event.httpMethod,
      url: backendUrl,
      headers: event.headers,
      data: event.body,
      params: event.queryStringParameters
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        message: 'Proxy error',
        error: error.message,
        details: error.response?.data || null
      })
    };
  }
};
