// Generics

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

//Part 1 — the big four, squiggle-verified as always

// Partial<T> — every property becomes optional. THE update-function type:
function updateUser(id: number, changes: Partial<User>) { /* merge into db */ }
updateUser(1, { name: "New" });     // fine — any subset
updateUser(1, {});                  // also fine — empty subset
updateUser(1, { name: "typo" }); // uncomment: still catches typos! read it, re-comment
// There is an error because there is a typo error, 
// the property `nam` does not exist in the `User` interface. TypeScript catches this error at compile time,
// preventing potential runtime issues. The correct property name should be `name` instead of `nam`.

// Pick<T, K> — keep only listed keys:
type UserPreview = Pick<User, "id" | "name">;      // { id: number; name: string }
// Pick is useful for creating a new type that only includes a subset of properties from an existing type.

// Omit<T, K> — everything EXCEPT listed keys:
type UserWithoutEmail = Omit<User, "email">;
// Omit is useful for creating a new type that excludes specific properties from an existing type.

// The interview pairing: creating a new record — the client doesn't send the id:
type NewUser = Omit<User, "id">;
function createUser(data: NewUser): User { return { id: Date.now(), ...data }; }
// Wrting using pick
function createUserWithPick(data: Pick<User, "name" | "email" | "age">): User {
  return { id: Date.now(), ...data };
}

// Record<K, V> — object type from key-type + value-type:
type Role = "admin" | "editor" | "viewer";
const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
    viewer: ["read"],
  // delete one role -> ERROR: missing property. Try it. Record is EXHAUSTIVE.
};

// When i delete one of the roles, TypeScript will throw an error indicating that the property is missing.
// permissions is declared but its value is never read.

//Part 2 — two more that earn their keep
// Readonly<T> — assignment after creation is an error:
const config: Readonly<{ host: string }> = { host: "x" };
//config.host = "y";        // uncomment, read, re-comment
// cannot assign to 'host' because it is a readonly property. 
// This error occurs because the `config` object is declared as `Readonly`,
// ReturnType<T> — extract a function's return type (typeof needed for values):
function buildUser() { return { id: 1, name: "S" }; }
type BuiltUser = ReturnType<typeof buildUser>;   // hover it — the object shape, extracted

// 1. type ApiResponse<T> = { data: T; status: number; error?: string }
type ApiResponse<T> = { data: T; status: number; error?: string };

// 2. declare function fetchUser(id: number): Promise<ApiResponse<User>>
function fetchUser(id: number): Promise<ApiResponse<User>> {
  return new Promise((resolve) => {
    // Simulating an API response
    const user: User = { id, name: "John Doe", email: "john.doe@example.com", age: 0 };
    resolve({ data: user, status: 200 });
  });
}

// 3. declare function patchUser(id: number, changes: ???): Promise<ApiResponse<User>>
//    — what's the ??? given the client may send any subset of editable fields,
//      but must never send `id`? (two utilities, nested — this is the drill)
function patchUser(id: number, changes: Omit<Partial<User>, "id">): Promise<ApiResponse<User>> {
  return new Promise((resolve) => {
    // Simulating an API response
    const updatedUser: User = { id, name: changes.name || "John Doe", email: changes.email || "john.doe@example.com", age: changes.age || 30 };
    resolve({ data: updatedUser, status: 200 });
  });
}   
// 4. const cache: Record<number, User> = {}
const cache: Record<number, User> = {
  1: { id: 1, name: "Alice", email: "alice@example.com", age: 25 }
};  