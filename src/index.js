module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketsMap = Object.fromEntries(
    bracketsConfig.map(([open, close]) => [close, open])
  );

  const openBrackets = bracketsConfig.map((pair) => pair[0]);

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    const topElement = stack[stack.length - 1];

    if (char === bracketsMap[char] && openBrackets.includes(char)) {
      if (topElement === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (bracketsMap[char]) {
      if (stack.pop() !== bracketsMap[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};
