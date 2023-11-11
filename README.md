# numeralize-ru

Написание числительных на русском языке с учётом пола и падежа.

## Использование в NodeJS

```
npm install --save numeralize-ru
```

```javascript
import {numeralize, Case, Gender} from "numeralize-ru";

console.log(numeralize(5122981121, Gender.Masculine, Case.Nominative));
```

## Использование в [дореволюционных](https://caniuse.com/?search=ESM) браузерах

```html
<script src="https://unpkg.com/numeralize-ru/lib/index.browser.js"></script>
<script>
    console.log(numeralize.numeralize(5122981121, numeralize.Gender.Feminine));
</script>
```

## API

```typescript
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
declare function numeralize(
  number: number,
  gender: Gender = Gender.Masculine,
  kase: Case = Case.Nominative,
  animate: boolean = false
): string;

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
declare function pluralize(count: number, one: string, two: string, five: string): string
```

## Спонсорство

[Стать первым спонсором проекта](https://github.com/sponsors/anotherpit)

## Roadmap

* Порядковые числительные (ordinal numerals): _первый_, _вторым_, _третьими_ и т.д.
* Собирательные числительные (collective numerals): _трое_, _четверых_, _пятерыми_ и т.д.
* Особые формы единственного и множественного числа: _одни сутки_, _два дня_, _пять суток_ и т.д.

## См.также

+ Подробно о склонении числительных в русском языке с примерами: http://numeralonline.ru/
