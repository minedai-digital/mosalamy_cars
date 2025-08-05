const fetch = require("node-fetch");

// رابط موقعك المسموح له فقط
const ALLOWED_ORIGIN = "https://minedai-digital.github.io";

exports.handler = async (event) => {
  const origin = event.headers.origin;

  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // الرد على طلب الـ OPTIONS (Preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "OK",
    };
  }

  // السماح فقط لموقعك
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
    // استقبال البيانات كـ form-urlencoded مباشرة
    const data = JSON.parse(event.body);
    const formData = new URLSearchParams(data).toString();

    // رابط Google Script Web App
    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbzsiLe90M9m7025VEuidmgueXGVf308ZsVLvTfoL_0_QdK5DLiMrnKGwtheh5Y8r6BvlA/exec";

    // إرسال الطلب لجوجل شيت
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
