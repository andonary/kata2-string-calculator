import { Add } from "../src/add";

describe("String calculator", () => {
  it("should add", function () {
    expect(Add("")).toEqual(0);
    expect(Add("1")).toEqual(1);
    expect(Add("1,0")).toEqual(1);
    expect(Add("10,0")).toEqual(10);
    expect(Add("1,1")).toEqual(2);
    expect(Add("1,1,1")).toEqual(3);
    expect(Add("1,1\n1")).toEqual(3);
    expect(() => Add("1,1,\n1")).toThrow();
    expect(Add("//;\n1;1;1")).toEqual(3);
    expect(() => Add("//|\n1|2,3")).toThrow();
  });
});
