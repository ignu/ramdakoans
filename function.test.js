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

describe("ap", () => {
  it("applies a list of functions to a list of values", () => {
    const result = R.ap([R.add(1), R.add(2)])([0, 1])

    expect(result).toEqual([1, 2, 2, 3]);
  });
});

describe("apply", () => {
  it("uses a list as arguments to a function", () => {
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

describe("applyTo", () => {
  it("applies a function to a value", () => {
    const add1 = R.add(1);
    const applyTo2 = R.applyTo(2);

    const result = applyTo2(add1);

    expect(result).toEqual(3);
  });
});

describe("ascend", () => {
  it("creates an ascending comparator function", () => {
    const byScore = R.ascend(R.prop("score"))
    const results =R.sort(byScore, [{score: 9}, {score: 2}, {score: 3}])
    const score = R.map(R.prop("score"), results)

    expect(score).toEqual([2, 3, 9]);
  });
});

describe("call", () => {
  it("calls the first argument with the remaining arguments", () => {
    const result = R.call(R.add, 1, 2)

    expect(result).toEqual(3);
  });
});

describe("comparator", () => {
  it("returns a comparator function from one that returns lt", () => {
    const byScore = R.comparator((a, b) => a < b)
    const results = R.sortBy(byScore, [5, 2, 3, 1])

    expect(results).toEqual([1, 2, 3, 5]);
  });
});

describe("compose", () => {
  it("composes multiple functions", () => {
    const greet = R.compose(
      R.toUpper,
      (f, l) => `Hi, ${f} ${l}!`
    )
    expect(greet("jon", "snow")).toEqual("HI, JON SNOW!");
  });
});

