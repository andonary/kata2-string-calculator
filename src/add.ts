function AddOneLine(line: string) {
    return line.split(",").reduce((result, value) => {
        result += Number(value || "0");
        return result;
    }, 0);
}

export function Add(numberString: string): number {
    const lines: string[] = numberString.split("\n");
    return lines.reduce((result, line) => {
        result += AddOneLine(line);
        return result;
    }, 0);
}
