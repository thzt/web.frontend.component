const findMatches = (reg, str) => {
    let matches = [],
        match,
        isMatch = false;

    while (match = reg.exec(str)) {
        isMatch = true;
        matches.push(match);
    }

    return isMatch
        ? matches
        : null;
}

export default findMatches;