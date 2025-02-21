import * as str from '../src/str';

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