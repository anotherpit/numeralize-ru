export = numeralize;

declare function numeralize(number: number, gender?: numeralize.Gender, kase?: numeralize.Case, animate?: boolean): string;

declare namespace numeralize {
    export type Gender = number;
    export const GENDER_MASCULINE: Gender;
    export const GENDER_FEMININE: Gender;
    export const GENDER_NEUTER: Gender;

    export type Case = number;
    export const CASE_NOMINATIVE: Case;
    export const CASE_GENITIVE: Case;
    export const CASE_DATIVE: Case;
    export const CASE_ACCUSATIVE: Case;
    export const CASE_INSTRUMENTAL: Case;
    export const CASE_PREPOSITIONAL: Case;

    export function pluralize(count: number, one: string, two: string, five: string): string;
}
