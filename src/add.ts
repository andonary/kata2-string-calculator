export function Add(stringNumbers: string) {
    let number: number = 0;
    let separator = ",";
    let lineSeparator = "\n";
    let newDelimiter = "//";
    const lines = stringNumbers.split(lineSeparator);
    for (const line of lines) {
        if (line.endsWith(separator)) throw new Error();
        if (line.startsWith(newDelimiter)) separator = line.substring(2);
        const arrayNumbers: string[] = line.split(separator);
        for (const stringNumber of arrayNumbers) {
            if (stringNumber === newDelimiter) continue;
            number += Number(stringNumber || 0);
            if (isNaN(number)) throw new Error();
        }
    }
    return number;
}
