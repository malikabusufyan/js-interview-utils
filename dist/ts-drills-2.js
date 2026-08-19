// Part 1 — interface vs type alias
const cfg = { host: "x", port: 80 };
//conf is declared but it was never used. 
// This is because TypeScript does not allow duplicate type aliases with the same name, resulting in a compile-time error.
// to fix it, you can either rename one of the type aliases or combine their properties into a single type alias.
// type Conf = { a: 1 }; type Conf2 = { b: 2 }
// Part 2 — generics: the type system's function parameters
function firstOfStrings(arr) { return arr[0]; }
// The function `firstOfStrings` takes an array of strings as input and returns the first string in that array. 
// The type annotation `string[]` indicates that the parameter `arr` is expected to be an array of strings, 
// and the return type is also specified as `string`.
function firstOfNumbers(arr) { return arr[0]; } // copy-paste hell
function firstAny(arr) { return arr[0]; } // type info destroyed
// The fix — a type VARIABLE:
function first(arr) { return arr[0]; }
const a = first([1, 2, 3]); // hover a: number — T was INFERRED as number
// a is declared but its value is never read.
const b = first(["x", "y"]); // hover b: string
const c = first([true]); // boolean. One function, all types, nothing lost.
// Explicit type arguments ARE legal in a function call: first<boolean>([true]) compiles fine —
// you're just overriding what TS would otherwise infer. Useful when inference would pick the
// wrong type, or can't infer anything (e.g. calling first([]) on an empty array).
const boolResult = first([true]);
// 1. Write: last<T> — returns the last element. Trivial, but type it yourself.
function last(arr) { return arr[arr.length - 1]; }
// 2. Write: pair<A, B>(a: A, b: B): [A, B] — two type params, tuple return.
function pair(a, b) { return [a, b]; }
// 3. Read this one from the wild — generic CONSTRAINT:
function longest(a, b) {
    return a.length >= b.length ? a : b;
}
longest("abc", "de"); // fine — strings have length
longest([1, 2], [3]); // fine — arrays do too
//longest(10, 20);           // uncomment: ERROR — number has no length. Read it.
// This will throw an error because the type `number` does not have a `length` property,
// and the generic constraint `T extends { length: number }` requires that the type parameter `T` must have a `length` property. 
// To fix this, we can either pass in values that have a `length` property (like strings or arrays) 
// or remove the constraint if you want to allow any type.  
// `extends` = "T can be anything that AT LEAST has this shape"
// 4. Generics you've been using all along — name them:
// Array<T> = T[]; Promise<T> = Promise<T>;
const nums = [1, 2, 3]; // same as number[]
const p = Promise.resolve("ok"); // Promise<T> — Monday's wait() had this
// 5. Type your Week-1 myPromiseAll signature (just the signature, no body port):
//    function myPromiseAll<T>(promises: ???): Promise<???>
function myPromiseAll(promises) {
    return Promise.all(promises);
}
export {};
//# sourceMappingURL=ts-drills-2.js.map