const do_it_button = document.getElementById('do-it');
const n_input = document.getElementById('n');
const output = document.getElementById('output');
function do_it() {
    const n = n_input.value;
    const palindromes = sum_of_palindromes(n);
    output.textContent = palindromes.map(x=>x.join('')).join('\n');
    const t = big_sum(palindromes);
    output.textContent += '\n'+t.reverse().join('')+'\n';
    output.textContent += n_input.value+'\n';
}
do_it_button.addEventListener('click',do_it);

const test_button = document.getElementById('big-test');
const test_length_input = document.getElementById('test-length');
const test_count_input = document.getElementById('test-count');
const test_result = document.getElementById('test-result');
function big_test() {
    console.clear();
    const l = parseInt(test_length_input.value);
    const num_reps = parseInt(test_count_input.value);
    const max = 10**l;
    let n;
    console.info('l is',l);
    console.info('max is',max);
    try {
        for(let i=0;i<num_reps;i++) {
            n = Math.floor(Math.random()*max);
            test(n);
        }
    } catch(e) {
        console.error('N was',n);
        console.error(e);
        test_result.textContent = 'Failed';
        return;
    }
    test_result.textContent = 'OK';
    console.info('OK');
}
test_button.addEventListener('click',big_test);

