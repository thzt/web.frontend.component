(function () {
    let stream1 = cont => {
        let i = 0;
        while (++i) {
            if (i > 10) {
                break;
            }
            cont(i);
        }
    };

    // cps indeed
    let stream2 = cont => stream1(x => cont(x * 2));
    let stream3 = cont => stream1(x => x % 2 != 0 && cont(x));
    let stream4 = cont => {
        stream2(cont);
        stream3(cont);
    };

    stream4(x => console.log(x));
} ());