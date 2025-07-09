export async function slownami<T>(
  fn: () => Promise<T> | T,
  label = "unnamed",
  thresholdMs = 300,
  logger: (msg: string) => void = console.warn
): Promise<T> {
  const start =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  const result = await fn();
  const end =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  const duration = end - start;

  if (duration > thresholdMs) {
    logger(
      `[slownami] ${label} took ${Math.round(
        duration
      )}ms (threshold: ${thresholdMs}ms)`
    );
  }

  return result;
}
