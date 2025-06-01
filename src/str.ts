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

// Determine if a given value is a valid URL.
export const isUrl = (value: string, protocols: Array<string> = []): boolean => {
    const defaultProtocols =
        'aaa|aaas|about|acap|acct|acd|acr|adiumxtra|adt|afp|afs|aim|amss|android|appdata|apt|ark|attachment|aw|barion|beshare|bitcoin|bitcoincash|blob|bolo|browserext|calculator|callto|cap|cast|casts|chrome|chrome-extension|cid|coap|coap\\+tcp|coap\\+ws|coaps|coaps\\+tcp|coaps\\+ws|com-eventbrite-attendee|content|conti|crid|cvs|dab|data|dav|diaspora|dict|did|dis|dlna-playcontainer|dlna-playsingle|dns|dntp|dpp|drm|drop|dtn|dvb|ed2k|elsi|example|facetime|fax|feed|feedready|file|filesystem|finger|first-run-pen-experience|fish|fm|ftp|fuchsia-pkg|geo|gg|git|gizmoproject|go|gopher|graph|gtalk|h323|ham|hcap|hcp|http|https|hxxp|hxxps|hydrazone|iax|icap|icon|im|imap|info|iotdisco|ipn|ipp|ipps|irc|irc6|ircs|iris|iris\\.beep|iris\\.lwz|iris\\.xpc|iris\\.xpcs|isostore|itms|jabber|jar|jms|keyparc|lastfm|ldap|ldaps|leaptofrogans|lorawan|lvlt|magnet|mailserver|mailto|maps|market|message|mid|mms|modem|mongodb|moz|ms-access|ms-browser-extension|ms-calculator|ms-drive-to|ms-enrollment|ms-excel|ms-eyecontrolspeech|ms-gamebarservices|ms-gamingoverlay|ms-getoffice|ms-help|ms-infopath|ms-inputapp|ms-lockscreencomponent-config|ms-media-stream-id|ms-mixedrealitycapture|ms-mobileplans|ms-officeapp|ms-people|ms-project|ms-powerpoint|ms-publisher|ms-restoretabcompanion|ms-screenclip|ms-screensketch|ms-search|ms-search-repair|ms-secondary-screen-controller|ms-secondary-screen-setup|ms-settings|ms-settings-airplanemode|ms-settings-bluetooth|ms-settings-camera|ms-settings-cellular|ms-settings-cloudstorage|ms-settings-connectabledevices|ms-settings-displays-topology|ms-settings-emailandaccounts|ms-settings-language|ms-settings-location|ms-settings-lock|ms-settings-nfctransactions|ms-settings-notifications|ms-settings-power|ms-settings-privacy|ms-settings-proximity|ms-settings-screenrotation|ms-settings-wifi|ms-settings-workplace|ms-spd|ms-sttoverlay|ms-transit-to|ms-useractivityset|ms-virtualtouchpad|ms-visio|ms-walk-to|ms-whiteboard|ms-whiteboard-cmd|ms-word|msnim|msrp|msrps|mss|mtqp|mumble|mupdate|mvn|news|nfs|ni|nih|nntp|notes|ocf|oid|onenote|onenote-cmd|opaquelocktoken|openpgp4fpr|pack|palm|paparazzi|payto|pkcs11|platform|pop|pres|prospero|proxy|pwid|psyc|pttp|qb|query|redis|rediss|reload|res|resource|rmi|rsync|rtmfp|rtmp|rtsp|rtsps|rtspu|s3|secondlife|service|session|sftp|sgn|shttp|sieve|simpleledger|sip|sips|skype|smb|sms|smtp|snews|snmp|soap\\.beep|soap\\.beeps|soldat|spiffe|spotify|ssh|steam|stun|stuns|submit|svn|tag|teamspeak|tel|teliaeid|telnet|tftp|tg|things|thismessage|tip|tn3270|tool|ts3server|turn|turns|tv|udp|unreal|urn|ut2004|v-event|vemmi|ventrilo|videotex|vnc|view-source|wais|webcal|wpid|ws|wss|wtai|wyciwyg|xcon|xcon-userid|xfire|xmlrpc\\.beep|xmlrpc\\.beeps|xmpp|xri|ymsgr|z39\\.50|z39\\.50r|z39\\.50s';

    const protocolList = protocols.length > 0 ? protocols.join('|') : defaultProtocols;

    const protocolPattern = `(?:${protocolList}):\\/\\/`;

    const hostnamePattern = `(?:` +
        `localhost|` +                             // localhost
        `\\d{1,3}(?:\\.\\d{1,3}){3}|` +            // IPv4
        `\\[[0-9a-fA-F:.]+\\]|` +                  // IPv6
        `[\\w-]+(?:\\.[\\w-]+)*` +                 // domain
        `)`;

    const authPattern = `(?:[\\w.%+-]+(?::[\\w.%+-]+)?@)?`; // optional user:pass@
    const portPattern = `(?::(?:6553[0-5]|655[0-2]\\d|65[0-4]\\d{2}|6[0-4]\\d{3}|[1-5]?\\d{1,4}))?`; // optional :port in 0–65535
    const pathPattern = `(?:/[\\w\\-.~%!$&'()*+,;=:@/]*)?`; // optional path
    const queryPattern = `(?:\\?[^?#]*)?`; // single '?' and exclude nested '?' or '#'
    const fragmentPattern = `(?:#[^#]*)?`; // single '#' only

    const fullPattern = `^${protocolPattern}${authPattern}${hostnamePattern}${portPattern}${pathPattern}${queryPattern}${fragmentPattern}$`;

    const regex = new RegExp(fullPattern, 'i');

    return regex.test(value);
}

// Determine if a given value is a valid UUID.
export const isUuid = (value: any): boolean => {
    if (typeof value !== 'string') {
        return false;
    }

    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

// Convert a string to kebab case.
export const kebab = (value: string): string => {
    return snake(value, '-');
};

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

// Convert the given string to proper case.
export const title = (value: string): string => {
    return value
        .toLocaleLowerCase()
        .replace(/\p{L}+/gu, word =>
            word.charAt(0).toLocaleUpperCase() + word.slice(1)
        );
}

// Convert the given string to proper case for each word.
export const headline = (value: string): string => {
    let parts = value.split(' ');

    parts = parts.length > 1
        ? parts.map(part => title(part))
        : ucsplit(parts.join('_')).map(part => title(part));

    const collapsed = parts.join('_').replace(/[-_ ]/g, '_');

    return collapsed.split('_').filter(part => part.length).join(' ');
}

// Convert a string to snake case.
export const snake = (value: string, delimiter: string = '_'): string => {
    if (value === value.toLowerCase()) {
        return value;
    }

    value = ucwords(value).replace(/\s+/gu, '');

    value = value.replace(/(.)(?=[A-Z])/gu, `$1${delimiter}`);

    return value.toLowerCase();
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

// Split a string into pieces by uppercase characters.
export const ucsplit = (value: string) => {
    return value.split(/(?=\p{Lu})/u).filter(Boolean);
}

// https://github.com/hirak/phpjs/blob/master/functions/strings/ucwords.js
// Uppercase the first character of each word in a string.
export const ucwords = (str: string): string => {
  return str.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, ($1) => $1.toUpperCase());
};

// Get the number of words a string contains.
export const wordCount = (string: string, characters: string = ''): number => {
    const pattern = new RegExp(`[\\w${characters}]+`, 'g');
    const matches = string.match(pattern);

    return matches ? matches.length : 0;
};