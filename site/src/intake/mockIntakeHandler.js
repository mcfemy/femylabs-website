/*
 * Mock intake handler — used only during development when VITE_WEB3FORMS_KEY
 * is not set. It simulates network latency, logs the fields that would be
 * emailed via Web3Forms, and returns the same shape as a real success.
 */

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function mockIntakeHandler(fields) {
  await wait(1200)

  console.info(
    '%c[Femylabs intake — MOCK] Nothing was sent. Set VITE_WEB3FORMS_KEY in .env to email submissions.',
    'color:#5C8374;font-weight:bold',
  )
  console.info('[Femylabs intake — MOCK] Email fields:', fields)

  // Uncomment to exercise the error UI during development:
  // throw new Error('Simulated failure')

  return { reference: null, mock: true }
}
