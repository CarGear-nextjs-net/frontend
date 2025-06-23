export function format(str, ...values) {
  return str.replace(/\{(\d+)\}/g, function (_match, index) {
    if (values.length > index) {
      return values[index];
    } else {
      return "";
    }
  });
}

function removeVietnameseTones(str) {
  return str
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/đ/g, "d") 
    .replace(/Đ/g, "D");
}
export function generateSlug(name) {
  return removeVietnameseTones(name)
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "-") 
  .replace(/[^a-z0-9-]/g, "") 
  .replace(/-+/g, "-"); 
}