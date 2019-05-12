/*
  Expr :: Item | Item Expr
  Item :: Literal | Times '[' Expr ']'

  Literal :: [a-z]+
  Times :: [1-9]\d*
*/

class Tokenizer {
  constructor(source) {
    this._source = source;
    this._index = 0;
    this._strategies = [];
  }

  // {type, regExp}
  addTokenStrategies(strategies) {
    this._strategies = this._strategies.concat(strategies);
    return this;
  }

  lookAhead() {
    for (const { type, regExp } of this._strategies) {
      const part = this._source.slice(this._index);
      const match = regExp.exec(part);
      if (match == null) {
        continue;
      }

      const [source] = match;
      return {
        type,
        source,
        length: source.length,
      };
    }
  }

  eat() {
    const token = this.lookAhead();
    if (token == null) {
      return null;
    }

    const { type, source, length } = token;
    this._index += length;
    return {
      type,
      source,
    };
  }
}

const parser = tokenizer => {
  const expr = () => {
    const subItem = item();

    const token = tokenizer.lookAhead();
    if (token == null) {
      return [subItem];
    }

    if (token.type === 'Literal' || token.type === 'Times') {
      const nextItem = expr();
      return [subItem, ...nextItem];
    }

    return [subItem];
  };

  const item = () => {
    const token = tokenizer.lookAhead();
    if (token.type === 'Literal') {
      const item = tokenizer.eat();
      return {
        item,
      };
    }

    const times = tokenizer.eat();
    const leftBracket = tokenizer.eat();
    const subExpr = expr();
    const rightBracket = tokenizer.eat();

    return {
      item: {
        type: 'Multipule',
        times,
        leftBracket,
        subExpr,
        rightBracket,
      },
    };
  };

  return expr();
};

const traverse = expr => {
  return expr.map(node => {
    const { item } = node;
    if (item.type === 'Literal') {
      return item.source;
    }

    const { times, subExpr } = item;
    const subResult = traverse(subExpr);
    return [...Array(+times.source)].map(() => subResult).join('');
  }).join('');
};

const main = () => {
  const s = '2[3[ab]4[c]d]e';

  const tokenizer = new Tokenizer(s);
  tokenizer.addTokenStrategies([
    { type: 'LeftBracket', regExp: /^\[/ },
    { type: 'RightBracket', regExp: /^\]/ },
    { type: 'Times', regExp: /^[1-9]\d*/ },
    { type: 'Literal', regExp: /^[a-z]+/ },
  ]);

  const ast = parser(tokenizer);

  const result = traverse(ast);
  console.log(result);  // abababccccdabababccccde
};

main();
