export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { Laminar } = await import('@lmnr-ai/lmnr');
    Laminar.initialize({
      logLevel: 'debug',
      projectApiKey: process.env.LMNR_PROJECT_API_KEY,
    });
  }
}