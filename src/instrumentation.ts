export async function register() {
  const { registerOTel } = await import('@vercel/otel');
  registerOTel({
    serviceName: 'the-vale-observability',
  });

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Laminar } = await import('@lmnr-ai/lmnr');
    if (!process.env.LMNR_PROJECT_API_KEY) {
      throw new Error("LMNR_PROJECT_API_KEY is not set");
    }
    Laminar.initialize({
      projectApiKey: process.env.LMNR_PROJECT_API_KEY,
    });
  }
}