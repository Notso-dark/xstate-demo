import stringify from "fast-safe-stringify";
import jwtDecode, { JwtPayload } from "jwt-decode";

/**
 * Validates a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT to be validated.
 * @return {boolean} - Returns true if the JWT is valid, false otherwise.
 */
export function validateJWT(token: string) {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded) return false;
    if (decoded.exp) return new Date(decoded.exp * 1000) > new Date();
    return true;
  } catch (error) {
    console.info("Invalid JWT:");
    console.error(error);
    return false;
  }
}

/**
 * Serializes a value into a string representation.
 *
 * @param {any} value - The value to be serialized.
 * @param {((key: string, value: any) => any) | undefined} replacer - A function that alters the behavior of the stringification process.
 * @param {string | number | undefined} space - The number of spaces to use for indentation when pretty-printing.
 * @param {{
 *   depthLimit: number | undefined,
 *   edgesLimit: number | undefined
 * } | undefined} options - Serialization options.
 * @return {string} The serialized string representation of the value.
 */
export function serialize(
  value: any,
  replacer?: ((key: string, value: any) => any) | undefined,
  space?: string | number | undefined,
  options?:
    | {
        depthLimit: number | undefined;
        edgesLimit: number | undefined;
      }
    | undefined
): string {
  if (options) return stringify(value, replacer, space, options);
  try {
    return JSON.stringify(value, replacer, space); // faster when possible
  } catch (error) {
    return stringify(value, replacer, space, options); // safer & handle circular references
  }
}
