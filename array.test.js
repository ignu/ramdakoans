const R = require("ramda");

describe("adjust", () => {
  it("applies a function to the value at the given index of an array", () => {
    const add3 = R.add(3);
    const ones = [1, 1, 1];

    const updated = R.adjust(add3, 1, ones)

    expect(updated).toEqual([1, 4, 1]);
  });
});


describe("all", () => {
  it("returns true if suplied predicate returns truthy ", () => {
    const trues = [true, 1, 1];

    expect(R.all(R.identity, trues)).toEqual(true);

    const make1falsey = R.adjust(R.always(false), 1);

    expect(R.all(R.identity, make1falsey(trues))).toEqual(false);
  });
});


describe("any", () => {
  it("returns true if suplied predicate returns truthy for any value", () => {
    const oneTruthy = [false, 1, false];

    expect(R.any(R.identity, oneTruthy)).toEqual(true);
  });
});

describe("aperture", () => {
  it("returns a list of n typed of consecutive elements", () => {
    const list = [1, 2, 3, 4, 5];

    const result = R.aperture(3, list);

    expect(result).toEqual([[1, 2, 3], [2, 3, 4], [3, 4, 5]]);
  })
})

describe("apply", () => {
  it("applies a function to a list", () => {
    const list = [5, 2, "ignored"];

    expect(R.apply(R.add, list)).toEqual(7);
  });
});

describe("applySpec", () => {
  it("creates a function from an object", () => {
    const userDetails = {
      firstName: "Jon",
      lastName: "Snow",
      email: "jon@winterfel.net"
    };

    const formatUser = R.applySpec({
      fullName: (u) => `${u.firstName} ${u.lastName}`,
      email: R.prop("email")
    })

    const user = formatUser(userDetails)

    expect(user.fullName).toEqual("Jon Snow");
    expect(user.email).toEqual("jon@winterfel.net");
  });
});

describe("append", () => {
  it("appends a value to a list", () => {
    const values = [1];

    expect(R.append(1, values)).toEqual([1, 1]);
  });
});

describe("chain", () => {
  it("(or flatMap) maps a function and concatenates the results", () => {
    const double = x => [x, x+1]
    const result = R.chain(double, [1, 2, 3]);

    expect(result).toEqual([1, 2, 2, 3, 3, 4]);;
  });
});

describe("concat", () => {
  it("concats arrays", () => {
    const result = R.concat([1], [2]);

    expect(result).toEqual([1, 2]);
  });
});

