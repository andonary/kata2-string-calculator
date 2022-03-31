import { Add } from "./add";

describe("Add string calculator", () => {
  it("should add my numbers", () => {
    expect(Add("")).toEqual(0);
    expect(Add("1")).toEqual(1);
    expect(Add("1,0")).toEqual(1);
    expect(Add("1,1")).toEqual(2);
    expect(Add("1,1,1")).toEqual(3);
    expect(Add("1,1\n1")).toEqual(3);
    expect(Add("1,1\n1\n1")).toEqual(4);
    expect(() => Add("1,1\n1\n1,")).toThrow();
    expect(Add("//;\n1;1;1\n1")).toEqual(4);
    expect(Add("//sep\n1sep1sep1\n1")).toEqual(4);
    expect(() => Add("1,-1")).toThrow();
  });
});
