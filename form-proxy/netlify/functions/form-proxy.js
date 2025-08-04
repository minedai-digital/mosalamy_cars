const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    // رابط Google Script Web App
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyfJKJNMBWPeijToHUJ7uPAElM4AAAaVeo7WKRIJCq45Hnh0Szu6uuOLdaeNZe4n3Zt4Q/exec";

    const formData = new URLSearchParams(data);

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: formData,
    });

    const text = await response.text();

    return {
      statusCode: 200,
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error: " + error.message,
    };
  }
};
