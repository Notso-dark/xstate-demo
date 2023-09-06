import { JSONArray, JSONObject, JSONPrimitive, JSONValue } from "./types/json";

export class Guard {
  static isNonNullable<T>(_: T): _ is NonNullable<T> {
    return _ !== null && typeof _ !== "undefined";
  }

  static isNumber(_: unknown): _ is number {
    return typeof _ === "number";
  }

  static isString(_: unknown): _ is string {
    return typeof _ === "string";
  }

  static isNull(_: unknown): _ is null {
    return _ === null;
  }

  static isUndefined(_: unknown): _ is undefined {
    return _ === undefined;
  }

  static isDate(_: unknown): _ is Date {
    return _ instanceof Date;
  }

  static isArray<T>(_: unknown): _ is Array<T> {
    return Array.isArray(_);
  }

  static isObject(_: unknown): _ is object {
    return _ instanceof Object;
  }

  static isSymbol(_: unknown): _ is symbol {
    return typeof _ === "symbol";
  }

  static isJSONPrimitive(_: unknown): _ is JSONPrimitive {
    return (
      Guard.isString(_) ||
      Guard.isNumber(_) ||
      Guard.isBoolean(_) ||
      Guard.isNull(_)
    );
  }

  static isJSONValue(_: unknown): _ is JSONValue {
    return (
      Guard.isJSONPrimitive(_) || Guard.isJSONArray(_) || Guard.isJSONObject(_)
    );
  }

  static isJSONArray(_: unknown): _ is JSONArray {
    return Guard.isArray(_) && _.every(Guard.isJSONValue);
  }

  static isJSONObject(_: unknown): _ is JSONObject {
    return (
      Guard.isObject(_) &&
      Object.keys(_).every(Guard.isString) &&
      Object.values(_).every(Guard.isJSONValue)
    );
  }

  static isBoolean(_: unknown): _ is boolean {
    return typeof _ === "boolean";
  }

  static isFuntion(_: unknown): _ is (...args: any[]) => any {
    return typeof _ === "function";
  }

  static isEmpty(_: unknown) {
    if (Guard.isUndefined(_) || Guard.isNull(_) || _ === "") {
      return true;
    }
    if (Guard.isNumber(_) || Guard.isBoolean(_)) {
      return false;
    }
    if (Guard.isDate(_)) {
      return false;
    }
    if (
      (Guard.isObject(_) || Guard.isArray(_)) &&
      Object.keys(_).length === 0
    ) {
      return true;
    }
    if (Guard.isArray(_) && _.every(Guard.isEmpty)) {
      return true;
    }

    return false;
  }

  /**
   * Determines if the length of a given value (number, string, or array) falls within a specified range.
   *
   * @param {number | string | Array<unknown>} _ - The value to check the length of.
   * @param {number} min - The minimum allowed length (inclusive).
   * @param {number} max - The maximum allowed length (inclusive).
   * @return {boolean} True if the length of the value is between min and max (inclusive).
   */
  static lengthIsBetween(
    _: number | string | Array<unknown>,
    min: number,
    max: number
  ): boolean {
    if (Guard.isEmpty(_)) {
      return min === 0;
    }
    const valueLength =
      typeof _ === "number" ? Number(_).toString().length : _.length;
    if (valueLength >= min && valueLength <= max) {
      return true;
    }
    return false;
  }
}
