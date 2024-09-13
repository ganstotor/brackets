module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketMap = {};
  const openBrackets = new Set();

  // Create a map and a set for easy lookups
  bracketsConfig.forEach(([open, close]) => {
    bracketMap[close] = open;
    openBrackets.add(open);
  });

  for (let char of str) {
    // If the current character is an opening bracket
    if (openBrackets.has(char)) {
      // Special case: check if the bracket is both opening and closing
      if (bracketMap[char] === char) {
        // If it's at the top of the stack, pop it (acts like a closing bracket)
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          // Otherwise, push it (acts like an opening bracket)
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else {
      // If the character is a closing bracket, check if it matches the top of the stack
      if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
        return false;
      }
    }
  }

  // If the stack is empty, the brackets are balanced
  return stack.length === 0;
}
