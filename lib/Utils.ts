function env(key: string): string {
  const val = process.env[key];
  if (val === undefined) {
    throw new Error(`${key} is required`);
  }
  return val;
}

export { env };
