export enum Gender {
  Masculine = 0,
  Feminine = 1,
  Neuter = 2
}

export enum Case {
  Nominative = 0,
  Genitive = 1,
  Dative = 2,
  Accusative = 3,
  Instrumental = 4,
  Prepositional = 5
}

const MINORS = [
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
  ['десять', 'десяти', 'десяти', 'десять', 'десятью', 'десяти'],
  ...['один', 'две', 'три', 'четыр', 'пят', 'шест', 'сем', 'восем', 'девят'].map((prefix) =>
    ['надцать', 'надцати', 'надцати', 'надцать', 'надцатью', 'надцати'].map((suffix) =>
      `${prefix}${suffix}`
    )
  )
] as const;

const TENS = [
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
] as const;

const HUNDREDS = [
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
] as const;

const LARGES = [
  false,
  [
    Gender.Feminine,
    ['тысяча', 'тысячи', 'тысяч'],
    ['тысячи', 'тысяч', 'тысяч'],
    ['тысяче', 'тысячам', 'тысячам'],
    ['тысячу', 'тысячи', 'тысяч'],
    ['тысячей', 'тысячами', 'тысячами'],
    ['тысяче', 'тысячах', 'тысячах']
  ],
  ...['миллион', 'миллиард', 'триллион'].map<[Gender, ...string[][]]>((base) =>
    [
      Gender.Masculine,
      ...[
        ['', 'а', 'ов'],
        ['а', 'ов', 'ов'],
        ['у', 'ам', 'ам'],
        ['', 'а', 'ов'],
        ['ом', 'ами', 'ами'],
        ['е', 'ах', 'ах']
      ].map((kase) => kase.map((suffix) => `${base}${suffix}`))
    ]
  )
] as const;

function small(number: number, gender: Gender, kase: Case, animate: boolean): string {
  // Zero
  if (0 === number) {
    return '';
  }

  // Collect chunks
  const result: string[] = [];

  // Hundreds
  const hundreds = HUNDREDS[Math.floor(number / 100)];
  if (hundreds) {
    result.push(hundreds[kase]);
  }

  // Tens
  const tens = TENS[Math.floor(number % 100 / 10)];
  if (tens) {
    result.push(tens[kase]);
  }

  // Minors
  let minors = number % 100;
  if (minors >= MINORS.length) {
    minors = number % 10;
  }
  if (minors) {
    let part;
    if (
      ((part = MINORS[minors][kase]) && typeof part === 'string')
      || ((part = MINORS[minors][kase][gender]) && typeof part === 'string')
      || (part = MINORS[minors][kase][gender][animate ? 0 : 1])
    ) {
      result.push(part)
    }
  }

  // Return
  return result.join(" ");
}

/**
 * Выбирает нужную форму существительного в зависимости от количества.
 *
 * @param {number} count Количество
 * @param {string} one Форма существительного для одного предмета, например, «рубль»;
 * @param {string} two Форма существительного для двух предметов, например, «рубля»;
 * @param {string} five Форма существительного для пяти предмета, например, «рублей»;
 *
 * @example
 * // 'рублей'
 * pluralize(0, 'рубль', 'рубля', 'рублей');
 *
 * @example
 * // 'рубль'
 * pluralize(1, 'рубль', 'рубля', 'рублей');
 *
 * @example
 * // 'рубля'
 * pluralize(2, 'рубль', 'рубля', 'рублей');
 *
 * @example
 * // 'рублей'
 * pluralize(5, 'рубль', 'рубля', 'рублей');
 *
 * @example
 * // 'рублей'
 * pluralize(11, 'рубль', 'рубля', 'рублей');
 *
 * @example
 * // 'рубль'
 * pluralize(21, 'рубль', 'рубля', 'рублей');
 *
 * @example
 * // 'рубля'
 * pluralize(22, 'рубль', 'рубля', 'рублей');
 */
export function pluralize(count: number, one: string, two: string, five: string): string {
  count = Math.floor(Math.abs(count)) % 100;
  if (count > 10 && count < 20) {
    return five;
  }
  count = count % 10;
  if (1 === count) {
    return one;
  }
  if (count >= 2 && count <= 4) {
    return two;
  }
  return five;
}

/**
 * Возвращает числительное, соответствующее числу
 *
 * @param {number} number Целое число, для которого надо записать числительное
 *
 * @param {Gender} [gender=Gender.Masculine] Пол:
 *  - {@link Gender.Masculine} – мужской (по умолчанию);
 *  - {@link Gender.Feminine} – женский;
 *  - {@link Gender.Neuter} – средний.
 *
 * @param {Case} [kase=Case.Nominative] Падеж
 *  (`case` является ключевым словом, поэтому не может быть использован в качестве имени переменной):
 *  - {@link Case.Nominative} — именительный (по умолчанию);
 *  - {@link Case.Genitive} — родительный;
 *  - {@link Case.Dative} — дательный;
 *  - {@link Case.Accusative} — винительный;
 *  - {@link Case.Instrumental} — творительный;
 *  - {@link Case.Prepositional} — предложный.
 *
 * @param {boolean} [animate=false] Являются ли перечисляемые предметы одушевлёнными
 *  (влияет на форму винительного падежа некоторых числительных)
 *
 * @example
 * // мужской род, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать один'
 * numeralize(5122981121);
 *
 * @example
 * // женский род, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать одна'
 * numeralize(5122981121, Gender.Feminine);
 *
 * @example
 * // средний род, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать одно'
 * numeralize(5122981121, Gender.Neuter);
 *
 * @example
 * // мужской род, именительный падеж, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одна тысяча сто двадцать один'
 * numeralize(5122981121, Gender.Masculine, Case.Nominative);
 *
 * @example
 * // мужской род, родительный падеж, 'пяти миллиардов ста двадцати двух миллионов девятисот восьмидесяти одной тысячи ста двадцати одного'
 * numeralize(5122981121, Gender.Masculine, Case.Genitive);
 *
 * @example
 * // мужской род, дательный падеж, 'пяти миллиардам ста двадцати двум миллионам девятистам восьмидесяти одной тысяче ста двадцати одному'
 * numeralize(5122981121, Gender.Masculine, Case.Dative);
 *
 * @example
 * // мужской род, винительный падеж, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одну тысячу сто двадцать один'
 * numeralize(5122981121, Gender.Masculine, Case.Accusative);
 *
 * @example
 * // мужской род, винительный падеж, одушевлённые предметы, 'пять миллиардов сто двадцать два миллиона девятьсот восемьдесят одну тысячу сто двадцать одного'
 * numeralize(5122981121, Gender.Masculine, Case.Accusative, true);
 *
 * @example
 * // мужской род, творительный падеж, 'пятью миллиардами ста двадцатью двумя миллионами девятьюстами восемьюдесятью одной тысячей ста двадцатью одним'
 * numeralize(5122981121, Gender.Masculine, Case.Instrumental);
 *
 * @example
 * // мужской род, творительный падеж, 'пяти миллиардах ста двадцати двух миллионах девятистах восьмидесяти одной тысяче ста двадцати одном'
 * numeralize(5122981121, Gender.Masculine, Case.Prepositional);
 */
export function numeralize(
  number: number,
  gender: Gender = Gender.Masculine,
  kase: Case = Case.Nominative,
  animate: boolean = false
): string {
  // Normalize params
  number = Math.abs(parseInt(String(number), 10));

  // Collect chunks
  const result: string[] = [];

  // Descend known powers of thousand
  for (let l = LARGES.length, i = l; i >= 0; i--) {
    const base = Math.pow(10, i * 3);
    const current = Math.floor(number / base);
    number = number % base;

    if (current) {
      const large = i ? LARGES[i] : null;
      const numeral = small(current, large ? large[0] : gender, kase, large ? false : animate);
      if (numeral) {
        result.push(numeral);
        if (large) {
          const [, ...forms] = large
          const plural = pluralize(current, forms[kase][0], forms[kase][1], forms[kase][2]);
          result.push(plural);
        }
      }
    }
  }

  // Zero
  if (!result.length) {
    result.push(MINORS[0][kase]);
  }

  // Return
  return result.join(' ');
}

