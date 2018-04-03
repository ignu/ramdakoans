const R = require("ramda");

describe("cond", () => {
  it("returns an if/else type function", () => {
    const isOne = R.cond([
      [R.equals(1), () => "It's one"],
      [R.T, R.always("It is not one")]
    ])

    expect(isOne(1)).toEqual("It's one");
    expect(isOne(2)).toEqual("It is not one");
  });
});
