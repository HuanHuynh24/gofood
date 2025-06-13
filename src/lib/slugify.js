export function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD") // chuyển tiếng Việt có dấu thành không dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-"); // thay dấu cách bằng dấu gạch ngang
}
