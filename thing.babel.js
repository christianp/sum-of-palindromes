"use strict";

var form = document.getElementById('input');
var do_it_button = document.getElementById('do-it');
var n_input = document.getElementById('n');
var output = document.getElementById('output');
var output_section = document.getElementById('output-section');

function check_value() {
  var n = n_input.value.trim();

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
  var n = n_input.value.trim().replace(/^0*/, '');

  if (n == '') {
    n = '0';
  } else if (!n.match(/^\d+$/)) {
    return false;
  }

  var n_digits = digits_of(n);
  var first_row = document.getElementById('first-row');
  first_row.innerHTML = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = n_digits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var d = _step.value;
      var cell = document.createElement('span');
      cell.classList.add('digit');
      cell.textContent = d;
      first_row.appendChild(cell);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var palindromes = sum_of_palindromes(n);

  while (palindromes.length < 3) {
    palindromes.push([0]);
  }

  output.innerHTML = '';
  var rows = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = palindromes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _p = _step2.value;
      var row = document.createElement('div');
      row.classList.add('row');
      output.appendChild(row);
      var cells = [];
      rows.push(cells);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _p[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _d = _step4.value;

          var _cell = document.createElement('span');

          row.appendChild(_cell);

          _cell.classList.add('digit');

          _cell.textContent = _d;
          cells.push(_cell);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var final_row = document.createElement('div');
  final_row.setAttribute('class', 'row final');
  output.appendChild(final_row);
  var final_cells = [];
  var total = big_sum(palindromes).reverse();
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = total[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _d2 = _step3.value;

      var _cell2 = document.createElement('span');

      final_row.appendChild(_cell2);

      _cell2.classList.add('digit');

      _cell2.textContent = _d2;
      final_cells.push(_cell2);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  output_section.scrollIntoView({
    behavior: 'smooth'
  });
  document.body.classList.remove('complete');
  var TIME_DELAY = 900;
  var i = 0;
  var p = 0;

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

