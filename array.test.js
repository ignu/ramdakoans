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

describe("contains", () => {
  it("detects if an array contains an element", () => {
    const arr = [1, 2, 3]

    expect(R.contains(1, arr)).toBeTruthy();
    expect(R.contains(9, arr)).not.toBeTruthy();
  });
});

describe("drop", () => {
  it("returns all but the first n elements", () => {
    const arr = [1, 2, 3, 4];

    expect(R.drop(3, arr)).toEqual([4]);
  });
});

describe("dropLast", () => {
  it("returns all but the last n elements", () => {
    const arr = [1, 2, 3, 4];

    expect(R.dropLast(3, arr)).toEqual([1]);
  });
});

describe("dropWhile", () => {
  it("like drop but with a predicate", () => {
    const isOne = R.equals(1);

    expect(R.dropWhile(isOne, [1, 1, 1, 2])).toEqual([2]);
  });
});


describe("dropLastWhile", () => {
  it("like dropLast but with a predicate", () => {
    const isOne = R.equals(1);

    expect(R.dropLastWhile(isOne, [2, 1, 1, 1])).toEqual([2]);
  });
});

describe("dropRepeats", () => {
  it("drops repeated elements", () => {
    expect(R.dropRepeats([1, 1, 1, 2, 2, 1])).toEqual([1, 2, 1]);
  });
});


describe("dropRepeatsWith", () => {
  it("like dropRepeats but with a predicate", () => {
    expect(R.dropRepeatsWith(R.eqBy(Math.abs), [1, -1, 1, 2, -2, 1])).toEqual([1, 2, 1]);
  });
});

describe("dropWhile", () => {
  it("drops while the predicate is true", () => {
    expect(R.dropWhile(R.lte(R.__, 5), [1, 3, 5, 9])).toEqual([9]);
  });
});

describe("endsWith", () => {
  it("predicate to see if array or string ends with", () => {
    expect(R.endsWith([2, 3], [1, 2, 3])).toEqual(true);
    expect(R.endsWith("cool", "yeah, it is cool")).toEqual(true);
  });
});

describe("filter", () => {
  it("filters results", () => {
    const bigNums = R.gte(R.__, 9)
    const results = R.filter(bigNums, [1, 8, 9, 11])

    expect(results).toEqual([9, 11]);
  });
});

describe("find", () => {
  it("returns first element of the array", () => {
    const arr = [{king: false, firstName: "Bran"},
      {king: true, firstName: "Jon"},
      {king: true, firstName: "Stannis"}
    ];

    const isKing = R.propEq('king', true)

    expect(R.find(isKing, arr).firstName).toEqual("Jon");
  });
});

describe("findIndex", () => {
  it("returns the index at an array", () => {
    const arr = [1, 2, 3, 4];
    const isThree = R.equals(3)

    expect(R.findIndex(isThree, arr)).toEqual(2);
  });
});

describe("findLast", () => {
  it("returns the last eleemnt of the array", () => {
    const arr = [{king: false, firstName: "Bran"},
      {king: true, firstName: "Jon"},
      {king: true, firstName: "Stannis"}
    ];

    const isKing = R.propEq('king', true)

    expect(R.findLast(isKing, arr).firstName).toEqual("Stannis");
  });
});

describe("findLastIndex", () => {
  const arr = [3, 2, 3, 4];
  const isThree = R.equals(3)

  expect(R.findLastIndex(isThree, arr)).toEqual(2);
});

describe("flatten", () => {
  it("returns a flattened array", () => {
    const arr = [1, [2], [[[3]]]];

    expect(R.flatten(arr)).toEqual([1, 2, 3]);
  });
});

