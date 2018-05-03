'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function digits_of(n) {
    return (n + '').split('').map(function (d) {
        return parseInt(d);
    });
}

function big_sum(ns) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    var carry = 0;
    var out = [];
    for (var i = 0; ns.some(function (n) {
        return i < n.length;
    }); i++) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = ns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var n = _step.value;

                carry += n[i] || 0;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var r = carry % base;
        out[i] = r;
        carry = idiv(carry, base);
    }
    if (carry) {
        out.push(carry);
    }
    return out;
}

function big_sub(a, b, base) {
    a = a.slice();
    for (var i = 0; i < a.length; i++) {
        a[i] -= b[i] || 0;
        while (a[i] < 0) {
            a[i] += base;
            a[i + 1] -= 1;
        }
    }
    return a;
}

function D(n, base) {
    if (arguments.length < 2) {
        throw new Error("forgot to give base to D");
    }
    n = n % base;
    if (n < 0) {
        n += base;
    }
    return n;
}
function idiv(a, b) {
    if (arguments.length < 2) {
        throw new Error("forgot to give b to idiv");
    }
    a -= a % b;
    return a / b;
}

function is_palindrome(digits) {
    for (var i = 0; i < digits.length / 2; i++) {
        if (digits[i] != digits[digits.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

function digits_to_int(digits) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    return parseInt(digits.map(function (x) {
        return x + '';
    }).join(''), base);
}
function f(digitses) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    return digitses;
}

function sum_two_digits(n, digits, base) {
    var _digits = _slicedToArray(digits, 2),
        d0 = _digits[0],
        d1 = _digits[1];

    if (d1 == d0) {
        return f([digits]);
    } else if (d1 <= d0) {
        return f([[d1, d1], [d0 - d1]]);
    } else if (d1 > d0 + 1) {
        return f([[d1 - 1, d1 - 1], [base + d0 - d1 + 1]]);
    } else {
        return f([[d0, d0], [base - 1], [1]]);
    }
}
function sum_three_digits(n, digits, base) {
    var _digits2 = _slicedToArray(digits, 3),
        d0 = _digits2[0],
        d1 = _digits2[1],
        d2 = _digits2[2];

    if (d2 <= d0) {
        return f([[d2, d1, d2], [d0 - d2]]);
    } else if (d1 != 0) {
        return f([[d2, d1 - 1, d2], [base + d0 - d2]]);
    } else if (D(d2 - d0 - 1, base) != 0) {
        return f([[d2 - 1, base - 1, d2 - 1], [base + d0 - d2 + 1]]);
    } else {
        if (d2 >= 3) {
            return f([[d2 - 2, base - 1, d2 - 2], [1, 1, 1]]);
        } else if (d2 == 2) {
            return f([[1, 0, 1], [base - 1, base - 1], [1]]);
        } else {
            return f([[base - 1, base - 1], [1]]);
        }
    }
}

function sum_four_digits(n, digits, base) {
    var _digits3 = _slicedToArray(digits, 4),
        d0 = _digits3[0],
        d1 = _digits3[1],
        d2 = _digits3[2],
        d3 = _digits3[3];

    if (n >= d3 * Math.pow(base, 3) + d3) {
        var m = n - d3 * Math.pow(base, 3) - d3;
        var d = D(m, base);
        if (m == 2 * Math.pow(base, 2) + 1) {
            switch (d3) {
                case 1:
                    return f([[1, 1, 1, 1], [base - 2, base - 2], [3]]);
                case base - 1:
                    return f([[base - 1, 1, 1, base - 1], [base - 2, base - 2], [3]]);
                default:
                    return f([[d3 - 1, base - 1, base - 1, d3 - 1], [2, 1, 2]]);
            }
        } else if (d >= 1 && d <= base - 2 && m == (d + 1) * base + d) {
            if (d3 + d == d0) {
                if (d3 != 1) {
                    return f([[d3 - 1, base - 2, base - 2, d3 - 1], [1, 3, 1], [d, d]]);
                } else {
                    return f([[base - 1, base - 1, base - 1], [d + 1, d + 1], [1]]);
                }
            } else {
                return f([[d3 - 1, base - 2, base - 2, d3 - 1], [1, 3, 1], [d, d]]);
            }
        } else if (d2 == 0 && d1 == 0 && d0 <= d3 - 1 && d3 != 1) {
            return f([[d3 - 1, base - 1, base - 1, d3 - 1], [base + d0 - d3], [1]]);
        } else if (d3 == 1 && d2 == 0 && d1 == 0 && d0 == 0) {
            return f([[base - 1, base - 1, base - 1], [1]]);
        } else {
            var ps = sum_of_palindromes(m, base);
            return f([[d3, 0, 0, d3]]).concat(ps);
        }
    } else if (d0 <= d3 - 1 && d3 != 1) {
        return [[d3 - 1, base - 1, base - 1, d3 - 1], [base + d0 - d3], [1]];
    } else {
        return [[base - 1, base - 1, base - 1], [1]];
    }
}

function sum_five_digits(n, digits, base) {
    var _digits4 = _slicedToArray(digits, 5),
        d0 = _digits4[0],
        d1 = _digits4[1],
        d2 = _digits4[2],
        d3 = _digits4[3],
        d4 = _digits4[4];

    if (d4 != 1) {
        return decide_type(digits, base);
    }
    var r = digits_to_int([1, d3, 0, d3, 1], base);
    var m = n - r;
    var d = D(m, base);
    var r2 = digits_to_int([1, d3 - 1, base - 1, d3 - 1, 1], base);
    var m2 = n - r2;
    var dd = D(m2, base);
    if (n >= r && m != digits_to_int([2, 0, 1], base) && (d == 0 || d == base - 1 || m != (d + 1) * base + d)) {
        var ps = sum_of_palindromes(m, base);
        return [[1, d3, 0, d3, 1]].concat(ps);
    } else if (n >= r && m == digits_to_int([2, 0, 1], base)) {
        return f([[1, d3, 1, d3, 1], [1, 0, 1]]);
    } else if (n >= r && m == (d + 1) * base + d && d >= 1 && d <= base - 2 && d3 != 0) {
        if (d + 1 + d3 <= base - 1) {
            return f([[1, d3 - 1, 1, d3 - 1, 1], [base - 1, d + 1, base - 1], [d + 1]]);
        } else if (d3 + 1 + d == base + d1) {
            return f([[1, d3 - 1, 1, d3 - 1, 1], [base - 1, d + 1, base - 1], [d + 1]]);
        }
    } else if (n >= r && m == (d + 1) * base + d && d >= 1 && d <= base - 2 && d3 == 0) {
        return f([[base - 1, base - 1, base - 1, base - 1], [d + 1, d + 1], [1]]);
    } else if (n < r && d3 == 0) {
        return f([[base - 1, base - 1, base - 1, base - 1], [1]]);
    } else if (n < r && d3 != 0 && m2 != digits_to_int([2, 0, 1], base) && (d == 0 || d == base - 1 || m2 != (dd + 1) * base + dd)) {
        var _ps = sum_of_palindromes(m2, base);
        return [[1, d3 - 1, base - 1, d3 - 1, 1]].concat(_ps);
    } else {
        return [[1, d3 - 1, base - 2, d3 - 1, 1], [1, d + 1, 1], [d - 1]];
    }
}

function sum_six_digits(n, digits) {
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    var _digits5 = _slicedToArray(digits, 6),
        d0 = _digits5[0],
        d1 = _digits5[1],
        d2 = _digits5[2],
        d3 = _digits5[3],
        d4 = _digits5[4],
        d5 = _digits5[5];

    if (d5 != 1) {
        var l = 6;
        var m = 3;
        var x = [null, d5, 0, 0],
            y = [null, d4 - 1, 0, 0],
            z = [null, D(d0 - d5 - d4 + 1, base), 0, 0];

        var c = [];
        c[1] = idiv(x[1] + y[1] + z[1], base);
        x[2] = z[1] <= digits[2 * m - 3] - 1 ? D(digits[2 * m - 2] - y[1], base) : D(digits[2 * m - 2] - y[1] - 1, base);
        y[2] = D(digits[2 * m - 3] - z[1] - 1, base);
        z[2] = D(digits[1] - x[2] - y[2] - c[1], base);
        c[2] = idiv(x[2] + y[2] + z[2] + c[1] - digits[1], base);
        for (var i = 3; i <= m - 1; i++) {
            x[i] = z[i - 1] <= digits[2 * m - i - 1] - 1 ? 1 : 0;
            y[i] = D(digits[2 * m - i - 1] - z[i - 1] - 1, base);
            z[i] = D(digits[i - 1] - x[i] - y[i] - c[i - 1], base);
            c[i] = idiv(x[i] + y[i] + z[i] + c[i - 1] - digits[i - 1], base);
        }
        x[m] = 0;
        y[m] = D(digits[m - 1] - z[m - 1] - c[m - 1], base);
        c[m] = idiv(x[m] + y[m] + z[m - 1] + c[m - 1] - digits[m - 1], base);

        if (c[m] == 1) {
            // do nothing
        } else if (c[m] == 0) {
            if (y[m] != 0) {
                x[m] = 1;
                y[m] -= 1;
            } else {
                if (y[m - 1] != 0) {
                    x[m] = 1;
                    y[m] = base - 2;
                    y[m - 1] -= 1;
                    z[m - 1] += 1;
                } else {
                    if (z[m - 1] != 0) {
                        y[m] = 1;
                        y[m - 1] = 1;
                        z[m - 1] -= 1;
                    } else {
                        if (x[2] != 0) {
                            x[2] -= 1;
                            x[3] = base - 1;
                            y[2] = 1;
                            y[3] = 1;
                        } else if (x[1] == 1) {
                            return [[2, 0, 0, 0, 0, 2], [1, 1], [base - 4]];
                        } else if (x[1] != 1 && y[1] != base - 1) {
                            return [[x[1] - 1, base - 1, 0, 0, base - 1, x[1] - 1], [y[1] + 1, 0, base - 2, 0, y[1] + 1], [z[1], 1, 1, z[1]]];
                        } else if (x[1] != base - 1 && z[1] == base - 1 && y[1] == base - 1) {
                            return [[x[1] + 1, 0, 0, 0, 0, x[1] + 1], [1, 1], [base - 4]];
                        }
                    }
                }
            }
        } else if (c[m] == 2) {
            x[m] = 1;
            y[m - 1] -= 1;
            y[m] = base - 2;
            z[m - 1] = 0;
        }
        return [[x[1], x[2], x[3], x[3], x[2], x[1]], [y[1], y[2], y[3], y[2], y[1]], [z[1], z[2], z[2], z[1]]];
    } else {
        var _x5 = [],
            _y = [],
            _z = [];

        var _c = [];
        if (D(d0 - d4 + 1, base) != 0 && D(d0 - d4 + 2, base) != 0) {
            _x5[1] = Math.floor((base + d4 - 1) / 2);
            _y[1] = base + d4 - 1 - _x5[1];
            _z[1] = D(d0 - d4 + 1, base);
            _c[1] = idiv(_x5[1] + _y[1] + _z[1] - d0, base);
            _x5[2] = Math.floor((base + d3 - 1) / 2);
            _y[2] = base + d3 - 1 - _x5[2];
            _z[2] = D(d1 - _x5[2] - _y[2] - _c[1], base);
            _c[2] = idiv(_x5[2] + _y[2] + _z[2] + _c[1] - digits[1], base);
            _x5[3] = Math.floor((base + d2 - _c[2] - _z[1]) / 2);
            _y[3] = base + d2 - _c[2] - _z[1] - _x5[3];
            return [[_x5[1], _x5[2], _x5[3], _x5[2], _x5[1]], [_y[1], _y[2], _y[3], _y[2], _y[1]], [_z[1], _z[2], _z[1]]];
        } else if (D(d0 - d4 + 2, base) == 0 && d2 != 0) {
            _x5[1] = Math.floor((base + d4 - 1) / 2);
            _y[1] = base + d4 - 1 - _x5[1];
            _z[1] = base - 1;
            _c[1] = idiv(_x5[1] + _y[1] + _z[1] - d0, base);
            _x5[2] = Math.floor((base + d3 - 1) / 2);
            _y[2] = base + d3 - 1 - _x5[2];
            _z[2] = D(d1 - _x5[2] - _y[2] - _c[1], base);
            _c[2] = idiv(_x5[2] + _y[2] + _z[2] + _c[1] - digits[1], base);
            _x5[3] = Math.floor((1 + d2 - _c[2]) / 2);
            _y[3] = 1 + d2 - _c[2] - _x5[3];
            return [[_x5[1], _x5[2], _x5[3], _x5[2], _x5[1]], [_y[1], _y[2], _y[3], _y[2], _y[1]], [_z[1], _z[2], _z[1]]];
        } else if (D(d0 - d4 + 2, base) == 0 && d2 == 0) {
            if (d4 == 0) {
                _x5[2] = Math.floor(d3 / 2);
                _y[2] = d3 - _x5[2];
                _z[2] = D(d1 - _x5[2] - _y[2] - 1, base);
                _c[2] = idiv(_x5[2] + _y[2] + _z[2] + 1 - d1, base);
                _x5[3] = Math.floor((base - _c[2] - _z[2]) / 2);
                _y[3] = base - _c[2] - _z[2] - _x5[3];
                return [[base - 2, _x5[2], _x5[3], _x5[2], base - 2], [1, _y[2], _y[3], _y[2], 1], [base - 1, _z[2], _z[2], base - 1]];
            } else if (d4 == 1) {
                _x5[2] = Math.floor(d3 / 2);
                _y[2] = d3 - _x5[2];
                _z[2] = D(d1 - _x5[2] - _y[2] - 1, base);
                _c[2] = idiv(_x5[2] + _y[2] + _z[2] + 1 - d1, base);
                _x5[3] = Math.floor((base - _c[2] - _z[2]) / 2);
                _y[3] = base - _c[2] - _z[2] - _x5[3];
                return [[base - 1, _x5[2], _x5[3], _x5[2], base - 1], [1, _y[2], _y[3], _y[2], 1], [base - 1, _z[2], _z[2], base - 1]];
            } else if (d4 == 2) {
                _x5[2] = Math.floor(d3 / 2);
                _y[2] = d3 - _x5[2];
                _z[2] = D(d1 - _x5[2] - _y[2] - 2, base);
                _c[2] = idiv(_x5[2] + _y[2] + _z[2] + 2 - d1, base);
                if (_c[2] != 2) {
                    _x5[3] = Math.floor((base - _c[2] - _z[2]) / 2);
                    _y[3] = base - _c[2] - _z[2] - _x5[3];
                    return [[base - 1, _x5[2], _x5[3], _x5[2], base - 1], [2, _y[2], _y[3], _y[2], 2], [base - 1, _z[2], _z[2], base - 1]];
                } else {
                    return [[1, 2, base - 2, base - 2, 2, 1], [1, base - 3, 1], [base - 2]];
                }
            } else if (d4 >= 3) {
                _c[4] = idiv(D(d3 - 1, base) + 1 - d3, base);
                _c[1] = 1;
                var _z2 = D(d1 - d3 - 1 + _c[4], base);
                _c[2] = idiv(2 - _c[4] + D(d3 - 1, base) + _z2 - d1, base);
                return [[1, 1 - _c[4], 0, 0, 1 - _c[4], 1], [d4 - 1, D(d3 - 1, base), 2 - _c[2], D(d3 - 1, base), d4 - 1], [base - 2, _z2, base - 2]];
            }
        } else if (D(d0 - d4 + 1, base) == 0 && d3 != 0) {
            if (d4 != base - 1) {
                _x5[1] = Math.floor((base + d4) / 2);
                _y[1] = base + d4 - _x5[1];
                _z[1] = base - 1;
                _c[1] = idiv(_x5[1] + _y[1] + _z[1] - d0, base);
                _x5[2] = Math.floor((d3 - 1) / 2);
                _y[2] = d3 - 1 - _x5[2];
                _z[2] = D(d1 - _x5[2] - _y[2] - _c[1], base);
                _c[2] = idiv(_x5[2] + _y[2] + _z[2] + _c[1] - d1, base);
                _x5[3] = Math.floor((1 + d2 - _c[2]) / 2);
                _y[3] = 1 + d2 - _c[2] - _x5[3];
                return [[_x5[1], _x5[2], _x5[3], _x5[2], _x5[1]], [_y[1], _y[2], _y[3], _y[2], _y[1]], [_z[1], _z[2], _z[1]]];
            } else {
                var _y2 = D(d1 - 3 - 1, base) == base - 1 ? 3 : D(d1 - 3 - 1, base) == base - 2 ? 2 : 1;
                var _x6 = d3 < _y2 ? d3 + base - _y2 : d3 - _y2;
                _c[1] = idiv(3 + _y2 + D(d1 - 3 - _y2, base) - d1, base);
                var mu = 0;
                _c[2] = idiv(_x6 + D(d2 - _x6 - 1 - _c[1] + mu, base) + _c[1] + 1 - d2, base);
                if (_c[2] <= 1) {} else {
                    _c[2] = 1;
                    mu = 1;
                }
                _c[3] = idiv(_x6 + _y2 - d3, base);
                return [[1, 3 - _c[3], _x6 - mu, _x6 - mu, 3 - _c[3], 1], [base - 4, _y2 - _c[2] + mu, D(d2 - _x6 - 1 - _c[1] + mu, base), _y2 - _c[2] + mu, base - 4], [1, D(d1 - 3 - _y2, base) + _c[2] - mu + _c[3], 1]];
            }
        } else if (D(d0 - d4 + 1, base) == 0 && d3 == 0) {
            if (d4 == 0) {
                if (d2 != 0) {
                    var s = n - 1 - Math.pow(base, 5);
                    var ps = sum_of_palindromes(s, base);
                    return [[1, 0, 0, 0, 0, 1]].concat(ps);
                } else if (d1 != 0 && d1 != base - 1) {
                    var _s = n - 1 - Math.pow(base, 5);
                    var _ps2 = sum_of_palindromes(_s, base);
                    return [[1, 0, 0, 0, 0, 1]].concat(_ps2);
                } else if (d1 == 0) {
                    return [[1, 0, 0, 0, 0, 1], [base - 2]];
                } else if (d1 == base - 1) {
                    return [[base - 1, 0, 1, 0, base - 1], [base - 1, base - 2, base - 2, base - 1], [1, 0, 1]];
                }
            } else if (d4 == 1) {
                if (d2 >= 2 || d2 == 1 && d1 >= 2) {
                    var _s2 = n - 1 - base - Math.pow(base, 4) - Math.pow(base, 5);
                    var _ps3 = sum_of_palindromes(_s2, base);
                    return [[1, 1, 0, 0, 1, 1]].concat(_ps3);
                } else if (d2 == 1 && d1 == 0) {
                    return [[1, 0, base - 1, base - 1, 0, 1], [1, base - 1, 1], [base - 2]];
                } else if (d2 == 1 && d1 == 1) {
                    return [[1, 1, 0, 0, 1, 1], [base - 1, base - 1]];
                } else if (d2 == 0 && d1 >= 2) {
                    return [[1, 1, 0, 0, 1, 1], [d1 - 2, d1 - 2], [base - d1 + 1]];
                } else if (d2 == 0 && d1 == 1) {
                    return [[1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [base - 2]];
                } else if (d2 == 0 && d1 == 0) {
                    return [[1, 0, 0, 0, 0, 1], [base - 1, base - 1, base - 1, base - 1]];
                }
            } else if (d4 == 2) {
                if (d2 >= 2 || d2 == 1 && d1 >= 2) {
                    var _s3 = n - 1 - 2 * base - 2 * Math.pow(base, 4) - Math.pow(base, 5);
                    var _ps4 = sum_of_palindromes(_s3, base);
                    return [[1, 2, 0, 0, 2, 1]].concat(_ps4);
                } else if (d2 == 1 && d1 == 0) {
                    return [[1, 1, base - 1, base - 1, 1, 1], [1, base - 2, 1], [base - 1]];
                } else if (d2 == 1 && d1 == 1) {
                    return [[1, 1, base - 1, base - 1, 1, 1], [1, base - 1, 1], [base - 1]];
                } else if (d2 == 0 && d1 == 3) {
                    return [[1, 2, 0, 0, 2, 1], [base - 1], [1]];
                } else if (d2 == 0 && d1 > 3) {
                    return [[1, 2, 0, 0, 2, 1], [d1 - 3, d1 - 3], [base - d1 + 3]];
                } else if (d2 == 0 && d1 == 2) {
                    return [[1, 1, base - 1, base - 1, 1, 1], [1, 0, 1], [base - 1]];
                } else if (d2 == 0 && d1 == 1) {
                    return [[1, 0, 0, 0, 0, 1], [2, 0, 0, 0, 2], [base - 2]];
                } else if (d2 == 0 && d1 == 0) {
                    return [[1, 1, base - 1, base - 1, 1, 1], [base - 2, base - 2], [2]];
                }
            } else if (d4 == 3) {
                var _y3 = D(d1 - 1 - 1, base) == 0 ? 3 : D(d1 - 1 - 1, base) == base - 1 ? 2 : 1;
                _c[1] = idiv(2 + _y3 + D(d1 - 1 - _y3, base), base);
                _c[2] = idiv(base - _y3 - 1 + D(d2 + _y3 + 2, base) + base - 1 - d2, base);
                return [[1, 0, base - _y3 - 1 - _c[1], base - _y3 - 1 - _c[1], 0, 1], [2, _y3 - _c[2] + 1 + _c[1], D(d2 + _y3 + 2, base), _y3 - _c[2] + 1 + _c[1], 2], [base - 1, D(d1 - 1 - _y3, base) + _c[2] - 1 - _c[1], base - 1]];
            } else if (d4 >= 4) {
                var _y4 = D(d1 - 1 - 1, base) == 0 ? 3 : D(d1 - 1 - 1, base) == base - 1 ? 2 : 1;
                _c[1] = idiv(1 + _y4 + D(d1 - 1 - _y4, base) - d1, base);
                _c[2] = idiv(base - _y4 + 1 + D(d2 + _y4 - 1, base) - d2, base);
                return [[1, 2, base - _y4 - _c[1], base - _y4 - _c[1], 2, 1], [d4 - 3, _y4 - _c[2] + _c[1], D(d2 + _y4 - 1, base), _y4 - _c[2] + _c[1], d4 - 3], [1, D(d1 - 2 - _y4, base) + _c[2] - _c[1], 1]];
            }
        }
    }
}

function algorithm_1(m, digits, config, base) {
    console.log('algo 1');
    var l = digits.length;
    var x = [],
        y = [],
        z = [];
    var _ref = [config[0][0], config[1][0], config[2][0]];
    x[1] = _ref[0];
    y[1] = _ref[1];
    z[1] = _ref[2];

    var c = [];
    c[1] = idiv(x[1] + y[1] + z[1], base);
    x[2] = z[1] <= digits[2 * m - 2] - 1 ? D(digits[2 * m - 1] - y[1], base) : D(digits[2 * m - 1] - y[1] - 1, base);
    y[2] = D(digits[2 * m - 2] - z[1] - 1, base);
    z[2] = D(digits[1] - x[2] - y[2] - c[1], base);
    c[2] = idiv(x[2] + y[2] + z[2] + c[1] - digits[1], base);
    for (var i = 3; i <= m; i++) {
        x[i] = z[i - 1] <= digits[2 * m - i] - 1 ? 1 : 0;
        y[i] = D(digits[2 * m - i] - z[i - 1] - 1, base);
        z[i] = D(digits[i - 1] - x[i] - y[i] - c[i - 1], base);
        c[i] = idiv(x[i] + y[i] + z[i] + c[i - 1] - digits[i - 1], base);
    }
    for (var _i = 1; _i <= m; _i++) {
        config[0][_i - 1] = x[_i];
        config[0][2 * m + 1 - _i] = x[_i];
        config[1][_i - 1] = y[_i];
        config[1][2 * m - _i] = y[_i];
        config[2][_i - 1] = z[_i];
        config[2][2 * m - _i - 1] = z[_i];
    }
    if (c[m] == 1) {
        config[0][m] = 0;
    } else if (c[m] == 0) {
        config[0][m] = 1;
    } else if (c[m] == 2) {
        if (z[m] != base - 1) {
            config[1][m] -= 1;
            config[1][m - 1] -= 1;
            config[2][m - 1] += 1;
        } else {
            config[0][m] = 1;
            config[1][m] -= 1;
            config[1][m - 1] -= 1;
            config[2][m - 1] = 0;
        }
    }
    return config;
}

function algorithm_2(digits, config, base) {
    console.log('algo 2');
    var l = digits.length;
    var m = l >> 1;
    var x = [],
        y = [],
        z = [];
    var _ref2 = [config[0][0], config[1][0], config[2][0]];
    x[1] = _ref2[0];
    y[1] = _ref2[1];
    z[1] = _ref2[2];

    var c = [];
    c[1] = idiv(x[1] + y[1] + z[1], base);
    x[2] = z[1] <= digits[2 * m - 3] - 1 ? D(digits[2 * m - 2] - y[1], base) : D(digits[2 * m - 2] - y[1] - 1, base);
    y[2] = D(digits[2 * m - 3] - z[1] - 1, base);
    z[2] = D(digits[1] - x[2] - y[2] - c[1], base);
    c[2] = idiv(x[2] + y[2] + z[2] + c[1] - digits[1], base);
    for (var i = 3; i <= m - 1; i++) {
        x[i] = z[i - 1] <= digits[2 * m - i - 1] - 1 ? 1 : 0;
        y[i] = D(digits[2 * m - i - 1] - z[i - 1] - 1, base);
        z[i] = D(digits[i - 1] - x[i] - y[i] - c[i - 1], base);
        c[i] = idiv(x[i] + y[i] + z[i] + c[i - 1] - digits[i - 1], base);
    }
    x[m] = 0;
    y[m] = D(digits[m - 1] - z[m - 1] - c[m - 1], base);
    c[m] = idiv(x[m] + y[m] + z[m - 1] + c[m - 1] - digits[m - 1], base);

    if (c[m] == 1) {
        // do nothing
    } else if (c[m] == 0) {
        if (y[m] != 0) {
            x[m] = 1;
            y[m] -= 1;
        } else {
            if (y[m - 1] != 0) {
                x[m] = 1;
                y[m] = base - 2;
                y[m - 1] -= 1;
                z[m - 1] += 1;
            } else {
                if (z[m - 1] != 0) {
                    y[m] = 1;
                    y[m - 1] = 1;
                    z[m - 1] -= 1;
                } else {
                    x[m - 1] -= 1;
                    x[m] = 1;
                    y[m] = base - 4;
                    y[m - 1] = base - 1;
                    z[m - 1] = 2;
                }
            }
        }
    } else if (c[m] == 2) {
        x[m] = 1;
        y[m - 1] -= 1;
        y[m] = base - 2;
        z[m - 1] = 0;
    }

    for (var _i2 = 1; _i2 <= m - 1; _i2++) {
        config[0][_i2 - 1] = x[_i2];
        config[0][2 * m - _i2] = x[_i2];
        config[1][_i2 - 1] = y[_i2];
        config[1][2 * m - _i2 - 1] = y[_i2];
        config[2][_i2 - 1] = z[_i2];
        config[2][2 * m - _i2 - 2] = z[_i2];
    }
    config[0][m] = x[m];
    config[0][m - 1] = x[m];
    config[1][m - 1] = y[m];
    return config;
}

function algorithm_3(digits, config, base) {
    console.log('algo 3');
    var l = digits.length;
    var m = l >> 1;
    var x = [],
        y = [],
        z = [];
    var _ref3 = [config[0][1], config[1][0], config[2][0]];
    x[1] = _ref3[0];
    y[1] = _ref3[1];
    z[1] = _ref3[2];

    var c = [];
    c[1] = idiv(1 + y[1] + z[1], base);
    x[2] = z[1] <= digits[2 * m - 3] - 1 ? D(digits[2 * m - 2] - y[1], base) : D(digits[2 * m - 2] - y[1] - 1, base);
    y[2] = D(digits[2 * m - 3] - z[1] - 1, base);
    z[2] = D(digits[1] - x[1] - y[2] - c[1], base);
    c[2] = idiv(x[1] + y[2] + z[2] + c[1] - digits[1], base);
    for (var i = 3; i <= m - 1; i++) {
        x[i] = z[i - 1] <= digits[2 * m - i - 1] - 1 ? 1 : 0;
        y[i] = D(digits[2 * m - i - 1] - z[i - 1] - 1, base);
        z[i] = D(digits[i - 1] - x[i - 1] - y[i] - c[i - 1], base);
        c[i] = idiv(x[i - 1] + y[i] + z[i] + c[i - 1] - digits[i - 1], base);
    }
    x[m] = 0;
    y[m] = D(digits[m - 1] - z[m - 1] - x[m - 1] - c[m - 1], base);
    c[m] = idiv(x[m - 1] + y[m] + z[m - 1] + c[m - 1] - digits[m - 1], base);
    if (c[m] == 1) {
        // do nothing
    } else if (c[m] == 0) {
        x[m] = 1;
    } else if (c[m] == 2) {
        if (y[m - 1] != 0) {
            if (z[m - 1] != base - 1) {
                y[m - 1] -= 1;
                y[m] -= 1;
                z[m - 1] += 1;
            } else {
                x[m] = 1;
                y[m - 1] -= 1;
                z[m - 1] = 0;
            }
        } else {
            if (z[m - 1] != base - 1) {
                x[m - 1] -= 1;
                y[m - 1] = base - 1;
                y[m] -= 1;
                z[m - 1] += 1;
            } else {
                x[m - 1] -= 1;
                x[m] = 1;
                y[m - 1] = base - 1;
                z[m - 1] = 0;
            }
        }
    }
    for (var _i3 = 1; _i3 <= m - 1; _i3++) {
        config[0][_i3] = x[_i3];
        config[0][2 * m - _i3] = x[_i3];
        config[1][_i3 - 1] = y[_i3];
        config[1][2 * m - _i3 - 1] = y[_i3];
        config[2][_i3 - 1] = z[_i3];
        config[2][2 * m - _i3 - 2] = z[_i3];
    }
    config[0][m] = x[m];
    config[1][m - 1] = y[m];
    return config;
}

function algorithm_4(digits, config, base) {
    console.log('algo 4');
    var l = digits.length;
    var m = l >> 1;
    var x = [],
        y = [],
        z = [];
    var _ref4 = [config[0][1], config[1][0], config[2][0]];
    x[1] = _ref4[0];
    y[1] = _ref4[1];
    z[1] = _ref4[2];

    var c = [];
    c[1] = idiv(1 + y[1] + z[1], base);
    x[2] = z[1] <= digits[2 * m - 4] - 1 ? D(digits[2 * m - 3] - y[1], base) : D(digits[2 * m - 3] - y[1] - 1, base);
    y[2] = D(digits[2 * m - 4] - z[1] - 1, base);
    z[2] = D(digits[1] - x[1] - y[2] - c[1], base);
    c[2] = idiv(x[1] + y[2] + z[2] + c[1] - digits[1], base);
    for (var i = 3; i <= m - 2; i++) {
        x[i] = z[i - 1] <= digits[2 * m - i - 2] - 1 ? 1 : 0;
        y[i] = D(digits[2 * m - i - 2] - z[i - 1] - 1, base);
        z[i] = D(digits[i - 1] - x[i - 1] - y[i] - c[i - 1], base);
        c[i] = idiv(x[i - 1] + y[i] + z[i] + c[i - 1] - digits[i - 1], base);
    }
    x[m - 1] = z[m - 2] <= digits[m - 1] - 1 ? 1 : 0;
    y[m - 1] = D(digits[m - 1] - z[m - 2] - 1, base);
    z[m - 1] = D(digits[m - 2] - x[m - 2] - y[m - 1] - c[m - 2], base);
    c[m - 1] = idiv(x[m - 2] + y[m - 1] + z[m - 1] + c[m - 2] - digits[m - 2], base);
    if (x[m - 1] + c[m - 1] == 1) {// IV.1
        // do nothing
    } else if (x[m - 1] + c[m - 1] == 0 && y[m - 1] != base - 1) {
        // IV.2
        if (z[m - 1] != 0) {
            // IV.2.i
            y[m - 1] += 1;
            z[m - 1] -= 1;
        } else if (z[m - 1] == 0 && y[m - 1] != 0) {
            // IV.2.ii
            if (y[m - 1] != 1 && z[m - 2] != base - 1) {
                // IV.2.ii.a
                x[m - 1] = 1;
                y[m - 2] -= 1;
                y[m - 1] -= 1;
                z[m - 2] += 1;
                z[m - 1] += 1;
            } else if (y[m - 1] != 1 && z[m - 2] == base - 1) {
                // IV.2.ii.b
                x[m - 1] = 2;
                y[m - 2] -= 1;
                y[m - 1] -= 2;
                z[m - 2] = 0;
                z[m - 1] = 3;
            } else if (y[m - 1] == 1) {
                // IV.2.ii.c
                x[m - 1] = 1;
                y[m - 2] -= 1;
                y[m - 1] = base - 1;
                z[m - 2] = 0;
                z[m - 1] = 3;
            }
        } else if (z[m - 1] == 0 && y[m - 2] == 0) {
            // IV.2.iii
            if (z[m - 2] != base - 1) {
                // IV.2.iii.a
                x[m - 2] -= 1;
                x[m - 1] = 1;
                y[m - 2] = base - 1;
                y[m - 1] -= 1;
                z[m - 2] += 1;
                z[m - 1] = 1;
            } else if (z[m - 2] == base - 1 && y[m - 1] != 1) {
                // IV.2.iii.b
                x[m - 2] -= 1;
                x[m - 1] = 2;
                y[m - 2] = base - 1;
                y[m - 1] -= 2;
                z[m - 2] = 0;
                z[m - 1] = 3;
            } else if (z[m - 1] == base - 1 && y[m - 1] == 1) {
                // IV.2.iii.c
                x[m - 2] -= 1;
                x[m - 1] = 1;
                y[m - 2] = base - 1;
                y[m - 1] = base - 1;
                z[m - 2] = 0;
                z[m - 1] = 3;
            }
        }
    } else if (x[m - 1] + c[m - 1] == 0 && y[m - 1] == base - 1) {
        // IV.3
        x[m - 1] = 1;
        y[m - 2] -= 1;
        y[m - 1] = base - 2;
        z[m - 2] += 1;
        z[m - 1] = 1;
    } else if (x[m - 1] + c[m - 1] == 2 && x[m - 1] == 0 && c[m - 1] == 2) {
        // IV.4
        if (z[m - 1] != base - 1) {
            // IV.4.i
            y[m - 1] -= 1;
            z[m - 1] += 1;
        } else if (z[m - 1] == base - 1 && z[m - 2] != base - 1) {
            // IV.4.ii
            if (y[m - 2] != 0) {
                // IV.4.ii.a
                x[m - 1] = 1;
                y[m - 2] -= 1;
                y[m - 1] -= 2;
                z[m - 2] += 1;
                z[m - 1] = 1;
            } else if (y[m - 2] == 0) {
                //IV.4.ii.b
                x[m - 2] -= 1;
                x[m - 1] = 1;
                y[m - 2] = base - 2;
                y[m - 1] -= 2;
                z[m - 2] += 1;
                z[m - 1] = 1;
            }
        } else if (z[m - 1] == base - 1 && z[m - 2] == base - 1) {
            // IV.4.iii
            if (y[m - 1] < base - 2) {
                // IV.4.iii.a
                if (y[m - 2] != base - 1) {
                    x[m - 2] -= 1;
                    x[m - 1] = base - 2;
                    y[m - 2] += 1;
                    y[m - 1] += 2;
                    z[m - 2] = base - 2;
                    z[m - 1] = base - 2;
                } else {
                    x[m - 1] = base - 2;
                    y[m - 2] = 0;
                    y[m - 1] += 2;
                    z[m - 2] = base - 2;
                    z[m - 1] = base - 2;
                }
            } else {
                // IV.4.iii.b
                if (y[m - 2] >= 1) {
                    x[m - 1] = 2;
                    y[m - 2] -= 1;
                    y[m - 1] -= 3;
                    z[m - 2] = 0;
                    z[m - 1] = 3;
                } else {
                    x[m - 2] -= 1;
                    x[m - 1] = 2;
                    y[m - 2] = base - 1;
                    y[m - 1] -= 3;
                    z[m - 2] = 0;
                    z[m - 1] = 3;
                }
            }
        }
    } else if (x[m - 1] + c[m - 1] == 2 && x[m - 1] == 1 && c[m - 1] == 1) {
        if (z[m - 1] != base - 1 && y[m - 1] != 0) {
            y[m - 1] -= 1;
            z[m - 1] += 1;
        } else if (z[m - 1] != base - 1 && y[m - 1] == 0) {
            x[m - 1] = 0;
            y[m - 1] = base - 1;
            z[m - 1] += 1;
        } else if (z[m - 1] == base - 1 && z[m - 2] != 0) {
            if (y[m - 2] != base - 1) {
                x[m - 1] = 0;
                y[m - 2] += 1;
                y[m - 1] += 1;
                z[m - 2] -= 1;
                z[m - 1] = base - 2;
            } else if (y[m - 2] == base - 1 && y[m - 1] > 1) {
                x[m - 1] = 2;
                y[m - 2] = base - 2;
                y[m - 1] -= 2;
                z[m - 2] += 1;
                z[m - 1] = 1;
            } else if (y[m - 2] == base - 1 && y[m - 1] == 0) {
                y[m - 2] = base - 2;
                y[m - 1] = base - 2;
                z[m - 2] += 1;
                z[m - 1] = 1;
            } else if (y[m - 2] == base - 1 && y[m - 1] == 1) {
                y[m - 2] = base - 2;
                y[m - 1] = base - 1;
                z[m - 2] += 1;
                z[m - 1] = 1;
            }
        } else if (z[m - 1] == base - 1 && z[m - 2] == 0 && y[m - 2] != 0) {
            if (y[m - 1] > 1) {
                x[m - 1] = 2;
                y[m - 2] -= 1;
                y[m - 1] -= 2;
                z[m - 2] = 1;
                z[m - 1] = 1;
            } else if (y[m - 1] == 0) {
                y[m - 2] -= 1;
                y[m - 1] = base - 2;
                z[m - 2] = 1;
                z[m - 1] = 1;
            } else if (y[m - 1] == 1) {
                y[m - 2] -= 1;
                y[m - 1] = base - 1;
                z[m - 2] = 1;
                z[m - 1] = 1;
            }
        } else if (z[m - 1] == base - 1 && z[m - 2] == 0 && y[m - 2] == 0) {
            if (y[m - 1] > 1) {
                x[m - 2] -= 1;
                x[m - 1] = 2;
                y[m - 2] = base - 1;
                y[m - 1] -= 2;
                z[m - 2] = 1;
                z[m - 1] = 1;
            } else if (y[m - 1] == 0) {
                x[m - 2] -= 1;
                y[m - 2] = base - 1;
                y[m - 1] = base - 2;
                z[m - 2] = 1;
                z[m - 1] = 1;
            } else if (y[m - 1] == 1) {
                x[m - 2] -= 1;
                y[m - 2] = base - 1;
                y[m - 1] = base - 1;
                z[m - 2] = 1;
                z[m - 1] = 1;
            }
        }
    } else if (x[m - 1] + c[m - 1] == 3) {
        y[m - 1] -= 1;
        z[m - 1] = 0;
    }
    for (var _i4 = 1; _i4 <= m - 1; _i4++) {
        config[0][_i4] = x[_i4];
        config[0][2 * m - 1 - _i4] = x[_i4];
        config[1][_i4 - 1] = y[_i4];
        config[1][2 * m - 2 - _i4] = y[_i4];
        config[2][_i4 - 1] = z[_i4];
        config[2][2 * m - 3 - _i4] = z[_i4];
    }
    return config;
}

function algorithm_5(digits, config, base) {
    console.log('algo 5');
    var l = digits.length;
    var m = l >> 1;
    var s = [];
    for (var i = 0; i < l; i++) {
        s[i] = 0;
    }
    s[m] = 1;
    s[m - 1] = 1;
    var digits2 = big_sub(digits, s, base);
    if (digits2[m - 1] == 0 || digits2[m] == 0) {
        s[m] = 2;
        s[m - 1] = 2;
        digits2 = big_sub(digits, s, base);
    }
    var ps = decide_type(digits2, base);
    ps[0][m - 1] += s[m - 1];
    ps[0][m] += s[m];

    return ps;
}

function decide_type(digits) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    var l = digits.length;
    var odd = l % 2 == 1;
    var m = l >> 1;
    var special = !odd && (digits[m - 1] == 0 || digits[m] == 0);
    var config = [[undefined, undefined], [undefined], []];
    var _ref5 = [digits[l - 1], digits[l - 2], digits[l - 3]],
        dl1 = _ref5[0],
        dl2 = _ref5[1],
        dl3 = _ref5[2];

    var d0 = digits[0];
    var z1 = void 0;
    if (dl2 > 2 && D(d0 - dl1 - dl2 + 1, base) != 0) {
        // A1
        console.log('A1');
        config[0][l - 1] = dl1;
        config[0][0] = dl1;
        config[1][l - 2] = dl2 - 1;
        config[1][0] = dl2 - 1;
        z1 = D(d0 - dl1 - dl2 + 1, base);
        config[2][0] = z1;
        config[2][l - 3] = z1;
        if (odd) {
            return algorithm_1(m, digits, config, base);
        } else if (!special) {
            return algorithm_2(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl2 > 2 && D(d0 - dl1 - dl2 + 1, base) == 0) {
        // A2
        console.log('A2');
        config[0][l - 1] = dl1;
        config[0][0] = dl1;
        config[1][l - 2] = dl2 - 2;
        config[1][0] = dl2 - 2;
        config[2][0] = 1;
        config[2][l - 3] = 1;
        if (odd) {
            return algorithm_1(m, digits, config, base);
        } else if (!special) {
            return algorithm_2(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl2 <= 2 && dl1 != 1 && D(d0 - dl1 + 2, base) != 0) {
        // A3
        console.log('A3');
        config[0][l - 1] = dl1 - 1;
        config[0][0] = dl1 - 1;
        config[1][l - 2] = base - 1;
        config[1][0] = base - 1;
        z1 = D(d0 - dl1 + 2, base);
        config[2][0] = z1;
        config[2][l - 3] = z1;
        if (odd) {
            return algorithm_1(m, digits, config, base);
        } else if (!special) {
            return algorithm_2(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl2 <= 2 && dl1 != 1 && D(d0 - dl1 + 2, base) == 0) {
        // A4
        console.log('A4');
        config[0][l - 1] = dl1 - 1;
        config[0][0] = dl1 - 1;
        config[1][l - 2] = base - 2;
        config[1][0] = base - 2;
        config[2][0] = 1;
        config[2][l - 3] = 1;
        if (odd) {
            return algorithm_1(m, digits, config, base);
        } else if (!special) {
            return algorithm_2(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && dl2 == 0 && dl3 <= 3 && D(d0 - dl3, base) != 0) {
        // A5
        console.log('A5');
        config[0][l - 2] = base - 1;
        config[0][0] = base - 1;
        config[1][l - 3] = dl3 + 1;
        config[1][0] = dl3 + 1;
        z1 = D(d0 - dl3, base);
        config[2][0] = z1;
        config[2][l - 4] = z1;
        if (!odd) {
            return algorithm_1(m - 1, digits, config, base);
        } else if (!special) {
            return algorithm_2(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && dl2 == 0 && dl3 <= 2 && D(d0 - dl3, base) == 0) {
        // A6
        console.log('A6');
        config[0][l - 2] = base - 1;
        config[0][0] = base - 1;
        config[1][l - 3] = dl3 + 2;
        config[1][0] = dl3 + 2;
        config[2][0] = base - 1;
        config[2][l - 4] = base - 1;
        if (!odd) {
            return algorithm_1(m - 1, digits, config, base);
        } else if (!special) {
            return algorithm_2(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && dl2 <= 2 && dl3 >= 4 && D(d0 - dl3, base) != 0) {
        // B1
        console.log('B1');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l - 3] = dl3 - 1;
        config[1][0] = dl3 - 1;
        z1 = D(d0 - dl3, base);
        config[2][l - 4] = z1;
        config[2][0] = z1;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && dl2 <= 2 && dl3 >= 3 && D(d0 - dl3, base) == 0) {
        // B2
        console.log('B2');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l - 3] = dl3 - 2;
        config[1][0] = dl3 - 2;
        config[2][l - 4] = 1;
        config[2][0] = 1;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && (dl2 == 1 || dl2 == 2) && (dl3 == 0 || dl3 == 1) && d0 == 0) {
        // B3
        console.log('B3');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2 - 1;
        config[0][1] = dl2 - 1;
        config[0][0] = 1;
        config[1][l - 3] = base - 2;
        config[1][0] = base - 2;
        config[2][l - 4] = 1;
        config[2][0] = 1;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && (dl2 == 1 || dl2 == 2) && (dl3 == 2 || dl3 == 3) && d0 == 0) {
        // B4
        console.log('B4');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l - 3] = 1;
        config[1][0] = 1;
        config[2][l - 4] = base - 2;
        config[2][0] = base - 2;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && (dl2 == 1 || dl2 == 2) && dl3 <= 2 && d0 != 0) {
        // B5
        console.log('B5');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2 - 1;
        config[0][1] = dl2 - 1;
        config[0][0] = 1;
        config[1][l - 3] = base - 1;
        config[1][0] = base - 1;
        config[2][l - 4] = d0;
        config[2][0] = d0;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && (dl2 == 1 || dl2 == 2) && dl3 == 3 && D(d0 - 3, base) != 0) {
        // B6
        console.log('B6');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l - 3] = 2;
        config[1][0] = 2;
        z1 = D(d0 - 3, base);
        config[2][l - 4] = z1;
        config[2][0] = z1;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    } else if (dl1 == 1 && (dl2 == 1 || dl2 == 2) && dl3 == 3 && d0 == 3) {
        // B7
        console.log('B7');
        config[0][l - 1] = 1;
        config[0][l - 2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l - 3] = 1;
        config[1][0] = 1;
        config[2][l - 4] = 1;
        config[2][0] = 1;
        if (odd) {
            return algorithm_3(digits, config, base);
        } else if (!special) {
            return algorithm_4(digits, config, base);
        } else {
            return algorithm_5(digits, config, base);
        }
    }
}

function sum_of_palindromes(n) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    if (base < 5) {
        throw new Error("This trick only works for base ≥ 5");
    }
    var digits = digits_of(n).reverse();
    if (is_palindrome(digits)) {
        return [digits];
    }
    switch (digits.length) {
        case 1:
            return [digits];
        case 2:
            return sum_two_digits(parseInt(n), digits, base);
        case 3:
            return sum_three_digits(parseInt(n), digits, base);
        case 4:
            return sum_four_digits(parseInt(n), digits, base);
        case 5:
            return sum_five_digits(parseInt(n), digits, base);
        case 6:
            return sum_six_digits(parseInt(n), digits, base);
        default:
            return decide_type(digits, base);
    }
}

function test(n) {
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

    try {
        var palindromes = sum_of_palindromes(n, base);
        if (!palindromes.every(is_palindrome)) {
            console.log(palindromes);
            throw new Error("Not every number is a palindrome");
        }
        var digits = digits_of(n, base).reverse();
        var t = big_sum(palindromes);
        for (var i = 0; i < digits.length; i++) {
            if (digits[i] != t[i]) {
                console.log('total', t);
                throw new Error("Doesn't sum to the same thing");
            }
        }
    } catch (e) {
        console.error('n:', n);
        console.error(e);
        console.log(e.stack);
        throw e;
    }
    return true;
}
