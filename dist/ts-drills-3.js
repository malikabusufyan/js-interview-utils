// Generics
//Part 1 — the big four, squiggle-verified as always
// Partial<T> — every property becomes optional. THE update-function type:
function updateUser(id, changes) { }
updateUser(1, { name: "New" }); // fine — any subset
updateUser(1, {}); // also fine — empty subset
updateUser(1, { name: "typo" }); // uncomment: still catches typos! read it, re-comment
function createUser(data) { return { id: Date.now(), ...data }; }
// Wrting using pick
function createUserWithPick(data) {
    return { id: Date.now(), ...data };
}
const permissions = {
    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
    // delete one role -> ERROR: missing property. Try it. Record is EXHAUSTIVE.
};
// When i delete one of the roles, TypeScript will throw an error indicating that the property is missing.
// permissions is declared but its value is never read.
//Part 2 — two more that earn their keep
// Readonly<T> — assignment after creation is an error:
const config = { host: "x" };
//config.host = "y";        // uncomment, read, re-comment
// cannot assign to 'host' because it is a readonly property. 
// This error occurs because the `config` object is declared as `Readonly`,
// ReturnType<T> — extract a function's return type (typeof needed for values):
function buildUser() { return { id: 1, name: "S" }; }
// 2. declare function fetchUser(id: number): Promise<ApiResponse<User>>
function fetchUser(id) {
    return new Promise((resolve) => {
        // Simulating an API response
        const user = { id, name: "John Doe", email: "john.doe@example.com", age: 30 };
        resolve({ data: user, status: 200 });
    });
}
// 3. declare function patchUser(id: number, changes: ???): Promise<ApiResponse<User>>
//    — what's the ??? given the client may send any subset of editable fields,
//      but must never send `id`? (two utilities, nested — this is the drill)
function patchUser(id, changes) {
    return new Promise((resolve) => {
        // Simulating an API response
        const updatedUser = { id, name: changes.name || "John Doe", email: changes.email || "john.doe@example.com", age: changes.age || 30 };
        resolve({ data: updatedUser, status: 200 });
    });
}
// 4. const cache: Record<number, User> = {}
const cache = {
    1: { id: 1, name: "Alice", email: "alice@example.com", age: 25 }
};
export {};
//# sourceMappingURL=ts-drills-3.js.map