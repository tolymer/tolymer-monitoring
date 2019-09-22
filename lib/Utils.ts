function env(key: string): string;
function env<T>(key: string, defaultValue: T): string | T;
function env<T>(key: string, defaultValue?: T): string | T {
  const val = process.env[key];
  if (val !== undefined) {
    return val;
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw new Error(`ENV ${key} is required`);
  }
}

export { env };
