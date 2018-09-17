const form = document.getElementById('input');
const do_it_button = document.getElementById('do-it');
const n_input = document.getElementById('n');
const output = document.getElementById('output');
const output_section = document.getElementById('output-section');
function check_value() {
    const n = n_input.value.trim();
    if (!n.match(/^\d+$/)) {
        do_it_button.setAttribute('disabled', true);
    } else {
        do_it_button.removeAttribute('disabled');
    }
}
check_value();
n_input.addEventListener('input', check_value);
n_input.addEventListener('change', check_value);

function do_it(e) {
    e.preventDefault();
    document.body.classList.add('show');
    let n = n_input.value.trim().replace(/^0*/, '');
    if (n == '') {
        n = '0';
    } else if (!n.match(/^\d+$/)) {
        return false;
    }

    const n_digits = digits_of(n);
    const first_row = document.getElementById('first-row');
    first_row.innerHTML = '';
    for (let d of n_digits) {
        const cell = document.createElement('span');
        cell.classList.add('digit');
        cell.textContent = d;
        first_row.appendChild(cell);
    }
    const palindromes = sum_of_palindromes(n);
    while (palindromes.length < 3) {
        palindromes.push([0]);
    }
    output.innerHTML = '';
    const rows = [];
    for (let p of palindromes) {
        const row = document.createElement('div');
        row.classList.add('row');
        output.appendChild(row);
        const cells = [];
        rows.push(cells);
        for (let d of p) {
            const cell = document.createElement('span');
            row.appendChild(cell);
            cell.classList.add('digit');
            cell.textContent = d;
            cells.push(cell);
        }
    }
    const final_row = document.createElement('div');
    final_row.setAttribute('class', 'row final');
    output.appendChild(final_row);
    const final_cells = [];
    const total = big_sum(palindromes).reverse();
    for (let d of total) {
        const cell = document.createElement('span');
        final_row.appendChild(cell);
        cell.classList.add('digit');
        cell.textContent = d;
        final_cells.push(cell);
    }

    output_section.scrollIntoView({ behavior: 'smooth' });
    document.body.classList.remove('complete');

    const TIME_DELAY = 900;

    let i = 0;
    let p = 0;
    function reveal() {
        rows[p][i].classList.add('revealed');
        rows[p][rows[p].length - 1 - i].classList.add('revealed');
        i += 1;
        if (2 * i >= rows[p].length) {
            p += 1;
            i = 0;
        }
        if (p < rows.length) {
            setTimeout(reveal, TIME_DELAY);
        } else {
            setTimeout(reveal_final, 2000);
        }
    }
    function reveal_final() {
        final_cells[final_cells.length - 1 - i].classList.add('revealed');
        i += 1;
        if (i < final_cells.length) {
            setTimeout(reveal_final, TIME_DELAY);
        } else {
            document.body.classList.add('complete');
        }
    }
    setTimeout(reveal, TIME_DELAY * 2);
}
form.addEventListener('submit', do_it);

