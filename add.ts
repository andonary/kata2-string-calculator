export function Add(nbs: string): number {
  let result = 0;
  let separator = ",";
  let newLine = "\n";
  let newDelimiter = "//";
  if (nbs) {
    let lines = nbs.split(newLine);
    for (let l = 0; lines[l]; l++) {
      if (lines[l].startsWith(newDelimiter)) {
        separator = lines[l].slice(newDelimiter.length);
        continue;
      }
      if (lines[l].endsWith(separator)) throw new Error();
      let line = lines[l].split(separator);
      for (let n = 0; line[n]; n++) {
        let value = Number(line[n]);
        if (value < 0) throw new Error();
        result += value;
      }
    }
  }
  return result;
}
