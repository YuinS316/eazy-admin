export function parseTimeDuration(input: string): number | null {
  const regex = /(\d+)(year|month|w|d|h|m|s)/g;
  const matches = input.match(regex);

  if (!matches) {
    console.warn(`[parseTimeDuration warn]: no match unit in ${input}`);
    return null; // Invalid input format
  }

  let totalMilliseconds = 0;

  for (const match of matches) {
    const [, valueStr, unit] = match.match(/(\d+)(year|month|w|d|h|m|s)/)!;
    const value = parseInt(valueStr, 10);

    switch (unit) {
      case "year":
        totalMilliseconds += value * 365 * 24 * 60 * 60 * 1000;
        break;
      case "month":
        totalMilliseconds += value * 30 * 24 * 60 * 60 * 1000;
        break;
      case "w":
        totalMilliseconds += value * 7 * 24 * 60 * 60 * 1000;
        break;
      case "d":
        totalMilliseconds += value * 24 * 60 * 60 * 1000;
        break;
      case "h":
        totalMilliseconds += value * 60 * 60 * 1000;
        break;
      case "m":
        totalMilliseconds += value * 60 * 1000;
        break;
      case "s":
        totalMilliseconds += value * 1000;
        break;
      default:
        console.warn(`[parseTimeDuration warn]: invalid unit ${unit}`);
        return null; // Invalid unit
    }
  }

  const now = Date.now();
  const futureTimestamp = now + totalMilliseconds;

  return futureTimestamp;
}
