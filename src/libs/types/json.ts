export type JSONPrimitive = bigint | boolean | null | number | string;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONArray = Array<JSONValue>;
export interface JSONObject {
  [key: string]: JSONValue;
}
