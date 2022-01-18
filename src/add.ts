function invalidError(error: any, property: string, message: string) {
  error.hasError = true;
  if (property === "negatives") {
    const negativesNotAllowed = "negatives not allowed: ";
    if (error[property].includes(negativesNotAllowed)) error[property] += ",";
    if (!error[property]) error[property] = negativesNotAllowed;
    error[property] += message;
  } else {
    error[property] += message;
  }
  if (error.syntax) error.fullMessage = error.syntax;
  if (error.negatives && error.fullMessage.length) error.fullMessage += "\n";
  if (error.negatives) error.fullMessage += error.negatives;
  return error;
}

export function Add(stringNumbers: string) {
  let result = 0;
  let delimiter = ",";
  let newDelimiter = "//";
  let newLine = "\n";
  let error = {
    hasError: false,
    syntax: "",
    negatives: "",
    fullMessage: "",
  };
  const lines = stringNumbers.split(newLine);
  for (const line of lines) {
    if (line.startsWith(newDelimiter)) {
      delimiter = line.substring(newDelimiter.length);
      continue;
    }
    if (line.endsWith(delimiter)) error = invalidError(error, "syntax", "invalid syntax");
    const values: string[] = line.split(delimiter);
    for (const value of values) {
      if (Number(value) < 0) error = invalidError(error, "negatives", `${value}`);
      if (Number(value) > 1000) continue;
      result += Number(value || 0);
    }
  }
  if (error.hasError) throw new Error(error.fullMessage);
  return result;
}
