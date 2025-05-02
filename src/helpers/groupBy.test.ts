import { describe, it, expect } from "vitest";
import { groupBy } from "./groupBy";

describe("groupBy", () => {
  it("groups objects by a numeric key", () => {
    const items = [
      { id: 1, group: 1 },
      { id: 2, group: 1 },
      { id: 3, group: 2 },
    ];

    const result = groupBy(items, (item) => item.group);

    expect(result).toEqual({
      1: [
        { id: 1, group: 1 },
        { id: 2, group: 1 },
      ],
      2: [{ id: 3, group: 2 }],
    });
  });

  it("groups objects by string key", () => {
    const items = [
      { id: 1, type: "a" },
      { id: 2, type: "b" },
      { id: 3, type: "a" },
    ];

    const result = groupBy(items, (item) => item.type);

    expect(result).toEqual({
      a: [
        { id: 1, type: "a" },
        { id: 3, type: "a" },
      ],
      b: [{ id: 2, type: "b" }],
    });
  });

  it("returns an empty object if the input array is empty", () => {
    const items: { id: number; group: number }[] = [];

    const result = groupBy(items, (item) => item.group);

    expect(result).toEqual({});
  });

  it("works with objects without a shared key", () => {
    const items = [
      { id: 1, category: "fruit" },
      { id: 2, category: "vegetable" },
      { id: 3, category: "fruit" },
    ];

    const result = groupBy(items, (item) => item.category);

    expect(result).toEqual({
      fruit: [
        { id: 1, category: "fruit" },
        { id: 3, category: "fruit" },
      ],
      vegetable: [{ id: 2, category: "vegetable" }],
    });
  });

  // it("groups by computed key", () => {
  //   const items = [1, 2, 3, 4, 5];

  //   const result = groupBy(items, (item) => (item % 2 === 0 ? "even" : "odd"));

  //   expect(result).toEqual({
  //     odd: [1, 3, 5],
  //     even: [2, 4],
  //   });
  // });
});
