export function Add(numbers: string) {
  let result = 0;
  let newline = "\n";
  let separator = ",";
  let newDelimiter = "//";
  if (numbers) {
    for (const line of numbers.split(newline)) {
      if (line.endsWith(separator)) throw new Error();
      if (line.startsWith(newDelimiter)) {
        separator = line.substring(newDelimiter.length);
        continue;
      }
      for (const number of line.split(separator)) result += Number(number);
    }
  }
  if (isNaN(result)) throw new Error();
  return result;
}
