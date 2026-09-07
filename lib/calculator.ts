type Token = number | string;

function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  while (index < expression.length) {
    const char = expression[index];
    if (/\s/.test(char)) { index += 1; continue; }
    if (/[0-9.]/.test(char)) {
      const match = expression.slice(index).match(/^(?:\d+\.?\d*|\.\d+)/);
      if (!match) throw new Error("Invalid number");
      const value = Number(match[0]);
      if (!Number.isFinite(value)) throw new Error("Invalid number");
      tokens.push(value); index += match[0].length; continue;
    }
    if ("+-*/()%".includes(char)) { tokens.push(char); index += 1; continue; }
    throw new Error("Unsupported character");
  }
  return tokens;
}

export function calculateExpression(expression: string): number {
  const tokens = tokenize(expression);
  let position = 0;
  const peek = () => tokens[position];
  const consume = () => tokens[position++];
  function primary(): number {
    if (peek() === "-") { consume(); return -primary(); }
    if (peek() === "(") { consume(); const value = additive(); if (consume() !== ")") throw new Error("Missing closing parenthesis"); return value; }
    const value = consume();
    if (typeof value !== "number") throw new Error("Expected a number");
    return value;
  }
  function multiplicative(): number {
    let value = primary();
    while (["*", "/", "%"].includes(String(peek()))) {
      const operator = consume(); const right = primary();
      if (operator === "*") value *= right;
      if (operator === "/") { if (right === 0) throw new Error("Cannot divide by zero"); value /= right; }
      if (operator === "%") { if (right === 0) throw new Error("Cannot divide by zero"); value %= right; }
    }
    return value;
  }
  function additive(): number {
    let value = multiplicative();
    while (["+", "-"].includes(String(peek()))) { const operator = consume(); const right = multiplicative(); value = operator === "+" ? value + right : value - right; }
    return value;
  }
  if (!tokens.length) throw new Error("Enter an expression");
  const result = additive();
  if (position !== tokens.length || !Number.isFinite(result)) throw new Error("Invalid expression");
  return result;
}
