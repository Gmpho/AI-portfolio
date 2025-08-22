export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 200
): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        console.error(`Function failed after ${retries} retries:`, error);
        throw error;
      }
      const delay = baseDelay * (2 ** (attempt - 1)) + Math.random() * 100;
      console.warn(`Retrying in ${delay.toFixed(0)}ms (attempt ${attempt}/${retries})...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}