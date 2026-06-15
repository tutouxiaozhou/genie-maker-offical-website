const url = process.argv[2] || process.env.STARTUP_URL || 'http://127.0.0.1:3001';
const timeoutMs = Number(process.env.STARTUP_TIMEOUT_MS || 15000);

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), timeoutMs);

try {
  const response = await fetch(url, { signal: controller.signal });
  const body = await response.text();

  if (!response.ok || /Internal Server Error/i.test(body)) {
    throw new Error(`startup check failed: ${response.status} ${response.statusText}`);
  }

  if (!body.includes('Genie Maker')) {
    throw new Error('startup check failed: expected "Genie Maker" in response body');
  }

  console.log(`startup ok: ${response.status} ${url}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
} finally {
  clearTimeout(timeout);
}
