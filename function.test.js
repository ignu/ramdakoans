const R = require("ramda");

describe("__", () => {
  it("acts as a placeholder", () => {
    const lessThan3 = R.lt(R.__, 3);

    expect(lessThan3(1)).toEqual(true)
  });
});

describe("addIndex", () => {
  it("creates a new list iteration function with an arrity param", () => {
    const returnIndexes = R.addIndex(R.map)((x, i) => i)
    expect(returnIndexes([1, 1, 1])).toEqual([0, 1, 2]);
  });
});

describe("always", () => {
  it("creates a function that always returns a value", () => {
    const three = R.always(3);

    expect(three()).toEqual(3);
  });
});

describe("applyTo", () => {
  it("applies a function to a value", () => {
    const add1 = R.add(1);
    const applyTo2 = R.applyTo(2);

    const result = applyTo2(add1);

    expect(result).toEqual(3);
  });
});

