# support-js

Copy of Laravel's support classes. Whole code logic and tests are fully copied from sources.

## Str
- [x] after
- [x] afterLast
- [ ] ascii
- [ ] transliterate
- [x] before
- [x] beforeLast
- [x] between
- [x] betweenFirst
- [x] camel
- [x] chopStart
- [x] chopEnd
- [x] contains
- [x] containsAll
- [x] doesntContain
- [x] deduplicate
- [x] endsWith
- [x] excerpt
- [x] finish
- [x] wrap
- [x] unwrap
- [x] is
- [ ] isAscii
- [x] isJson
- [x] isUrl
- [x] isUuid
- [ ] isUlid
- [x] kebab
- [ ] limit
- [x] words
- [ ] markdown
- [ ] inlineMarkdown
- [ ] mask
- [ ] match
- [ ] isMatch
- [ ] matchAll
- [x] numbers
- [ ] padBoth
- [ ] padLeft
- [ ] padRight
- [ ] plural
- [ ] pluralStudly
- [ ] pluralPascal
- [x] password
- [x] random
- [ ] createRandomStringsUsing
- [ ] createRandomStringsUsingSequence
- [ ] createRandomStringsNormally
- [ ] replaceArray
- [ ] toStringOr
- [ ] replace
- [ ] replaceFirst
- [ ] replaceStart
- [ ] replaceLast
- [ ] replaceEnd
- [ ] replaceMatches
- [ ] remove
- [x] reverse
- [ ] start
- [x] title
- [x] headline
- [ ] apa
- [ ] singular
- [ ] slug
- [x] snake
- [ ] trim
- [ ] ltrim
- [ ] rtrim
- [x] squish
- [ ] startsWith
- [x] studly
- [ ] pascal
- [ ] substrCount
- [ ] substrReplace
- [ ] swap
- [ ] take
- [ ] toBase64
- [ ] fromBase64
- [x] lcfirst
- [x] ucfirst
- [x] ucsplit
- [x] wordCount
- [ ] wordWrap
- [ ] uuid
- [ ] uuid7
- [ ] orderedUuid
- [ ] createUuidsUsing
- [ ] createUuidsUsingSequence
- [ ] freezeUuids
- [ ] createUuidsNormally
- [ ] ulid
- [ ] createUlidsNormally
- [ ] createUlidsUsing
- [ ] createUlidsUsingSequence
- [ ] freezeUlids

### Won't be implemented:

of - String object is not implemented.  
charAt - `String.charAt()`  
convertCase - `String.toLowerCase()` or `String.toUpperCase()`  
length - `String.length`  
lower - `String.toLowerCase()`  
parseCallback - Pointless.  
position - `String.indexOf()`  
repeat - `String.repeat()`  
upper - `String.toUpperCase()`  
substr - `String.substring()`  
flushCache - Cache is not used.  