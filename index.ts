export enum Entry {
    invalid='INVALID ENTRY'
}

function guard(entries: string, delimiter: string) {
    if (entries.endsWith(delimiter)) throw new Error(Entry.invalid);
    const entriesSplitted = entries.split(delimiter);
    const invalidValIndex = entriesSplitted.findIndex(val => isNaN(Number(val)));
    if (invalidValIndex > -1) {
        const indexInvalid = entries.indexOf(entriesSplitted[invalidValIndex]) + entriesSplitted[invalidValIndex].toString().search(/\D/);
        throw new Error(`${delimiter} expected but "${entries[indexInvalid]}" found at position ${indexInvalid}`);
    }
}

export function stringCalculator(entries: string) {
    let delimiter = ',';
    const newLine = '\\n';
    if (entries.startsWith('//')) {
        delimiter = entries.substring(2, entries.indexOf(newLine));
        entries = entries.substring(entries.indexOf('n') + 1);
    }
    const entryInLine = entries.replace(newLine, delimiter);
    guard(entryInLine, delimiter);
    return entryInLine
        .split(delimiter)
        .reduce((accumulator, entry) => accumulator + Number(entry ?? 0), 0);
}
