const {decide_type, sum_of_palindromes, big_sum, is_palindrome, digits_of, debugging} = require('./3palindromes.js');

function test(n,base=10) {
    let palindromes = [];
    try {
        palindromes = sum_of_palindromes(n,base);
        if(!palindromes.every(is_palindrome)) {
            throw(new Error("Not every number is a palindrome"));
        }
        if(!palindromes.every(p=>{
            for(let i=0;i<p.length;i++) {
                if(p[i]===undefined || p[i]===null) {
                    return false;
                }
            }
            return true;
        })) {
            throw(new Error("Not every digit is present"));
        }
        if(!palindromes.every(p=>p.every(d => d>=0 && d<base))) {
            throw(new Error("Not every digit is valid"));
        }
        const digits = digits_of(n,base).reverse();
        const t = big_sum(palindromes);
        for(let i=0;i<digits.length;i++) {
            if(digits[i]!=t[i]) {
                console.log('total',t.reverse().join(''));
                throw(new Error("Doesn't sum to the same thing"));
            }
        }
    } catch(e) {
        console.error(`n: "${n}"`);
        console.log(palindromes.join('\n'));
        console.error(e.message);
        return false;
    }
    return true;
}

const bads = [
    10321393
];

const arg = process.argv[2] || 'every';
if(!isNaN(arg)) {
    if(test(parseInt(arg))) {
        console.log('works');
    }
    const ps = sum_of_palindromes(parseInt(arg));
    console.log('ps',ps);
    const {type,config,special} = decide_type(digits_of(parseInt(arg)).reverse());
    console.log('type',type);
    console.log('special',special);
    console.log('config',config);
} else if(arg=='every') {
    const from = parseInt(process.argv[3] || 0);
    const limit = parseInt(process.argv[4] || 10**8);
    let marker = Math.floor(Math.log(from)/Math.log(2));
    for(let i=from;i<limit;i++) {
        if(i==marker) {
            console.log(marker);
            marker *= 2;
        }
        if(!test(i)) {
            break;
        }
    }
} else if(arg=='bads') {
    debugging.active = true;

    for(let n of bads) {
        console.log('\n\n');
        console.log(n);
        if(!test(n)) {
            break;
        } else {
            console.log("YEP",n);
        }
    }
}
