export function foo(meh?: string) {
  console.log("");
  console.log("foo called ------------>", meh);
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("====================");
    console.log(`foo(${meh}) -------> ${propertyKey}!!!`);
    console.log("target", target);
    console.log("descriptor", descriptor);
  };
}
