/**
 * list parser
 */
const parse = (() => {
  /**
   * 源代码文本
   */
  let sourceCode;

  /**
   * 当前处理的位置
   */
  let pos;

  /**
   * 源代码总长
   */
  let end;

  /**
   * 当前位置的 token
   */
  let token;

  // 返回闭包里的 parse 函数
  return parse;

  // ---- ---- ---- ---- ---- ---- ---- ---- ----

  /**
   * syntax
   * 
   * expr = identifier | list
   * exprs = expr exprs
   * list = '(' exprs ')'
   */
  function parse(code) {
    sourceCode = code;
    pos = 0;
    end = sourceCode.length;

    nextToken();
    assert(['Identifier', 'LeftBracket']);
    const expr = parseExpr();

    nextToken();
    assert(['EndOfFile']);

    return {
      expr,
    }
  }

  /**
   * expr = identifier | list
   */
  function parseExpr() {
    assert(['Identifier', 'LeftBracket']);

    if (token.name === 'Identifier') {
      return token;
    }

    assert(['LeftBracket']);
    const list = parseList();
    return list;
  }

  /**
   * list = '(' exprs ')'
   * exprs = expr exprs
   */
  function parseList() {
    assert(['LeftBracket']);

    // 向后扫描 exprs 各项，放到列表中
    const results = [];
    while (true) {
      nextToken();
      assert(['RightBracket', 'Identifier', 'LeftBracket']);

      // 遇到右括号，说明当前层级的 exprs 处理完毕
      if (token.name === 'RightBracket') {
        break;
      }

      assert(['Identifier', 'LeftBracket']);
      const expr = parseExpr();
      results.push(expr);
    }

    return {
      list: results,
    }
  }

  // ---- ---- ---- ---- ---- ---- ---- ---- ----

  /**
   * 向后扫描一个 token
   */
  function nextToken() {
    while (true) {
      if (pos >= end) {
        return token = createToken('EndOfFile', pos, pos, null);
      }

      const ch = sourceCode.charAt(pos);
      switch (ch) {
        case '(':
          return token = createToken('LeftBracket', pos, ++pos, ch);
        case ')':
          return token = createToken('RightBracket', pos, ++pos, ch);

        case ' ':
        case '\n':
          ++pos;
          continue;

        default:
          if (isIdentifierStart(ch)) {
            return token = scanIdentifier();
          }
      }
    }
  }

  // ---- ---- ---- ---- ---- ---- ---- ---- ----

  /**
   * 创建 token 对象
   */
  function createToken(name, pos, end, text) {
    return {
      name,
      pos,
      end,
      text,
    };
  }

  /**
   * 是标识符的开头
   */
  function isIdentifierStart(ch) {
    return ch >= 'a' && ch <= 'z';
  }

  /**
   * 是标识符的一部分
   */
  function isIdentifierPart(ch) {
    return isIdentifierStart(ch) || ch === '-';
  }

  /**
   * 扫描一个标识符
   */
  function scanIdentifier() {
    const identifierStart = pos;
    ++pos;

    while (true) {
      if (pos >= end) {
        break;
      }
      const ch = sourceCode.charAt(pos);
      if (!isIdentifierPart(ch)) {
        break;
      }
      ++pos;
    }

    const text = sourceCode.slice(identifierStart, pos);
    return createToken('Identifier', identifierStart, pos, text);
  }

  /**
   * 断言当前 token 的名字
   */
  function assert(nameList) {
    if (nameList.includes(token.name)) {
      return;
    }

    throw new Error(`unexpected token: ${JSON.stringify(token, null, 2)}`);
  }

})();

// ---- ---- ---- ---- ---- ---- ---- ---- ----

const ast = parse(`
(a 
  (
    (c)
    d
  )
 e-f
)
`);

debugger
