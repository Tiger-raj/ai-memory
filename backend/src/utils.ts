export function random(len: number): string {
  let options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  let length = options.length;
  for (let i = 0; i < len; i++) {
    result += options.charAt(Math.floor(Math.random() * length));
  }
  return result;
}
