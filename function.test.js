const R = require("ramda");

describe("applyTo", () => {
  it("applies a function to a value", () => {
    const add1 = R.add(1);
    const applyTo2 = R.applyTo(2);

    const result = applyTo2(add1);

    expect(result).toEqual(3);
  });
});

