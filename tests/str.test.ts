import * as str from '../src/str';

test('after', () => {
    expect(str.after('hannah', 'han')).toBe('nah');
    expect(str.after('hannah', 'n')).toBe('nah');
    expect(str.after('ééé hannah', 'han')).toBe('nah');
    expect(str.after('hannah', 'xxxx')).toBe('hannah');
    expect(str.after('hannah', '')).toBe('hannah');
    expect(str.after('han0nah', '0')).toBe('nah');
    expect(str.after('han0nah', 0)).toBe('nah');
    expect(str.after('han2nah', 2)).toBe('nah');
});

test('afterLast', () => {
    expect(str.afterLast('yvette', 'yve')).toBe('tte');
    expect(str.afterLast('yvette', 't')).toBe('e');
    expect(str.afterLast('ééé yvette', 't')).toBe('e');
    expect(str.afterLast('yvette', 'tte')).toBe('');
    expect(str.afterLast('yvette', 'xxxx')).toBe('yvette');
    expect(str.afterLast('yvette', '')).toBe('yvette');
    expect(str.afterLast('yv0et0te', '0')).toBe('te');
    expect(str.afterLast('yv0et0te', 0)).toBe('te');
    expect(str.afterLast('yv2et2te', 2)).toBe('te');
    expect(str.afterLast('----foo', '---')).toBe('foo');
});

test('before', () => {
    expect(str.before('hannah', 'nah')).toBe('han');
    expect(str.before('hannah', 'n')).toBe('ha');
    expect(str.before('ééé hannah', 'han')).toBe('ééé ');
    expect(str.before('hannah', 'xxxx')).toBe('hannah');
    expect(str.before('hannah', '')).toBe('hannah');
    expect(str.before('han0nah', '0')).toBe('han');
    expect(str.before('han0nah', 0)).toBe('han');
    expect(str.before('han2nah', 2)).toBe('han');
    expect(str.before('', '')).toBe('');
    expect(str.before('', 'a')).toBe('');
    expect(str.before('a', 'a')).toBe('');
    expect(str.before('foo@bar.com', '@')).toBe('foo');
    expect(str.before('foo@@bar.com', '@')).toBe('foo');
    expect(str.before('@foo@bar.com', '@')).toBe('');
});

test('beforeLast', () => {
    expect(str.beforeLast('yvette', 'tte')).toBe('yve');
    expect(str.beforeLast('yvette', 't')).toBe('yvet');
    expect(str.beforeLast('ééé yvette', 'yve')).toBe('ééé ');
    expect(str.beforeLast('yvette', 'yve')).toBe('');
    expect(str.beforeLast('yvette', 'xxxx')).toBe('yvette');
    expect(str.beforeLast('yvette', '')).toBe('yvette');
    expect(str.beforeLast('yv0et0te', '0')).toBe('yv0et');
    expect(str.beforeLast('yv0et0te', 0)).toBe('yv0et');
    expect(str.beforeLast('yv2et2te', 2)).toBe('yv2et');
    expect(str.beforeLast('', 'test')).toBe('');
    expect(str.beforeLast('yvette', 'yvette')).toBe('');
    expect(str.beforeLast('laravel framework', ' ')).toBe('laravel');
    expect(str.beforeLast("yvette\tyv0et0te", "\t")).toBe('yvette');
});

test('between', () => {
    expect(str.between('abc', '', 'c')).toBe('abc');
    expect(str.between('abc', 'a', '')).toBe('abc');
    expect(str.between('abc', '', '')).toBe('abc');
    expect(str.between('abc', 'a', 'c')).toBe('b');
    expect(str.between('dddabc', 'a', 'c')).toBe('b');
    expect(str.between('abcddd', 'a', 'c')).toBe('b');
    expect(str.between('dddabcddd', 'a', 'c')).toBe('b');
    expect(str.between('hannah', 'ha', 'ah')).toBe('nn');
    expect(str.between('[a]ab[b]', '[', ']')).toBe('a]ab[b');
    expect(str.between('foofoobar', 'foo', 'bar')).toBe('foo');
    expect(str.between('foobarbar', 'foo', 'bar')).toBe('bar');
    expect(str.between('12345', 1, 5)).toBe('234');
    expect(str.between('123456789', '123', '6789')).toBe('45');
    expect(str.between('nothing', 'foo', 'bar')).toBe('nothing');
});

test('betweenFirst', () => {
    expect(str.betweenFirst('abc', '', 'c')).toBe('abc');
    expect(str.betweenFirst('abc', 'a', '')).toBe('abc');
    expect(str.betweenFirst('abc', '', '')).toBe('abc');
    expect(str.betweenFirst('abc', 'a', 'c')).toBe('b');
    expect(str.betweenFirst('dddabc', 'a', 'c')).toBe('b');
    expect(str.betweenFirst('abcddd', 'a', 'c')).toBe('b');
    expect(str.betweenFirst('dddabcddd', 'a', 'c')).toBe('b');
    expect(str.betweenFirst('hannah', 'ha', 'ah')).toBe('nn');
    expect(str.betweenFirst('[a]ab[b]', '[', ']')).toBe('a');
    expect(str.betweenFirst('foofoobar', 'foo', 'bar')).toBe('foo');
    expect(str.betweenFirst('foobarbar', 'foo', 'bar')).toBe('');
});

test('camel', () => {
    expect(str.camel('Laravel_p_h_p_framework')).toBe('laravelPHPFramework');
    expect(str.camel('Laravel_php_framework')).toBe('laravelPhpFramework');
    expect(str.camel('Laravel-phP-framework')).toBe('laravelPhPFramework');
    expect(str.camel('Laravel  -_-  php   -_-   framework   ')).toBe('laravelPhpFramework');

    expect(str.camel('FooBar')).toBe('fooBar');
    expect(str.camel('foo_bar')).toBe('fooBar');
    expect(str.camel('foo_bar')).toBe('fooBar');
    expect(str.camel('Foo-barBaz')).toBe('fooBarBaz');
    expect(str.camel('foo-bar_baz')).toBe('fooBarBaz');

    expect(str.camel('')).toBe('');
    expect(str.camel('LARAVEL_PHP_FRAMEWORK')).toBe('lARAVELPHPFRAMEWORK');
    expect(str.camel('   laravel   php   framework   ')).toBe('laravelPhpFramework');

    expect(str.camel('foo1_bar')).toBe('foo1Bar');
    expect(str.camel('1 foo bar')).toBe('1FooBar');
});

test('chopStart', () => {
    expect(str.chopStart('http://laravel.com', 'http://')).toBe('laravel.com');
    expect(str.chopStart('http://-http://', 'http://')).toBe('-http://');
    expect(str.chopStart('http://laravel.com', 'htp:/')).toBe('http://laravel.com');
    expect(str.chopStart('http://laravel.com', 'http://www.')).toBe('http://laravel.com');
    expect(str.chopStart('http://laravel.com', '-http://')).toBe('http://laravel.com');
    expect(str.chopStart('http://laravel.com', ['https://', 'http://'])).toBe('laravel.com');
    expect(str.chopStart('http://www.laravel.com', ['http://', 'www.'])).toBe('www.laravel.com');
    expect(str.chopStart('http://http-is-fun.test', 'http://')).toBe('http-is-fun.test');
    expect(str.chopStart('🌊✋', '🌊')).toBe('✋');
    expect(str.chopStart('🌊✋', '✋')).toBe('🌊✋');
});

test('chopEnd', () => {
    expect(str.chopEnd('path/to/file.php', '.php')).toBe('path/to/file');
    expect(str.chopEnd('.php-.php', '.php')).toBe('.php-');
    expect(str.chopEnd('path/to/file.php', '.ph')).toBe('path/to/file.php');
    expect(str.chopEnd('path/to/file.php', 'foo.php')).toBe('path/to/file.php');
    expect(str.chopEnd('path/to/file.php', '.php-')).toBe('path/to/file.php');
    expect(str.chopEnd('path/to/file.php', ['.html', '.php'])).toBe('path/to/file');
    expect(str.chopEnd('path/to/file.php', ['.php', 'file'])).toBe('path/to/file');
    expect(str.chopEnd('path/to/php.php', '.php')).toBe('path/to/php');
    expect(str.chopEnd('✋🌊', '🌊')).toBe('✋');
    expect(str.chopEnd('✋🌊', '✋')).toBe('✋🌊');
});

test('contains', () => {
    expect(str.contains('Taylor', 'ylo', true)).toBe(true);
    expect(str.contains('Taylor', 'ylo', false)).toBe(true);
    expect(str.contains('Taylor', 'taylor', true)).toBe(true);
    expect(str.contains('Taylor', 'taylor', false)).toBe(false);
    expect(str.contains('Taylor', ['ylo'], true)).toBe(true);
    expect(str.contains('Taylor', ['ylo'], false)).toBe(true);
    expect(str.contains('Taylor', ['xxx', 'ylo'], true)).toBe(true);
    expect(str.contains('Taylor', ['xxx', 'ylo'], false)).toBe(true);
    expect(str.contains('Taylor', 'xxx', false)).toBe(false);
    expect(str.contains('Taylor', ['xxx'], false)).toBe(false);
    expect(str.contains('Taylor', '', false)).toBe(false);
    expect(str.contains('', '', false)).toBe(false);
});

test('containsAll', () => {
    expect(str.containsAll('Taylor Otwell', ['taylor', 'otwell'], false)).toBe(false);
    expect(str.containsAll('Taylor Otwell', ['taylor', 'otwell'], true)).toBe(true);
    expect(str.containsAll('Taylor Otwell', ['taylor'], false)).toBe(false);
    expect(str.containsAll('Taylor Otwell', ['taylor'], true)).toBe(true);
    expect(str.containsAll('Taylor Otwell', ['taylor', 'xxx'], false)).toBe(false);
    expect(str.containsAll('Taylor Otwell', ['taylor', 'xxx'], true)).toBe(false);
});

test('doesntContain', () => {
    expect(str.doesntContain('Tar', 'ylo', true)).toBe(true);
});

test('deduplicate', () => {
    expect(str.deduplicate(' laravel   php  framework ')).toBe(' laravel php framework ');
    expect(str.deduplicate('whaaat', 'a')).toBe('what');
    expect(str.deduplicate('/some//odd//path/', '/')).toBe('/some/odd/path/');
    expect(str.deduplicate('ムだだム', 'だ')).toBe('ムだム');
});

test('endsWith', () => {
    expect(str.endsWith('jason', 'on')).toBe(true);
    expect(str.endsWith('jason', 'jason')).toBe(true);
    expect(str.endsWith('jason', ['on'])).toBe(true);
    expect(str.endsWith('jason', ['no', 'on'])).toBe(true);
    expect(str.endsWith('jason', 'no')).toBe(false);
    expect(str.endsWith('jason', ['no'])).toBe(false);
    expect(str.endsWith('jason', '')).toBe(false);
    expect(str.endsWith('', '')).toBe(false);
    expect(str.endsWith('jason', 'N')).toBe(false);
    expect(str.endsWith('7', ' 7')).toBe(false);
    expect(str.endsWith('a7', '7')).toBe(true);

    expect(str.endsWith('Jönköping', 'öping')).toBe(true);
    expect(str.endsWith('Malmö', 'mö')).toBe(true);
    expect(str.endsWith('Jönköping', 'oping')).toBe(false);
    expect(str.endsWith('Malmö', 'mo')).toBe(false);
    expect(str.endsWith('你好', '好')).toBe(true);
    expect(str.endsWith('你好', '你')).toBe(false);
    expect(str.endsWith('你好', 'a')).toBe(false);
});

test('excerpt', () => {
    expect(str.excerpt('This is a beautiful morning', 'beautiful', 5)).toBe('...is a beautiful morn...');
    expect(str.excerpt('This is a beautiful morning', 'this', 5)).toBe('This is a...');
    expect(str.excerpt('This is a beautiful morning', 'morning', 5)).toBe('...iful morning');
    expect(str.excerpt('This is a beautiful morning', 'day')).toBeNull();
    expect(str.excerpt('This is a beautiful! morning', 'Beautiful', 5)).toBe('...is a beautiful! mor...');
    expect(str.excerpt('This is a beautiful? morning', 'beautiful', 5)).toBe('...is a beautiful? mor...');
    expect(str.excerpt('', '', 0)).toBe('');
    expect(str.excerpt('a', 'a', 0)).toBe('a');
    expect(str.excerpt('abc', 'B', 0)).toBe('...b...');
    expect(str.excerpt('abc', 'b', 1)).toBe('abc');
    expect(str.excerpt('abcd', 'b', 1)).toBe('abc...');
    expect(str.excerpt('zabc', 'b', 1)).toBe('...abc');
    expect(str.excerpt('zabcd', 'b', 1)).toBe('...abc...');
    expect(str.excerpt('zabcd', 'b', 2)).toBe('zabcd');
    expect(str.excerpt('  zabcd  ', 'b', 4)).toBe('zabcd');
    expect(str.excerpt('z  abc  d', 'b', 1)).toBe('...abc...');
    expect(str.excerpt('This is a beautiful morning', 'beautiful', 5, '[...]'))
        .toBe('[...]is a beautiful morn[...]');
    expect(str.excerpt('This is the ultimate supercalifragilisticexpialidocious very looooooooooooooooooong looooooooooooong beautiful morning with amazing sunshine and awesome temperatures. So what are you gonna do about it?', 'very', 100, '[...]'))
        .toBe('This is the ultimate supercalifragilisticexpialidocious very looooooooooooooooooong looooooooooooong beautiful morning with amazing sunshine and awesome tempera[...]');

    expect(str.excerpt('taylor', 'y', 0)).toBe('...y...');
    expect(str.excerpt('taylor', 'Y', 1)).toBe('...ayl...');
    expect(str.excerpt('<div> The article description </div>', 'article')).toBe('<div> The article description </div>');
    expect(str.excerpt('<div> The article description </div>', 'article', 5)).toBe('...The article desc...');
    expect(str.excerpt('')).toBe('');
    expect(str.excerpt('The article description', '', 8)).toBe('The arti...');
    expect(str.excerpt(' ')).toBe('');
    expect(str.excerpt('The article description', ' ', 4)).toBe('The arti...');
    expect(str.excerpt('The article description', 'description', 4)).toBe('...cle description');
    expect(str.excerpt('The article description', 'T', 0)).toBe('T...');
    expect(str.excerpt('What is the article?', 'What', 2, '?')).toBe('What i?');

    expect(str.excerpt('åèö - 二 sān 大åèö', '二 sān', 4)).toBe('...ö - 二 sān 大åè...');
    expect(str.excerpt('åèö - 二 sān 大åèö', 'åèö', 4)).toBe('åèö - 二...');
    expect(str.excerpt('åèö - 二 sān 大åèö', 'åèö - 二 sān 大åèö', 4)).toBe('åèö - 二 sān 大åèö');
    expect(str.excerpt('㏗༼㏗', '༼', 0)).toBe('...༼...');
    expect(str.excerpt('Como você está', 'ê', 2)).toBe('...ocê e...');
    expect(str.excerpt('João Antônio ', 'jo', 2)).toBe('João...');
    expect(str.excerpt('João Antônio', 'JOÃO', 5)).toBe('João Antô...');
    expect(str.excerpt('', '/')).toBeNull();
});

test('finish', () => {
    expect(str.finish('ab', 'bc')).toBe('abbc');
    expect(str.finish('abbcbc', 'bc')).toBe('abbc');
    expect(str.finish('abcbbcbc', 'bc')).toBe('abcbbc');
});

test('wrap', () => {
    expect(str.wrap('value', '"')).toBe('"value"');
    expect(str.wrap('-bar-', 'foo', 'baz')).toBe('foo-bar-baz');
});

test('unwrap', () => {
    expect(str.unwrap('"value"', '"')).toBe('value');
    expect(str.unwrap('"value', '"')).toBe('value');
    expect(str.unwrap('value"', '"')).toBe('value');
    expect(str.unwrap('foo-bar-baz', 'foo-', '-baz')).toBe('bar');
    expect(str.unwrap('{some: "json"}', '{', '}')).toBe('some: "json"');
});

test('is', () => {
    expect(str.is('/', '/')).toBe(true);
    expect(str.is('/', ' /')).toBe(false);
    expect(str.is('/', '/a')).toBe(false);
    expect(str.is('foo/*', 'foo/bar/baz')).toBe(true);

    expect(str.is('*@*', 'App\Class@method')).toBe(true);
    expect(str.is('*@*', 'app\Class@')).toBe(true);
    expect(str.is('*@*', '@method')).toBe(true);

    // is case sensitive
    expect(str.is('*BAZ*', 'foo/bar/baz')).toBe(false);
    expect(str.is('*FOO*', 'foo/bar/baz')).toBe(false);
    expect(str.is('A', 'a')).toBe(false);

    // is not case sensitive
    expect(str.is('A', 'a', true)).toBe(true);
    expect(str.is('*BAZ*', 'foo/bar/baz', true)).toBe(true);
    expect(str.is(['A*', 'B*'], 'a/', true)).toBe(true);
    expect(str.is(['A*', 'B*'], 'f/', true)).toBe(false);
    expect(str.is('FOO', 'foo', true)).toBe(true);
    expect(str.is('*FOO*', 'foo/bar/baz', true)).toBe(true);
    expect(str.is('foo/*', 'FOO/bar', true)).toBe(true);
    
    // Accepts array of patterns
    expect(str.is(['a*', 'b*'], 'a/')).toBe(true);
    expect(str.is(['a*', 'b*'], 'b/')).toBe(true);
    expect(str.is(['a*', 'b*'], 'f/')).toBe(false);

    // empty patterns
    expect(str.is([], 'test')).toBe(false);
});

test('isJson', () => {
    expect(str.isJson('1')).toBe(true);
    expect(str.isJson('[1,2,3]')).toBe(true);
    expect(str.isJson('[1,   2,   3]')).toBe(true);
    expect(str.isJson('{"first": "John", "last": "Doe"}')).toBe(true);
    expect(str.isJson('[{"first": "John", "last": "Doe"}, {"first": "Jane", "last": "Doe"}]')).toBe(true);

    expect(str.isJson('1,')).toBe(false);
    expect(str.isJson('[1,2,3')).toBe(false);
    expect(str.isJson('[1,   2   3]')).toBe(false);
    expect(str.isJson('{first: "John"}')).toBe(false);
    expect(str.isJson('[{first: "John"}, {first: "Jane"}]')).toBe(false);
    expect(str.isJson('')).toBe(false);
    expect(str.isJson(null)).toBe(false);
    expect(str.isJson([])).toBe(false);
});

test('isUrl', () => {
    expect(str.isUrl('https://laravel.com')).toBe(true);
    expect(str.isUrl('http://localhost')).toBe(true);
    expect(str.isUrl('http://user:password@localhost')).toBe(true);
    expect(str.isUrl('https://localhost:443')).toBe(true);
    expect(str.isUrl('https://localhost/test')).toBe(true);
    expect(str.isUrl('https://localhost?foo=bar')).toBe(true);
    expect(str.isUrl('https://localhost#test')).toBe(true);
    expect(str.isUrl('https://user:password@localhost/test?foo=bar#test')).toBe(true);

    // invalid urls
    expect(str.isUrl('unknown://laravel.com')).toBe(false);
    expect(str.isUrl('notlocalhost')).toBe(false);
    expect(str.isUrl('http://:password@localhost')).toBe(false);
    expect(str.isUrl('http://user:@localhost')).toBe(false);
    expect(str.isUrl('https://localhost:65536')).toBe(false);
    expect(str.isUrl('https://localhost?foo=bar?bar=foo')).toBe(false);
    expect(str.isUrl('https://localhost#foo#bar')).toBe(false);
    expect(str.isUrl('https://user:password@localhost/test?foo=bar?bar=foo#test#test')).toBe(false);
    expect(str.isUrl('invalid url')).toBe(false);
});

const validUuidList = [
    'a0a2a2d2-0b87-4a18-83f2-2529882be2de',
    '145a1e72-d11d-11e8-a8d5-f2801f1b9fd1',
    '00000000-0000-0000-0000-000000000000',
    'e60d3f48-95d7-4d8d-aad0-856f29a27da2',
    'ff6f8cb0-c57d-11e1-9b21-0800200c9a66',
    'ff6f8cb0-c57d-21e1-9b21-0800200c9a66',
    'ff6f8cb0-c57d-31e1-9b21-0800200c9a66',
    'ff6f8cb0-c57d-41e1-9b21-0800200c9a66',
    'ff6f8cb0-c57d-51e1-9b21-0800200c9a66',
    'FF6F8CB0-C57D-11E1-9B21-0800200C9A66',
];

const invalidUuidList = [
    'not a valid uuid so we can test this',
    'zf6f8cb0-c57d-11e1-9b21-0800200c9a66',
    '145a1e72-d11d-11e8-a8d5-f2801f1b9fd1' + "\n",
    '145a1e72-d11d-11e8-a8d5-f2801f1b9fd1 ',
    ' 145a1e72-d11d-11e8-a8d5-f2801f1b9fd1',
    '145a1e72-d11d-11e8-a8d5-f2z01f1b9fd1',
    '3f6f8cb0-c57d-11e1-9b21-0800200c9a6',
    'af6f8cb-c57d-11e1-9b21-0800200c9a66',
    'af6f8cb0c57d11e19b210800200c9a66',
    'ff6f8cb0-c57da-51e1-9b21-0800200c9a66',
];

test('isUuid', () => {
    validUuidList.forEach(uuid => {
        expect(str.isUuid(uuid)).toBe(true);
    });

    invalidUuidList.forEach(uuid => {
        expect(str.isUuid(uuid)).toBe(false);
    });
});

test('kebab', () => {
    expect(str.kebab('LaravelPhpFramework')).toBe('laravel-php-framework');
    expect(str.kebab('Laravel Php Framework')).toBe('laravel-php-framework');
    expect(str.kebab('Laravel ❤ Php Framework')).toBe('laravel❤-php-framework');
    expect(str.kebab('')).toBe('');
});

test('words', () => {
    expect(str.words('Taylor Otwell', 1)).toBe('Taylor...');
    expect(str.words('Taylor Otwell', 1, '___')).toBe('Taylor___');
    expect(str.words('Taylor Otwell', 3)).toBe('Taylor Otwell');
    expect(str.words('Taylor Otwell', -1, '...')).toBe('Taylor Otwell');
    expect(str.words('', 3, '...')).toBe('');
});

test('numbers', () => {
    expect(str.numbers('(555) 123-4567')).toBe('5551234567');
    expect(str.numbers('L4r4v3l!')).toBe('443');
    expect(str.numbers('Laravel!')).toBe('');
    expect(str.numbers(['(555) 123-4567', 'L4r4v3l', 'Laravel!'])).toEqual(['5551234567', '443', '']);
});

test('password', () => {
    expect(str.password().length).toBe(32);
    expect(str.password().includes(' ')).toBe(false);
    expect(str.password(32, true, true, true, true).includes(' ')).toBe(true);
    expect(str.password().match(/[0-9]/)).toBeTruthy();
});

test('random', () => {
    expect(str.random().length).toBe(16);
    const randomInteger = Math.floor(Math.random() * 100) + 1;
    expect(str.random(randomInteger).length).toBe(randomInteger);
});

test('reverse', () => {
    expect(str.reverse('raBooF')).toBe('FooBar');
    expect(str.reverse('őtüzsineT')).toBe('Teniszütő');
    expect(str.reverse('☆etyBitluM❤')).toBe('❤MultiByte☆');
});

test('title', () => {
    expect(str.title('jefferson costella')).toBe('Jefferson Costella');
    expect(str.title('jefFErson coSTella')).toBe('Jefferson Costella');

    expect(str.title('jefferson_costella')).toBe('Jefferson_Costella');
    expect(str.title('jefFErson_coSTella')).toBe('Jefferson_Costella');

    expect(str.title('')).toBe('');
    expect(str.title('123 Laravel')).toBe('123 Laravel');
    expect(str.title('❤Laravel')).toBe('❤Laravel');
    expect(str.title('Laravel ❤')).toBe('Laravel ❤');
    expect(str.title('laravel123')).toBe('Laravel123');
    expect(str.title('Laravel123')).toBe('Laravel123');

    const longString = 'lorem ipsum ' + 'dolor sit amet '.repeat(1000);
    const expectedResult = 'Lorem Ipsum Dolor Sit Amet ' + 'Dolor Sit Amet '.repeat(999);
    expect(str.title(longString)).toBe(expectedResult);
});

test('headline', () => {
    expect(str.headline('jefferson costella')).toBe('Jefferson Costella');
    expect(str.headline('jefFErson coSTella')).toBe('Jefferson Costella');
    expect(str.headline('jefferson_costella uses-_Laravel')).toBe('Jefferson Costella Uses Laravel');
    expect(str.headline('jefferson_costella uses__Laravel')).toBe('Jefferson Costella Uses Laravel');

    expect(str.headline('laravel_p_h_p_framework')).toBe('Laravel P H P Framework');
    expect(str.headline('laravel _p _h _p _framework')).toBe('Laravel P H P Framework');
    expect(str.headline('laravel_php_framework')).toBe('Laravel Php Framework');
    expect(str.headline('laravel-phP-framework')).toBe('Laravel Ph P Framework');
    expect(str.headline('laravel  -_-  php   -_-   framework   ')).toBe('Laravel Php Framework');

    expect(str.headline('fooBar')).toBe('Foo Bar');
    expect(str.headline('foo_bar')).toBe('Foo Bar');
    expect(str.headline('foo-barBaz')).toBe('Foo Bar Baz');
    expect(str.headline('foo-bar_baz')).toBe('Foo Bar Baz');

    expect(str.headline('öffentliche-überraschungen')).toBe('Öffentliche Überraschungen');
    expect(str.headline('-_öffentliche_überraschungen_-')).toBe('Öffentliche Überraschungen');
    expect(str.headline('-öffentliche überraschungen')).toBe('Öffentliche Überraschungen');

    expect(str.headline('sindÖdeUndSo')).toBe('Sind Öde Und So');

    expect(str.headline('orwell 1984')).toBe('Orwell 1984');
    expect(str.headline('orwell   1984')).toBe('Orwell 1984');
    expect(str.headline('-orwell-1984 -')).toBe('Orwell 1984');
    expect(str.headline(' orwell_- 1984 ')).toBe('Orwell 1984');
});

test('snake', () => {
    expect(str.snake('LaravelPHPFramework')).toBe('laravel_p_h_p_framework');
    expect(str.snake('LaravelPhpFramework')).toBe('laravel_php_framework');
    expect(str.snake('LaravelPhpFramework', ' ')).toBe('laravel php framework');
    expect(str.snake('Laravel Php Framework')).toBe('laravel_php_framework');
    expect(str.snake('Laravel    Php      Framework   ')).toBe('laravel_php_framework');
    // prevent breaking changes
    expect(str.snake('foo-bar')).toBe('foo-bar');
    expect(str.snake('Foo-Bar')).toBe('foo-_bar');
    expect(str.snake('Foo_Bar')).toBe('foo__bar');
    expect(str.snake('ŻółtaŁódka')).toBe('żółtałódka');
});

test('squish', () => {
    expect(str.squish(' laravel   php  framework ')).toBe('laravel php framework');
    expect(str.squish("laravel\t\tphp\n\nframework")).toBe('laravel php framework');
    expect(str.squish('laravel php framework')).toBe('laravel php framework');
    expect(str.squish(`
        laravel
        php
        framework
    `)).toBe('laravel php framework');
    expect(str.squish('   laravel   php   framework   ')).toBe('laravel php framework');
    expect(str.squish('   123    ')).toBe('123');
    expect(str.squish('だ')).toBe('だ');
    expect(str.squish('ム')).toBe('ム');
    expect(str.squish('   だ    ')).toBe('だ');
    expect(str.squish('   ム    ')).toBe('ム');
    expect(str.squish('laravelㅤㅤㅤphpㅤframework')).toBe('laravel php framework');
    expect(str.squish('laravelᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠphpᅠᅠframework')).toBe('laravel php framework');
});

test('studly', () => {
    expect(str.studly('laravel_p_h_p_framework')).toBe('LaravelPHPFramework');
    expect(str.studly('laravel_php_framework')).toBe('LaravelPhpFramework');
    expect(str.studly('laravel-phP-framework')).toBe('LaravelPhPFramework');
    expect(str.studly('laravel  -_-  php   -_-   framework   ')).toBe('LaravelPhpFramework');

    expect(str.studly('fooBar')).toBe('FooBar');
    expect(str.studly('foo_bar')).toBe('FooBar');
    expect(str.studly('foo-barBaz')).toBe('FooBarBaz');
    expect(str.studly('foo-bar_baz')).toBe('FooBarBaz');

    expect(str.studly('öffentliche-überraschungen')).toBe('ÖffentlicheÜberraschungen');
});

test('lcfirst', () => {
    expect(str.lcfirst('Laravel')).toBe('laravel');
    expect(str.lcfirst('Laravel framework')).toBe('laravel framework');
    expect(str.lcfirst('Мама')).toBe('мама');
    expect(str.lcfirst('Мама мыла раму')).toBe('мама мыла раму');
});

test('ucfirst', () => {
    expect(str.ucfirst('laravel')).toBe('Laravel');
    expect(str.ucfirst('laravel framework')).toBe('Laravel framework');
    expect(str.ucfirst('мама')).toBe('Мама');
    expect(str.ucfirst('мама мыла раму')).toBe('Мама мыла раму');
});

test('ucsplit', () => {
    expect(str.ucsplit('Laravel_p_h_p_framework')).toEqual(['Laravel_p_h_p_framework']);
    expect(str.ucsplit('Laravel_P_h_p_framework')).toEqual(['Laravel_', 'P_h_p_framework']);
    expect(str.ucsplit('laravelPHPFramework')).toEqual(['laravel', 'P', 'H', 'P', 'Framework']);
    expect(str.ucsplit('Laravel-phP-framework')).toEqual(['Laravel-ph', 'P-framework']);

    expect(str.ucsplit('ŻółtaŁódka')).toEqual(['Żółta', 'Łódka']);
    expect(str.ucsplit('sindÖdeUndSo')).toEqual(['sind', 'Öde', 'Und', 'So']);
    expect(str.ucsplit('ÖffentlicheÜberraschungen')).toEqual(['Öffentliche', 'Überraschungen']);
});

test('wordCount', () => {
    expect(str.wordCount('Hello, world!')).toBe(2);
    expect(str.wordCount('Hi, this is my first contribution to the Laravel framework.')).toBe(10);

    expect(str.wordCount('мама')).toBe(0);
    expect(str.wordCount('мама мыла раму')).toBe(0);

    expect(str.wordCount('мама', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')).toBe(1);
    expect(str.wordCount('мама мыла раму', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')).toBe(3);

    expect(str.wordCount('МАМА', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')).toBe(1);
    expect(str.wordCount('МАМА МЫЛА РАМУ', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')).toBe(3);
})