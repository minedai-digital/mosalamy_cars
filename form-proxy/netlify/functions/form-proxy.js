exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body);

    // 🔹 ضع رابط Google Apps Script Web App هنا
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxm3vRNFvX9irFL7o-usyUqJ2V3ZZB7zPRPjrJRghN4eaPE2GuRxoocjg3J8-RvhGdNSg/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // حل مشكلة CORS
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

