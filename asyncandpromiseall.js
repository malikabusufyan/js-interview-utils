// Drill 1 — what does async return?

async function f() {
  return 5;
}
console.log(f()); // predict: what exactly prints here?
f().then((v) => console.log(v)); // and here?

// The function will return a Promise that resolves to 5.
// So the first console.log will print a Promise object,
// and the second console.log inside the .then() will print 5 when the Promise resolves.

//Drill 2 — suspension order (Day 3 meets Day 4):

async function g() {
  console.log("A");
  await null;
  console.log("B");
}
g();
console.log("C"); // predict the full order, then run

// The order of execution will be as follows:
// 1. "A" will be printed immediately when g() is called.
// 2. The await null will cause the function to pause, and control will return to the main thread.
// 3. "C" will be printed next.
// 4. After the current call stack is cleared, the Promise returned by g() will resolve, and "B" will be printed.

// Drill 3 — try/catch over rejections
const fail = () => Promise.reject(new Error("boom"));
async function h() {
  try {
    await fail();
    console.log("never?");
  } catch (e) {
    console.log("caught:", e.message);
  }
}
h();

// In this case it will reject the promise anf fail will return the error message "boom".

//Drill 4 — sequential vs parallel, measured
//const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function slow() {
  console.time("slow");
  await wait(500);
  await wait(500);
  console.timeEnd("slow");
}
async function fast() {
  console.time("fast");
  await Promise.all([wait(500), wait(500)]);
  console.timeEnd("fast");
}
slow();
fast();

//Watch the two timings print.
// Then answer in a comment: when is the sequential version actually correct and required?
// (Think: does the second call need the first's result?)
// The sequential version is correct and required when the second operation depends on the result of the first operation.

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    const n = promises.length;

    // 1. the empty-array case: if n is 0, what must happen right here?
    if (n === 0) {
      resolve([]);
      return;
    }

    promises.forEach((p, i) => {
      // 2. normalize p so plain values like 1 and 3 don't crash (the hint)
      p = Promise.resolve(p);

      // 3. on success: put the value in the right SLOT, count it,

      //    and decide: is everyone done? -> resolve with what?
      p.then((value) => {
        results[i] = value;
        completed++;
        if (completed === n) {
          resolve(results);
        }
      }).catch((error) => {
        reject(error);
      });
      // 4. on failure: what's the one call to make?
    });
  });
}
// Test 1 — order by INPUT, not finish time (this is the results[i] question)
myPromiseAll([wait(300).then(() => 1), wait(100).then(() => 2)]).then((r) =>
  console.log("T1:", r),
); // must be [1, 2]
// The order of the results will be according to the order of the input promises
// even though the second promise resolves faster than the first one. The output will be [1, 2].

// Test 2 — fail fast
myPromiseAll([wait(100).then(() => 1), Promise.reject(new Error("nope"))])
  .then((r) => console.log("T2 never:", r))
  .catch((e) => console.log("T2 rejected:", e.message));
// It will reject with the error message "nope" because the second promise is rejected.

// Test 3 — empty array
myPromiseAll([]).then((r) => console.log("T3:", r)); // should print [] — does yours?
//It will print an empty array.

// Test 4 — non-promise values mixed in
myPromiseAll([1, wait(50).then(() => 2), 3]).then((r) => console.log("T4:", r)); // [1, 2, 3] — hint: Promise.resolve(p)
// It will print [1, 2, 3] because non-promise values are treated as resolved promises with their values.
