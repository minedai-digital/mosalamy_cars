const fetch = require("node-fetch");

// رابط الموقع المسموح له يرسل طلبات
const ALLOWED_ORIGIN = "https://minedai-digital.github.io";

exports.handler = async (event) => {
  const origin = event.headers.origin;

  // هيدرز CORS
  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // إذا جاء طلب OPTIONS (Preflight) من المتصفح
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK",
    };
  }

  // منع أي موقع غير مسموح
  if (origin !== ALLOWED_ORIGIN) {
    return {
      statusCode: 403,
      headers,
      body: "Forbidden: Origin not allowed",
    };
  }

  // السماح فقط بـ POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
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
      headers,
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: "Error: " + error.message,
    };
  }
};
