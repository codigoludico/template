import {greeter} from "../src/scripts";
import {expect} from "chai";

describe("Greeter", function() {
  it("should greet me", () => {
    expect(greeter("Joe")).to.be.equal("Hello Joe");
  });
});
