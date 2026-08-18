// Part 1 — interface vs type alias

// Both can describe an object — 95% interchangeable:
interface UserI { id: number; name: string; }
type UserT = { id: number; name: string; };

// Difference 1: type can alias ANYTHING; interface only object shapes
type ID = number | string;          // union — interface can't do this
type Pair = [number, number];       // tuple — interface can't
interface ID = number | string;  // uncomment: syntax error, read it
// Error is Duplicate identifier 'ID'. 
// An interface can only describe object shapes, while a type alias can represent any type, including unions and tuples.

// Difference 2: extending
interface Admin extends UserI { role: string; }        // interface way
type AdminT = UserT & { role: string };                // type way (intersection)

//Extending can be done with both interfaces and type aliases, but the syntax differs. 
// Interfaces use the 'extends' keyword, while type aliases use intersection types (&).

// Difference 3: declaration merging — interfaces MERGE, types collide
interface Config { host: string; }
interface Config { port: number; }                     // legal! Config now has both
const c: Config = { host: "x", port: 80 };
type Conf = { a: 1 }; type Conf2 = { b: 2 };         // uncomment: duplicate identifier error

//conf is declared but it was never used. 
// This is because TypeScript does not allow duplicate type aliases with the same name, resulting in a compile-time error.
// to fix it, you can either rename one of the type aliases or combine their properties into a single type alias.
// type Conf = { a: 1 }; type Conf2 = { b: 2 }

// Part 2 — generics: the type system's function parameters
function firstOfStrings(arr: string[]): string { return arr[0]; }
// The function `firstOfStrings` takes an array of strings as input and returns the first string in that array. 
// The type annotation `string[]` indicates that the parameter `arr` is expected to be an array of strings, 
// and the return type is also specified as `string`.
function firstOfNumbers(arr: number[]): number { return arr[0]; }   // copy-paste hell
function firstAny(arr: any[]): any { return arr[0]; }               // type info destroyed

// The fix — a type VARIABLE:
function first<T>(arr: T[]): T { return arr[0]; }
const a = first([1, 2, 3]);        // hover a: number — T was INFERRED as number
// a is declared but its value is never read.
const b = first(["x", "y"]);       // hover b: string
const c = first([true]);           // boolean. One function, all types, nothing lost.
// cannot declare a type variable in a function call, 
// but you can declare it in the function definition. we cannot declare block shaped 

// 1. Write: last<T> — returns the last element. Trivial, but type it yourself.
function last<T>(arr: T[]): T { return arr[arr.length - 1]; }
// 2. Write: pair<A, B>(a: A, b: B): [A, B] — two type params, tuple return.
function pair<A, B>(a: A, b: B): [A, B] { return [a, b]; }
// 3. Read this one from the wild — generic CONSTRAINT:
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("abc", "de");          // fine — strings have length
longest([1,2], [3]);           // fine — arrays do too
longest(10, 20);            // uncomment: ERROR — number has no length. Read it.
// This will throw an error because the type `number` does not have a `length` property,
// and the generic constraint `T extends { length: number }` requires that the type parameter `T` must have a `length` property. 
// To fix this, we can either pass in values that have a `length` property (like strings or arrays) 
// or remove the constraint if you want to allow any type.  
// `extends` = "T can be anything that AT LEAST has this shape"
// 4. Generics you've been using all along — name them:
// Array<T> = T[]; Promise<T> = Promise<T>;
const nums: Array<number> = [1, 2, 3];           // same as number[]
const p: Promise<string> = Promise.resolve("ok"); // Promise<T> — Monday's wait() had this
// 5. Type your Week-1 myPromiseAll signature (just the signature, no body port):
//    function myPromiseAll<T>(promises: ???): Promise<???>
function myPromiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return Promise.all(promises);
}   
//    think: array of promises-of-T in, promise-of-array-of-T out.
declare function myPromiseAll1<T>(promises: Promise<T>[]): Promise<T[]>;