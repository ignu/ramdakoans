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

describe("forEach", () => {
  it("loops over elements", () => {
    let x = 0;
    R.forEach((i) => x = x + i, [1, 2, 3])
    expect(x).toEqual(6);
  });
});

describe("fromPairs", () => {
  it("returns an array of object pairs", () => {
    const arr = [["firstName", "Jon"], ["lastName", "Lakeman"]]

    const result = R.fromPairs(arr);

    expect(result).toEqual({
      firstName: "Jon",
      lastName: "Lakeman"
    })
  });
});

describe("groupBy", () => {
  it("created an object with groups", () => {
    const arr = [
      {firstName: "Ben", state: "PA"},
      {firstName: "George", state: "WA"},
      {firstName: "Krysten", state: "PA"}
    ]

    const result = R.groupBy(R.prop("state"), arr)

    expect(result.PA.length).toEqual(2);
  });
});

describe("groupWith", () => {
  it("groups arrays where consecutive elements match a supplied predicate", () => {
    const arr = [1, 1, 2, 1, 1]

    expect(R.groupWith(R.equals, arr)).toEqual([[1, 1], [2], [1, 1]]);
  });
});

describe("head", () => {
  it("returns the first element of an array", () => {
    const arr = [1, 2, 3];

    expect(R.head(arr)).toEqual(1);
  });
});

describe("indexBy", () => {
  it("creates an object with the supplied index", () => {
    const governors = [{state: "PA", gov: "Wolfe"}, {state: "WA", gov: "Inslee"}];
    const result = R.indexBy(R.prop("state"), governors)

    expect(result.PA.gov).toEqual("Wolfe");
  });
});

describe("indexOf", () => {
  it("returns the index of the first appearance", () => {
    expect(R.indexOf(3, [1, 2, 3, 4, 3])).toEqual(2);

    expect(R.indexOf("o", "cool")).toEqual(1);
  });
});

describe("init", () => {
  it("returns all but the last element of an array", () => {
    expect(R.init([1, 2, 3])).toEqual([1, 2]);
  });
});

describe("insert", () => {
  it("inserts an element at an index", () => {
    expect(R.insert(1, 'a', [1, 2, 3])).toEqual([1, 'a', 2, 3]);
  });
});

describe("insertAll", () => {
  it("inserts all elements into a list", () => {
    expect(R.insertAll(1, ['a', 'b'], [1, 2, 3])).toEqual([1, 'a', 'b', 2, 3]);
  });
});

describe("intersperse", () => {
  it("intersperses a value in a list", () => {
    expect(R.intersperse(0, [1, 1, 1])).toEqual([1, 0, 1, 0, 1]);
  });
});

describe("into", () => {
  it("transucdes into object or string", () => {
    const toArray = R.into([])
    const toObj = R.into({})
    const result = toArray(R.map(R.add(1)), [1, 2])

    expect(result).toEqual([2, 3]);
  });
});

