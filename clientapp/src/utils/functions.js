export function format(str, ...values) {
  return str.replace(/\{(\d+)\}/g, function (_match, index) {
    if (values.length > index) {
      return values[index];
    } else {
      return "";
    }
  });
}
