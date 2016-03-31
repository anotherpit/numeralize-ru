;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.numeralize = factory();
    }
}(this, function() {
    'use strict';

    /**
     * Numeralize number
     * @param {number} number Integer
     * @param {number} [gender=numeralize.GENDER_MASCULINE]
     * @param {number} [kase=numeralize.CASE_NOMINATIVE]
     * @param {boolean} [animate=false]
     * @returns {string}
     */
    function numeralize(number, gender, kase, animate) {
        // Normalize params
        number = Math.abs(parseInt(number, 10));
        gender = gender || numeralize.GENDER_MASCULINE;
        kase = kase || numeralize.CASE_NOMINATIVE;
        animate = !!animate;

        // Collect chunks
        var result = [];

        // Descend known powers of thousand
        for (var l = LARGES.length, i = l; i >= 0; i--) {
            var base = Math.pow(10, i * 3);
            var current = Math.floor(number / base);
            number = number % base;

            if (current) {
                var words = i ? LARGES[i] : null;
                var numeral = small(current, words ? words[0] : gender, kase, words ? false : animate);
                if (numeral) {
                    result.push(numeral);
                    if (words) {
                        var plural = pluralize.apply(null, [current].concat(words[kase + 1]));
                        result.push(plural);
                    }
                }
            }
        }

        // Zero
        if (!result.length) {
            return MINORS[0][kase];
        }

        // Return
        return result.join(" ");
    }

    /**
     * Numeralize small number (< 1000)
     * @private
     * @param {number} number Non-negative integer < 1000
     * @param {number} gender
     * @param {number} kase
     * @param {boolean} animate
     * @returns {string}
     */
    function small(number, gender, kase, animate) {
        // Zero
        if (0 === number) { return ""; }

        // Collect chunks
        var result = [];

        // Hundreds
        var hundreds = Math.floor(number / 100);
        if (HUNDREDS[hundreds]) {
            result.push(HUNDREDS[hundreds][kase]);
        }

        // Tens
        var tens = Math.floor(number % 100 / 10);
        if (TENS[tens]) {
            result.push(TENS[tens][kase]);
        }

        // Minors
        var minors = number % 100;
        if (minors >= MINORS.length) {
            minors = number % 10;
        }
        if (minors) {
            minors = MINORS[minors][kase];
            if ("string" !== typeof minors) {
                minors = minors[gender];
                if ("string" !== typeof minors) {
                    minors = minors[animate ? 0 : 1];
                }
            }
            result.push(minors);
        }

        // Return
        return result.join(" ");
    }

    /**
     * Pluralize noun according to count
     * @param {number} count Number of items
     * @param {string} one E.g. «рубль»
     * @param {string} two E.g. «рубля»
     * @param {string} five E.g. «рублей»
     * @returns {string}
     */
    function pluralize(count, one, two, five) {
        count = Math.floor(Math.abs(count)) % 100;
        if (count > 10 && count < 20) {
            return five;
        }
        count = count % 10;
        if (1 === count) { return one; }
        if (count >= 2 && count <= 4) { return two; }
        return five;
    }

    numeralize.GENDER_MASCULINE = 0;
    numeralize.GENDER_FEMININE = 1;
    numeralize.GENDER_NEUTER = 2;

    numeralize.CASE_NOMINATIVE = 0;
    numeralize.CASE_GENITIVE = 1;
    numeralize.CASE_DATIVE = 2;
    numeralize.CASE_ACCUSATIVE = 3;
    numeralize.CASE_INSTRUMENTAL = 4;
    numeralize.CASE_PREPOSITIONAL = 5;

    numeralize.pluralize = pluralize;

    var MINORS = [
        ['ноль', 'нуля', 'нулю', 'ноль', 'нулём', 'нуле'],
        [
            ['один', 'одна', 'одно'],
            ['одного', 'одной', 'одного'],
            ['одному', 'одной', 'одному'],
            [['одного', 'один'], 'одну', 'одно'],
            ['одним', 'одной', 'одним'],
            ['одном', 'одной', 'одном']
        ],
        [
            ['два', 'две', 'два'],
            'двух',
            'двум',
            [['двух', 'два'], ['двух', 'две'], 'два'],
            'двумя',
            'двух'
        ],
        [
            'три',
            'трёх',
            'трём',
            [['трёх', 'три'], ['трёх', 'три'], 'три'],
            'тремя',
            'трёх'
        ],
        [
            'четыре',
            'четырёх',
            'четырём',
            [['четырёх', 'четыре'], ['четырёх', 'четыре'], 'четыре'],
            'четырьмя',
            'четырёх'
        ],
        ['пять', 'пяти', 'пяти', 'пять', 'пятью', 'пяти'],
        ['шесть', 'шести', 'шести', 'шесть', 'шестью', 'шести'],
        ['семь', 'семи', 'семи', 'семь', 'семью', 'семи'],
        ['восемь', 'восьми', 'восьми', 'восемь', 'восемью', 'восьми'],
        ['девять', 'девяти', 'девяти', 'девять', 'девятью', 'девяти'],
        ['десять', 'десяти', 'десяти', 'десять', 'десятью', 'десяти']
    ].concat(
        ['один', 'две', 'три', 'четыр', 'пят', 'шест', 'сем', 'восем', 'девят'].map(function(prefix) {
            return ['надцать', 'надцати', 'надцати', 'надцать', 'надцатью', 'надцати'].map(function(suffix) {
                return prefix + suffix;
            });
        })
    );

    var TENS = [
        false,
        false,
        ['двадцать', 'двадцати', 'двадцати', 'двадцать', 'двадцатью', 'двадцати'],
        ['тридцать', 'тридцати', 'тридцати', 'тридцать', 'тридцатью', 'тридцати'],
        ['сорок', 'сорока', 'сорока', 'сорок', 'сорока', 'сорока'],
        ['пятьдесят', 'пятидесяти', 'пятидесяти', 'пятьдесят', 'пятьюдесятью', 'пятидесяти'],
        ['шестьдесят', 'шестидесяти', 'шестидесяти', 'шестьдесят', 'шестьюдесятью', 'шестидесяти'],
        ['семьдесят', 'семидесяти', 'семидесяти', 'семьдесят', 'семьюдесятью', 'семидесяти'],
        ['восемьдесят', 'восьмидесяти', 'восьмидесяти', 'восемьдесят', 'восемьюдесятью', 'восьмидесяти'],
        ['девяносто', 'девяноста', 'девяноста', 'девяносто', 'девяноста', 'девяноста']
    ];

    var HUNDREDS = [
        false,
        ['сто', 'ста', 'ста', 'сто', 'ста', 'ста'],
        ['двести', 'двухсот', 'двумстам', 'двести', 'двумястами', 'двухстах'],
        ['триста', 'трёхсот', 'трёмстам', 'триста', 'тремястами', 'трёхстах'],
        ['четыреста', 'четырёхсот', 'четырёмстам', 'четыреста', 'четырьмястами', 'четырёхстах'],
        ['пятьсот', 'пятисот', 'пятистам', 'пятьсот', 'пятьюстами', 'пятистах'],
        ['шестьсот', 'шестисот', 'шестистам', 'шестьсот', 'шестьюстами', 'шестистах'],
        ['семьсот', 'семисот', 'семистам', 'семьсот', 'семьюстами', 'семистах'],
        ['восемьсот', 'восьмисот', 'восьмистам', 'восемьсот', 'восемьюстами', 'восьмистах'],
        ['девятьсот', 'девятисот', 'девятистам', 'девятьсот', 'девятьюстами', 'девятистах']
    ];

    var LARGES = [
        false,
        [
            numeralize.GENDER_FEMININE,
            ['тысяча', 'тысячи', 'тысяч'],
            ['тысячи', 'тысяч', 'тысяч'],
            ['тысяче', 'тысячам', 'тысячам'],
            ['тысячу', 'тысячи', 'тысяч'],
            ['тысячей', 'тысячами', 'тысячами'],
            ['тысяче', 'тысячах', 'тысячах']
        ]
    ].concat(['миллион', 'миллиард', 'триллион'].map(function(base) {
        return [numeralize.GENDER_MASCULINE]
            .concat([
                ['', 'а', 'ов'],
                ['а', 'ов', 'ов'],
                ['у', 'ам', 'ам'],
                ['', 'а', 'ов'],
                ['ом', 'ами', 'ами'],
                ['е', 'ах', 'ах']
            ].map(function(kase) {
                return kase.map(function(suffix) {
                    return base + suffix;
                });
            }));
    }));

    return numeralize;
}));
