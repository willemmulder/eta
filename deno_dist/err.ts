function setPrototypeOf(obj: any, proto: any) {
  // eslint-disable-line @typescript-eslint/no-explicit-any
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(obj, proto);
  } else {
    obj.__proto__ = proto;
  }
}

// This is pretty much the only way to get nice, extended Errors
// without using ES6

/**
 * This returns a new Error with a custom prototype. Note that it's _not_ a constructor
 *
 * @param message Error message
 *
 * **Example**
 *
 * ```js
 * throw EtaErr("template not found")
 * ```
 */

export default function EtaErr(message: string): Error {
  var err = new Error(message);
  setPrototypeOf(err, EtaErr.prototype);
  return err;
}

EtaErr.prototype = Object.create(Error.prototype, {
  name: { value: "Eta Error", enumerable: false },
});

/**
 * Throws an EtaErr with a nicely formatted error and message showing where in the template the error occurred.
 */

export function ParseErr(message: string, str: string, indx: number): void {
  var whitespace = str.slice(0, indx).split(/\n/);

  var lineNo = whitespace.length;
  var colNo = whitespace[lineNo - 1].length + 1;
  message += " at line " +
    lineNo +
    " col " +
    colNo +
    ":\n\n" +
    "  " +
    str.split(/\n/)[lineNo - 1] +
    "\n" +
    "  " +
    Array(colNo).join(" ") +
    "^";
  throw EtaErr(message);
}
