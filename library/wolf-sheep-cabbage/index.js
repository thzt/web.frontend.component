const rule = {
    wolf: 'sheep',
    sheep: 'cabbage',
  };
  
  const left = {
    wolf: true,
    sheep: true,
    cabbage: true,
  };
  const right = {};
  
  const isDangerous = current => Object.keys(current).some(a => Object.keys(current).some(b => rule[a] === b));
  
  const makeSafe = from => {
    let selection;
    Object.keys(from).some(a => {
      selection = a;
      delete from[a];
      if (isDangerous(from)) {
        from[a] = true;
        return false;
      }
  
      return true;
    });
  
    return selection;
  };
  
  const lefeToRight = () => makeSafe(left);
  
  const rightToLeft = () => {
    if (!isDangerous(right)) {
      return;
    }
  
    return makeSafe(right);
  };
  
  const main = () => {
    while (Object.keys(left).length !== 0) {
      console.log(`${Object.keys(left).join()}:${Object.keys(right).join()}`);
      const selection = lefeToRight();
      right[selection] = true;
      console.log(`->`, selection);
      console.log(`${Object.keys(left).join()}:${Object.keys(right).join()}`);
  
      if (Object.keys(right).length === 3) {
        break;
      }
  
      const otherSelection = rightToLeft();
      if (otherSelection == null) {
        console.log('<-');
        continue;
      }
  
      console.log('<-', otherSelection);
      left[otherSelection] = true;
    }
  };
  
  main();