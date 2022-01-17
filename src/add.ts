export function Add(stringNumbers: string) {
  let result = 0;
  let delimiter = ",";
  let newDelimiter = "//";
  let newLine = "\n";
  const lines = stringNumbers.split(newLine);
  for (const line of lines) {
    if (line.startsWith(newDelimiter)) {
      delimiter = line.substring(newDelimiter.length);
      continue;
    }
    if (line.endsWith(delimiter)) throw new Error();
    const values: string[] = line.split(delimiter);
    for (const value of values) {
      result += Number(value || 0);
    }
  }
  return result;
}
