// Drill 1 — inference and the first errors. Type these, watch what happens without annotations:
//let name = "Sufyan";     // hover it in VS Code — TS already knows it's string
let x = 42; // ERROR — read the message fully, out loud
// This will through error because TypeScript has inferred the type of `name` to be `string` based on its initial assignment. 
// Therefore, trying to assign a number to it violates the type constraint.
const age = 27; // hover: not `number` but the literal type 27 — why? (const can't change)
// This will throw an error because `const` variables cannot be reassigned after their initial assignment.
let anything = "hello";
anything = 42; // no error — `any` = opting OUT of TypeScript
anything.foo.bar.baz; // also no error! any is contagious and silent — the danger
//Drill 2 — typing functions (the boundary that matters)
function repeat(text, times) {
    return text.repeat(times);
}
repeat("ha", 3); // fine
//repeat("ha", "3");      // ERROR — read it
// This will throw an error because the second argument is expected to be a number, but a string is provided instead.
// To correct this we need to pass a number as the second argument, like `repeat("ha", 3)`.
repeat("ha", 10); // ERROR — required param
// This will throw an error because the second argument is required, but it is missing in this call.
// Now: optional and default params
function greet(name, greeting = "Hi") {
    return `${greeting}, ${name}`;
}
// And arrow style:
const add = (a, b) => a + b;
const u1 = { id: 1, name: "Sufyan" }; // fine, email optional
//const u2: User = { id: 2, name: "X", age: 30 };        // ERROR — excess property
// This will throw an error because the `User` interface does not have an `age` property, 
// and TypeScript does not allow excess properties in object literals when assigning to a type.
function sendMail(user) {
    if (user.email) {
        console.log(user.email.toLowerCase());
    }
    console.log(user.email?.toLowerCase()); // ERROR — email might be undefined!
    // fix it two ways: an if-check, then optional chaining user.email?.toLowerCase(
}
//Drill 4 — union types + narrowing (the concept of the day)
function formatId(id) {
    // id.toUpperCase();          // ERROR — numbers can't do this. Uncomment, read, re-comment.
    if (typeof id === "string") {
        return id.toUpperCase(); // inside this branch, TS KNOWS it's a string — hover to confirm
    }
    return id.toFixed(0); // and here it KNOWS it's number. That's narrowing.
}
export {};
//# sourceMappingURL=ts-drills-1.js.map