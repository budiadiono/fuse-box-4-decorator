import { foo } from "./decorators";

class Bar {
  // this `foo` decorator not called because `methodNoParam` has no parameter
  // try to add a parameter -- then it will get called
  @foo()
  methodNoParam() {
    console.log("methodNoParam called");

    return "methodNoParam";
  }

  // this won't work as well
  @foo("aha")
  methodNoParam2() {
    console.log("methodNoParam called");

    return "methodNoParam";
  }

  // no problem with this, since `methodWithParam` has a parameter
  @foo()
  methodWithParam(param: string) {
    console.log("methodWithParam called", param);
    return "methodNoParam";
  }

  // no problem with this, since `methodWithParam` has a parameter
  @foo()
  methodWithParams(param1: string, param2: string) {
    console.log("methodWithParams called", param1, param2);
    return "methodNoParam";
  }
}

console.log("");
console.log("------------");
console.log("");

const bar = new Bar();

bar.methodNoParam();
bar.methodWithParam("yep!");
bar.methodWithParams("p1", "p2");
