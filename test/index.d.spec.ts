import * as numeralize from '../index';

let g: numeralize.Gender;
g = numeralize.GENDER_MASCULINE;
g = numeralize.GENDER_FEMININE;
g = numeralize.GENDER_NEUTER;

let c: numeralize.Case;
c = numeralize.CASE_NOMINATIVE;
c = numeralize.CASE_GENITIVE;
c = numeralize.CASE_DATIVE;
c = numeralize.CASE_ACCUSATIVE;
c = numeralize.CASE_INSTRUMENTAL;
c = numeralize.CASE_PREPOSITIONAL;

let s: string;
s = numeralize(123, g, c, true);
s = numeralize.pluralize(123, 'рубль', 'рубля', 'рублей');

