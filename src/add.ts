export function Add(myNumbers: string) {
    let separator = ",";
    let newLine = "\n";
    let newSeparator = "//";
    let result = 0;
    const lines: string[] = myNumbers.split(newLine);
    for (const line of lines) {
        if (line.startsWith(newSeparator)) {
            separator = line.slice(newSeparator.length);
            continue;
        }
        if (line.endsWith(separator)) throw new Error();
        const numbers: string[] = line.split(separator);
        for (const number of numbers) {
            result += Number(number);
            if (isNaN(result)) throw new Error();
        }
    }
    return result;
}
