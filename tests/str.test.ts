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