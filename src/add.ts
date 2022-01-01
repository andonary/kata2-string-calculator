export function Add(stringNumber: string) {
    const lines: string[] = stringNumber.split("\\n");
    const separator: string = lines[0].startsWith("//") ? ";" : ",";
    if (lines[0].startsWith("//")) lines.shift();
    for (const line of lines) {
        const regex = new RegExp(`^.*${separator}$`);
        const error = regex.test(line);
        if (error) throw new Error("");
    }
    const inOneLine: string = stringNumber.split("\\n").join(separator);
    const multipleStringNumbers: string[] = inOneLine.split(separator);
    let result: number = 0;
    for (const singleStringNumber of multipleStringNumbers) {
        result += Number(singleStringNumber) || 0;
    }
    return result;
}
