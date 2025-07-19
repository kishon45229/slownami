export async function slownami<T>(
  fn: () => T | Promise<T>,
  label: string = "unnamed",
  threshold: number = 300,
  logger: (msg: string) => void = console.warn
): Promise<T> {
  const start = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();

  const result = fn();
  const awaited = result instanceof Promise ? await result : result;

  const end = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
  const duration = end - start;

  if (duration > threshold) {
    logger(`[slownami] ${label} took ${Math.round(duration)}ms (threshold: ${threshold}ms)`);
  }

  return awaited;
}
