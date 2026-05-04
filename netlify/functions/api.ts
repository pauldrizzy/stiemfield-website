import { Handler } from "@netlify/functions";

// This function handles any API routes you might need
// Netlify automatically routes /api/* requests here
const handler: Handler = async (event, context) => {
  // Add your API logic here if needed
  
  return {
    statusCode: 404,
    body: JSON.stringify({ message: "API endpoint not found" }),
  };
};

export { handler };
