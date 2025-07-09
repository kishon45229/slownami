# slownami

![npm](https://img.shields.io/npm/v/slownami)
![license](https://img.shields.io/npm/l/slownami)
![downloads](https://img.shields.io/npm/dm/slownami)

Log any function that runs too slow — simple performance monitoring for Node.js or browser.

## Install

```bash
npm install slownami
```

## Usage

Wrap any function call with `slownami` to monitor its execution time. If it runs longer than your threshold, a warning is logged.

## Real-world Example

You can use `slownami` to monitor any function, such as database queries, API calls, or expensive computations:

```ts
import { slownami } from "slownami";

function expensiveCalculation(n: number) {
  let sum = 0;
  for (let i = 0; i < n * 1e6; i++) sum += i;
  return sum;
}

async function run() {
  await slownami(() => expensiveCalculation(100), "expensiveCalculation", 100);
}

run();
```

If `expensiveCalculation` takes longer than 100ms, you'll see a log like:

```
[slownami] expensiveCalculation took 350ms (threshold: 100ms)
```

## Function Signature

```ts
slownami<T>(
  fn: () => Promise<T> | T,
  label?: string,
  thresholdMs?: number,
  logger?: (msg: string) => void
): Promise<T>
```

- **fn**: The function to execute and monitor.
- **label**: (optional) Name for logging. Default: `"unnamed"`.
- **thresholdMs**: (optional) Time in ms before logging a warning. Default: `300`.
- **logger**: (optional) Custom logger function. Default: `console.warn`.

## License

MIT
