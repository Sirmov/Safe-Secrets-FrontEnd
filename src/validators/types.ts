export interface DataDictionary<T> {
    [index: string]: T;
}

export interface ErrorsDictionary {
    [index: string]: string;
}

export interface ValidationFunction<T> {
    (data: T): string;
}

export interface IsValidValidationFunction {
    (dataKey: string, dataValue: string | boolean | number): string;
}

export interface AreValidValidationFunction<T> {
    (data: T): ErrorsDictionary;
}

export interface Validator<T> {
    isValid: IsValidValidationFunction;
    areValid: AreValidValidationFunction<T>;
}
