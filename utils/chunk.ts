export const chunk = (str: string) => {
  const result = [];
  for (let i = str.length; i > 0; i -= 7) {
    result.unshift(str.slice(Math.max(i - 7, 0), i));
  }
  return result;
};
