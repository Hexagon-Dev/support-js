import { escapeRegExp } from './helpers';

const alphabetStr = 'abcdefghijklmnopqrstuvwxyz';
const numbersStr = '0123456789';

// Return the remainder of a string after the first occurrence of a given value.
export const after = (subject: string, search: string | number): string => {
    if (typeof search === 'number') {
        search = search.toString();
    }

    if (search === "") {
        return subject;
    }

    const pos = subject.indexOf(search);

    return pos === -1 ? subject : subject.substring(pos + search.length);
}

// Return the remainder of a string after the last occurrence of a given value.
export const afterLast = (subject: string, search: string | number): string => {
    if (typeof search === 'number') {
        search = search.toString();
    }

    if (search === "") {
        return subject;
    }

    const pos = subject.lastIndexOf(search);

    return pos === -1 ? subject : subject.substring(pos + search.length);
}

// Get the portion of a string before the first occurrence of a given value.
export const before = (subject: string, search: string | number): string => {
    if (typeof search === 'number') {
        search = search.toString();
    }

    if (search === "") {
        return subject;
    }

    const pos = subject.indexOf(search);

    return pos === -1 ? subject : subject.substring(0, pos);
}

// Get the portion of a string before the last occurrence of a given value.
export const beforeLast = (subject: string, search: string | number): string => {
    if (typeof search === 'number') {
        search = search.toString();
    }

    if (search === "") {
        return subject;
    }

    const pos = subject.lastIndexOf(search);

    return pos === -1 ? subject : subject.substring(0, pos);
}

// Get the portion of a string between two given values.
export const between = (subject: string, from: string | number, to: string | number): string => {
    if (from === '' || to === '') {
        return subject;
    }

    return beforeLast(after(subject, from), to);
}

// Get the smallest possible portion of a string between two given values.
export const betweenFirst = (subject: string, from: string | number, to: string | number): string => {
    if (from === '' || to === '') {
        return subject;
    }

    return before(after(subject, from), to);
}

// Convert a value to camel case.
export const camel = (value: string): string => {
    return lcfirst(studly(value));
}

// Remove the given string(s) if it exists at the start of the haystack.
export const chopStart = (subject: string, needle: string | Array<string>): string => {
    const needles = Array.isArray(needle) ? needle : [needle];

    for (const n of needles) {
        if (subject.startsWith(n)) {
            return subject.substring(n.length);
        }
    }

    return subject;
};

// Remove the given string(s) if it exists at the end of the haystack.
export const chopEnd = (subject: string, needle: string | Array<string>): string => {
    const needles = Array.isArray(needle) ? needle : [needle];

    for (const n of needles) {
        if (subject.endsWith(n)) {
            return subject.substring(0, subject.length - n.length);
        }
    }

    return subject;
}

// Determine if a given string contains a given substring.
export const contains = (haystack: string, needles: string | Array<string>, ignoreCase = false): boolean => {
    if (ignoreCase) {
        haystack = haystack.toLowerCase();
    }

    if (typeof needles === 'string') {
        needles = [needles];
    }

    return needles.some(needle => {
        if (ignoreCase) {
            needle = needle.toLowerCase();
        }

        return needle !== '' && haystack.includes(needle);
    });
}

// Determine if a given string contains all array values.
export const containsAll = (haystack: string, needles: Array<string>, ignoreCase = false): boolean => {
    return needles.every(needle => contains(haystack, needle, ignoreCase));
}

// Determine if a given string doesn't contain a given substring.
export const doesntContain = (haystack: string, needles: string | Array<string>, ignoreCase = false): boolean => {
    return !contains(haystack, needles, ignoreCase);
}

// Replace consecutive instances of a given character with a single character in the given string.
export const deduplicate = (value: string, character: string = ' '): string => {
    return value.replace(new RegExp(`${character}+`, 'g'), character);
};

// Determine if a given string ends with a given substring.
export const endsWith = (haystack: string, needles: string | Array<string>): boolean => {
    if (typeof needles === 'string') {
        needles = [needles];
    }

    return needles.filter(Boolean).some(needle => haystack.endsWith(needle));
}

// Extracts an excerpt from text that matches the first instance of a phrase.
export const excerpt = (value: string, phrase: string = '', radius: number = 100, omission: string = '...'): string | null => {
    const regex = new RegExp(`^(.*?)(${escapeRegExp(phrase)})(.*)$`, 'iu');
    const matches = value.match(regex);

    if (!matches) {
        return null;
    }

    const safeSlice = (str: string, start: number, length: number): string =>
        Array.from(str).slice(start, start + length).join('');

    const originalStart = matches[1].trimStart();

    let start = safeSlice(originalStart, Math.max(Array.from(originalStart).length - radius, 0), radius).trimStart();

    if (start !== originalStart) {
        start = omission + start;
    }

    const originalEnd = matches[3].trimEnd();

    let end = safeSlice(originalEnd, 0, radius).trimEnd();

    if (end !== originalEnd) {
        end = end + omission;
    }

    return start + matches[2] + end;
}

// Cap a string with a single instance of a given value.
export const finish = (value: string, cap: string): string => {
    return value.replace(new RegExp(`(?:${escapeRegExp(cap)})+$`, 'u'), '') + cap;
};

// Wrap the string with the given strings.
export const wrap = (value: string, before: string, after?: string): string => {
    return before + value + (after ?? before);
};

// Unwrap the string with the given strings.
export const unwrap = (value: string, before: string, after?: string): string => {
    if (value.startsWith(before)) {
        value = value.substring(before.length);
    }

    if (value.endsWith(after ??= before)) {
        value = value.substring(0, value.length - after.length);
    }

    return value;
}

// Determine if a given string matches a given pattern.
export const is = (patterns: string | Array<string>, value: string, ignoreCase = false) => {
    if (!Array.isArray(patterns)) {
        patterns = [patterns];
    }

    for (let pattern of patterns) {
        // If the given value is an exact match we can of course return true right
        // from the beginning. Otherwise, we will translate asterisks and do an
        // actual pattern match against the two strings to see if they match.
        if (pattern === value) {
            return true;
        }

        if (ignoreCase && pattern.toLowerCase() === value.toLowerCase()) {
            return true;
        }

        // Asterisks are translated into zero-or-more regular expression wildcards
        // to make it convenient to check if the strings starts with the given
        // pattern such as "library/*", making any string check convenient.
        const regexPattern = '^' + escapeRegExp(pattern).replace(/\\\*/g, '.*') + '$';


        const regex = new RegExp(regexPattern, ignoreCase ? 'iu' : 'u');

        if (regex.test(value)) {
            return true;
        }
    }

    return false;
}

// Determine if a given value is valid JSON.
export const isJson = (value: any): boolean => {
    if (typeof value !== 'string') {
        return false;
    }

    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }

    return true;
}

// Determine if a given value is a valid UUID.
export const isUuid = (value: any): boolean => {
    if (typeof value !== 'string') {
        return false;
    }

    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

// Limit the number of words in a string.
export const words = (value: string, words = 100, end = '...'): string => {
    if (words < 1) {
        return value;
    }

    const match = value.match(new RegExp(`^(?:\\S+\\s*){1,${words}}`, 'u'));

    if (!match) {
        return '';
    }

    const result = match[0].trim();

    return result.length === value.length ? result : result + end;
}

// Remove all non-numeric characters from a string.
export const numbers = <T extends string | string[]>(value: T): T extends string ? string : string[] => {
    if (typeof value === 'string') {
        return value.replace(/\D/g, '') as T extends string ? string : string[];
    }

    return value.map(v => v.replace(/\D/g, '')) as T extends string ? string : string[];
}

// Generate a random, secure password.
export const password = (
    length: number = 32,
    letters: boolean = true,
    numbers: boolean = true,
    symbols: boolean = true,
    spaces: boolean = false
): string => {
    const charSets = {
        letters: letters ? [...alphabetStr + alphabetStr.toUpperCase()] : [],
        numbers: numbers ? [...'0123456789'] : [],
        symbols: symbols ? [...'~!#$%^&*()-_.,<>?/\\{}[]|:;'] : [],
        spaces: spaces ? [' '] : []
    };

    const allChars = Object.values(charSets).flat();

    if (allChars.length === 0) {
        throw new Error('At least one character set must be enabled.');
    }

    let password = Object.entries(charSets)
        .filter(([_, chars]) => chars.length > 0)
        .map(([_, chars]) => chars[Math.floor(Math.random() * chars.length)]);

    for (let i = password.length; i < length; i++) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    return password.sort(() => Math.random() - 0.5).join('');
};

// Generate random alpha-numeric string.
export const random = (length: number = 16): string => {
    const chars = alphabetStr + alphabetStr.toUpperCase() + numbersStr;
    let result = '';

    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
};

// Reverse the given string.
export const reverse = (value: string): string => {
    return value.split('').reverse().join('');
}

// Remove all "extra" blank space from the given string.
export const squish = (value: string): string => {
    return value.trim().replace(/(\s|\u3164|\u1160)+/gu, ' ');
}

// Convert a value to studly caps case.
export const studly = (value: string): string => {
    const words = value.replace(/[-_]/g, ' ').split(' ');
    const studlyWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    return studlyWords.join('');
}

// Make a string's first character lowercase.
export const lcfirst = (value: string): string => {
    return value.charAt(0).toLowerCase() + value.slice(1);
}

// Make a string's first character uppercase.
export const ucfirst = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

// Get the number of words a string contains.
export const wordCount = (string: string, characters: string = ''): number => {
    const pattern = new RegExp(`[\\w${characters}]+`, 'g');
    const matches = string.match(pattern);

    return matches ? matches.length : 0;
};