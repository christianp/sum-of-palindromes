let debugging = {active: true};
function debug() {
    if(debugging) {
        console.log(...arguments);
    }
}

function digits_of(n) {
    return (n+'').replace(/^0*(.+)/,'$1').split('').map(d=>parseInt(d));
}

function big_sum(ns,base=10) {
    let carry = 0;
    let out = [];
    for(let i=0;ns.some(n=>i<n.length);i++) {
        for(let n of ns) {
            carry += n[i] || 0;
        }
        const r = carry % base;
        out[i] = r;
        carry = idiv(carry,base);
    }
    if(carry) {
        out.push(carry);
    }
    return out;
}

function big_sub(a,b,base) {
    a = a.slice();
    for(let i=0;i<a.length;i++) {
        a[i] -= (b[i] || 0);
        while(a[i]<0) {
            a[i] += base;
            a[i+1] -= 1;
        }
    }
    while(a.length && a[a.length-1]==0) {
        a.pop();
    }
    return a;
}

function D(n,base) {
    debug(`D(${n})`);
    if(arguments.length<2) {
        throw(new Error("forgot to give base to D"));
    }
    n = n % base;
    if(n<0) {
        n += base;
    }
    return n;
}
function idiv(a,b) {
    if(arguments.length<2) {
        throw(new Error("forgot to give b to idiv"));
    }
    a -= (a%b);
    return a/b;
}

function is_palindrome(digits) {
    for(let i=0;i<digits.length/2;i++) {
        if(digits[i]!=digits[digits.length-1-i]) {
            return false;
        }
    }
    return true;
}

function digits_to_int(digits,base=10) {
    return parseInt(digits.map(x=>x+'').join(''),base);
}
function remove_leading_zeros(digits) {
    let i = 0;
    for(;digits[i]==0 && i<digits.length-1;i++) {
    }
    return digits.slice(i);
}
function f(digitses,base=10) {
    return digitses;
}

function sum_two_digits(n,digits,base) {
    const [d0,d1] = digits;
    if(d1==d0) {
        return f([digits]);
    } else if(d1<=d0) {
        return f([[d1,d1],[d0-d1]]);
    } else if(d1>d0+1) {
        return f([[d1-1,d1-1], [base+d0-d1+1]]);
    } else {
        return f([[d0,d0],[base-1],[1]]);
    }
}
function sum_three_digits(n,digits,base) {
    const [d0,d1,d2] = digits;
    if(d2<=d0) {
        return f([[d2,d1,d2],[d0-d2]]);
    } else if(d1!=0) {
        return f([[d2,d1-1,d2],[base+d0-d2]]);
    } else if(D(d2-d0-1,base)!=0) {
        return f([[d2-1,base-1,d2-1],[base+d0-d2+1]]);
    } else {
        if(d2>=3) {
            return f([[d2-2,base-1,d2-2],[1,1,1]]);
        } else if(d2==2) {
            return f([[1,0,1],[base-1,base-1],[1]]);
        } else {
            return f([[base-1,base-1],[1]]);
        }
    }
}

function sum_four_digits(n,digits,base) {
    const [d0,d1,d2,d3] = digits;
    if(n >= d3*base**3 + d3) {
        const m = n - d3*base**3 - d3;
        const d = D(m,base);
        if(m==2*base**2+1) {
            switch(d3) {
                case 1:
                    return f([[1,1,1,1],[base-2,base-2],[3]]);
                case base-1:
                    return f([[base-1,1,1,base-1],[base-2,base-2],[3]]);
                default:
                    return f([[d3-1,base-1,base-1,d3-1],[2,1,2]]);
            }
        } else if(d>=1 && d<=base-2 && m==(d+1)*base+d) {
            if(d3+d==d0) {
                if(d3!=1) {
                    return f([[d3-1,base-2,base-2,d3-1],[1,3,1],[d,d]]);
                } else {
                    return f([[base-1,base-1,base-1],[d+1,d+1],[1]]);
                }
            } else {
                return f([[d3-1,base-2,base-2,d3-1],[1,3,1],[d,d]]);
            }
        } else if(d2==0 && d1==0 && d0<=d3-1 && d3!=1) {
            return f([[d3-1,base-1,base-1,d3-1],[base+d0-d3],[1]]);
        } else if(d3==1 && d2==0 && d1==0 && d0==0) {
            return f([[base-1,base-1,base-1],[1]]);
        } else {
            const ps = sum_of_palindromes(m,base)
            return f([[d3,0,0,d3]]).concat(ps);
        }
    } else if(d0<=d3-1 && d3!=1) {
        return [
            [d3-1,base-1,base-1,d3-1],
            [base+d0-d3],
            [1]
        ];
    } else {
        return [
            [base-1,base-1,base-1],
            [1]
        ];
    }
}

function sum_five_digits(n,digits,base) {
    const [d0,d1,d2,d3,d4] = digits;
    if(d4!=1) {
        return main_algorithm(digits,base);
    }
    const r = digits_to_int([1,d3,0,d3,1],base);
    const m = n - r;
    const d = D(m,base);
    const r2 = digits_to_int([1,d3-1,base-1,d3-1,1],base);
    const m2 = n-r2;
    const dd = D(m2,base);
    if(n >= r && m!=digits_to_int([2,0,1],base) && (d==0 || d==base-1 || m!=(d+1)*base+d)) {
            const ps = sum_of_palindromes(m,base);
            return [[1,d3,0,d3,1]].concat(ps);
    } else if(n>=r && m==digits_to_int([2,0,1],base)) {
        return f([[1,d3,1,d3,1],[1,0,1]]);
    } else if(n>=r && m==(d+1)*base+d && d>=1 && d<=base-2 && d3!=0) {
        if(d+1+d3<=base-1) {
            return f([[1,d3-1,1,d3-1,1],[base-1,d+1,base-1],[d+1]]);
        } else if(d3+1+d==base+d1) {
            return f([[1,d3-1,1,d3-1,1],[base-1,d+1,base-1],[d+1]]);
        }
    } else if(n>=r && m==(d+1)*base+d && d>=1 && d<=base-2 && d3==0) {
        return f([[base-1,base-1,base-1,base-1],[d+1,d+1],[1]]);
    } else if(n<r && d3==0) {
        return f([[base-1,base-1,base-1,base-1],[1]]);
    } else if(n<r && d3!=0 && m2!=digits_to_int([2,0,1],base) && (d==0 || d==base-1 || m2!=(dd+1)*base+dd)) {
        const ps = sum_of_palindromes(m2,base);
        return [[1,d3-1,base-1,d3-1,1]].concat(ps);
    } else {
        return [
            [1,d3-1,base-2,d3-1,1],
            [1,d+1,1],
            [d-1]
        ];
    }
}

function sum_six_digits(n,digits,base=10) {
    const [d0,d1,d2,d3,d4,d5] = digits;
    if(d5!=1) {
        const l = 6;
        const m = 3;
        const {type, config} = decide_type(digits,base);
        const [x,y,z] = [[],[],[]];
        [x[1],y[1],z[1]] = [config[0][0],config[1][0],config[2][0]];
        const c = [];
        c[1] = idiv(x[1]+y[1]+z[1], base);
        x[2] = z[1] <= digits[2*m-3]-1 ? D(digits[2*m-2]-y[1], base) : D(digits[2*m-2]-y[1]-1, base);
        y[2] = D(digits[2*m-3]-z[1]-1, base);
        z[2] = D(digits[1] - x[2] - y[2] - c[1], base);
        c[2] = idiv(x[2] + y[2] + z[2] + c[1] - digits[1], base);
        for(let i=3;i<=m-1;i++) {
            x[i] = z[i-1]<=digits[2*m-i-1]-1 ? 1 : 0;
            y[i] = D(digits[2*m-i-1] -z[i-1] - 1, base);
            z[i] = D(digits[i-1] - x[i] - y[i] - c[i-1], base);
            c[i] = idiv(x[i] + y[i] + z[i] + c[i-1] - digits[i-1], base);
        }
        x[m] = 0;
        y[m] = D(digits[m-1]-z[m-1] - c[m-1],base);
        c[m] = idiv(x[m] + y[m] + z[m-1] + c[m-1] - digits[m-1], base);
        
        if(c[m]==1) {
            // do nothing
        } else if(c[m]==0) {
            if(y[m]!=0) {
                x[m] = 1;
                y[m] -= 1;
            } else {
                if(y[m-1]!=0) {
                    x[m] = 1;
                    y[m] = base-2;
                    y[m-1] -= 1;
                    z[m-1] += 1;
                } else {
                    if(z[m-1]!=0) {
                        y[m] = 1;
                        y[m-1] = 1;
                        z[m-1] -= 1;
                    } else {
                        if(x[2]!=0) {
                            x[2] -= 1;
                            x[3] = base-1;
                            y[2] = 1;
                            y[3] = 1;
                        } else if(x[1]==1) {
                            return [
                                [2,0,0,0,0,2],
                                [1,1],
                                [base-4]
                            ];
                        } else if(x[1] != 1 && y[1]!=base-1) {
                            return [
                                [x[1]-1, base-1, 0, 0, base-1, x[1]-1],
                                [y[1]+1, 0, base-2, 0, y[1]+1],
                                [z[1],1,1,z[1]]
                            ];
                        } else if(x[1]!=base-1 && z[1] == base-1 && y[1] == base-1) {
                            return [
                                [x[1]+1,0,0,0,0,x[1]+1],
                                [1,1],
                                [base-4]
                            ];
                        }
                    }
                }
            }
        } else if(c[m]==2) {
            x[m] = 1;
            y[m-1] -= 1;
            y[m] = base-2;
            z[m-1] = 0;
        }
        return [
            [x[1],x[2],x[3],x[3],x[2],x[1]],
            [y[1],y[2],y[3],y[2],y[1]],
            [z[1],z[2],z[2],z[1]]
        ];

    } else {
        const [x,y,z] = [[],[],[]];
        const c = [];
        if(D(d0-d4+1,base)!=0 && D(d0-d4+2,base)!=0) {
            x[1] = Math.floor((base+d4-1)/2);
            y[1] = base+d4-1-x[1];
            z[1] = D(d0-d4+1,base);
            c[1] = idiv(x[1]+y[1]+z[1]-d0,base);
            x[2] = Math.floor((base+d3-1)/2);
            y[2] = base+d3-1-x[2];
            z[2] = D(d1-x[2]-y[2]-c[1],base);
            c[2] = idiv(x[2]+y[2]+z[2]+c[1]-digits[1],base);
            x[3] = Math.floor((base+d2-c[2]-z[1])/2);
            y[3] = base+d2-c[2]-z[1]-x[3];
            return [
                [x[1],x[2],x[3],x[2],x[1]],
                [y[1],y[2],y[3],y[2],y[1]],
                [z[1],z[2],z[1]]
            ];
        } else if(D(d0-d4+2,base)==0 && d2!=0) {
            x[1] = Math.floor((base+d4-1)/2);
            y[1] = base+d4-1-x[1];
            z[1] = base-1;
            c[1] = idiv(x[1]+y[1]+z[1]-d0,base);
            x[2] = Math.floor((base+d3-1)/2);
            y[2] = base+d3-1 - x[2];
            z[2] = D(d1-x[2]-y[2]-c[1],base);
            c[2] = idiv(x[2]+y[2]+z[2]+c[1]-digits[1],base);
            x[3] = Math.floor((1+d2-c[2])/2);
            y[3] = 1+d2-c[2]-x[3];
            return [
                [x[1],x[2],x[3],x[2],x[1]],
                [y[1],y[2],y[3],y[2],y[1]],
                [z[1],z[2],z[1]]
            ];
        } else if(D(d0-d4+2,base)==0 && d2==0) {
            if(d4==0) {
                x[2] = Math.floor(d3/2);
                y[2] = d3-x[2];
                z[2] = D(d1-x[2]-y[2]-1,base);
                c[2] = idiv(x[2]+y[2]+z[2]+1-d1,base);
                x[3] = Math.floor((base-c[2]-z[2])/2);
                y[3] = base-c[2]-z[2]-x[3];
                return [
                    [base-2,x[2],x[3],x[2],base-2],
                    [1,y[2],y[3],y[2],1],
                    [base-1,z[2],z[2],base-1]
                ];
            } else if(d4==1) {
                x[2] = Math.floor(d3/2);
                y[2] = d3-x[2];
                z[2] = D(d1-x[2]-y[2]-1,base);
                c[2] = idiv(x[2]+y[2]+z[2]+1-d1,base);
                x[3] = Math.floor((base-c[2]-z[2])/2);
                y[3] = base-c[2]-z[2]-x[3];
                return [
                    [base-1,x[2],x[3],x[2],base-1],
                    [1,y[2],y[3],y[2],1],
                    [base-1,z[2],z[2],base-1]
                ];
            } else if(d4==2) {
                x[2] = Math.floor(d3/2);
                y[2] = d3-x[2];
                z[2] = D(d1-x[2]-y[2]-2,base);
                c[2] = idiv(x[2]+y[2]+z[2]+2-d1,base);
                if(c[2]!=2) {
                    x[3] = Math.floor((base-c[2]-z[2])/2);
                    y[3] = base-c[2]-z[2]-x[3];
                    return [
                        [base-1,x[2],x[3],x[2],base-1],
                        [2,y[2],y[3],y[2],2],
                        [base-1,z[2],z[2],base-1]
                    ];
                } else {
                    return [
                        [1,2,base-2,base-2,2,1],
                        [1,base-3,1],
                        [base-2]
                    ];
                }
            } else if(d4>=3) {
                c[4] = idiv(D(d3-1,base)+1-d3,base);
                c[1] = 1;
                const z = D(d1-d3-1+c[4],base);
                c[2] = idiv(2-c[4]+D(d3-1,base)+z-d1,base);
                return [
                    [1,1-c[4],0,0,1-c[4],1],
                    [d4-1,D(d3-1,base),2-c[2],D(d3-1,base),d4-1],
                    [base-2,z,base-2]
                ];
            }
        } else if(D(d0-d4+1,base)==0 && d3!=0) {
            if(d4!=base-1) {
                x[1] = Math.floor((base+d4)/2);
                y[1] = base+d4-x[1];
                z[1] = base-1;
                c[1] = idiv(x[1]+y[1]+z[1]-d0,base);
                x[2] = Math.floor((d3-1)/2);
                y[2] = d3-1-x[2];
                z[2] = D(d1-x[2]-y[2]-c[1],base);
                c[2] = idiv(x[2]+y[2]+z[2]+c[1]-d1,base);
                x[3] = Math.floor((1+d2-c[2])/2);
                y[3] = 1+d2-c[2]-x[3];
                return [
                    [x[1],x[2],x[3],x[2],x[1]],
                    [y[1],y[2],y[3],y[2],y[1]],
                    [z[1],z[2],z[1]]
                ];
            } else {
                const y = D(d1-3-1,base)==base-1 ? 3 : D(d1-3-1,base)==base-2 ? 2 : 1;
                const x = d3<y ? d3+base-y : d3-y;
                c[1] = idiv(3+y+D(d1-3-y,base)-d1,base);
                let mu = 0;
                c[2] = idiv(x+D(d2-x-1-c[1]+mu,base)+c[1]+1-d2,base);
                if(c[2]<=1) {
                } else {
                    c[2] = 1;
                    mu = 1;
                }
                c[3] = idiv(x+y-d3,base);
                return [
                    [1,3-c[3],x-mu,x-mu,3-c[3],1],
                    [base-4,y-c[2]+mu,D(d2-x-1-c[1]+mu,base),y-c[2]+mu,base-4],
                    [1,D(d1-3-y,base)+c[2]-mu+c[3],1]
                ];
            }
        } else if(D(d0-d4+1,base)==0 && d3==0) {
            if(d4==0) {
                if(d2!=0) {
                    const s = n-1-base**5;
                    const ps = sum_of_palindromes(s,base);
                    return [[1,0,0,0,0,1]].concat(ps);
                } else if(d1!=0 && d1!=base-1) {
                    const s = n-1-base**5;
                    const ps = sum_of_palindromes(s,base);
                    return [[1,0,0,0,0,1]].concat(ps);
                } else if(d1==0) {
                    return [
                        [1,0,0,0,0,1],
                        [base-2]
                    ];
                } else if(d1==base-1) {
                    return [
                        [base-1,0,1,0,base-1],
                        [base-1,base-2,base-2,base-1],
                        [1,0,1]
                    ];
                }
            } else if(d4==1) {
                if(d2>=2 || (d2==1 && d1>=2)) {
                    const s = n-1-base-base**4-base**5;
                    const ps = sum_of_palindromes(s,base);
                    return [[1,1,0,0,1,1]].concat(ps);
                } else if(d2==1 && d1==0) {
                    return [
                        [1,0,base-1,base-1,0,1],
                        [1,base-1,1],
                        [base-2]
                    ];
                } else if(d2==1 && d1==1) {
                    return [
                        [1,1,0,0,1,1],
                        [base-1,base-1]
                    ];
                } else if(d2==0 && d1>=2) {
                    return [
                        [1,1,0,0,1,1],
                        [d1-2,d1-2],
                        [base-d1+1]
                    ];
                } else if(d2==0 && d1==1) {
                    return [
                        [1,0,0,0,0,1],
                        [1,0,0,0,1],
                        [base-2]
                    ];
                } else if(d2==0 && d1==0) {
                    return [
                        [1,0,0,0,0,1],
                        [base-1,base-1,base-1,base-1]
                    ];
                }
            } else if(d4==2) {
                if(d2>=2 || (d2==1 && d1>=2)) {
                    const s = n-1-2*base-2*base**4-base**5;
                    const ps = sum_of_palindromes(s,base);
                    return [[1,2,0,0,2,1]].concat(ps);
                } else if(d2==1 && d1==0) {
                    return [
                        [1,1,base-1,base-1,1,1],
                        [1,base-2,1],
                        [base-1]
                    ];
                } else if(d2==1 && d1==1) {
                    return [
                        [1,1,base-1,base-1,1,1],
                        [1,base-1,1],
                        [base-1]
                    ];
                } else if(d2==0 && d1==3) {
                    return [
                        [1,2,0,0,2,1],
                        [base-1],
                        [1]
                    ];
                } else if(d2==0 && d1>3) {
                    return [
                        [1,2,0,0,2,1],
                        [d1-3,d1-3],
                        [base-d1+3]
                    ];
                } else if(d2==0 && d1==2) {
                    return [
                        [1,1,base-1,base-1,1,1],
                        [1,0,1],
                        [base-1]
                    ];
                } else if(d2==0 && d1==1) {
                    return [
                        [1,0,0,0,0,1],
                        [2,0,0,0,2],
                        [base-2]
                    ];
                } else if(d2==0 && d1==0) {
                    return [
                        [1,1,base-1,base-1,1,1],
                        [base-2,base-2],
                        [2]
                    ];
                }
            } else if(d4==3) {
                const y = D(d1-1-1,base)==0 ? 3 : D(d1-1-1,base)==base-1 ? 2 : 1;
                c[1] = idiv(2+y+D(d1-1-y,base)-d1,base);
                c[2] = idiv(base-y-1+D(d2+y+2,base)+base-1-d2,base);
                return [
                    [1,0,base-y-1-c[1],base-y-1-c[1],0,1],
                    [2,y-c[2]+1+c[1],D(d2+y+2,base),y-c[2]+1+c[1],2],
                    [base-1,D(d1-1-y,base)+c[2]-1-c[1],base-1]
                ];
            } else if(d4>=4) {
                const y = D(d1-1-1,base)==0 ? 3 : D(d1-1-1,base)==base-1 ? 2 : 1;
                c[1] = idiv(1+y+D(d1-1-y,base)-d1,base);
                c[2] = idiv(base-y+1+D(d2+y-1,base)-d2,base);
                return [
                    [1,2,base-y-c[1],base-y-c[1],2,1],
                    [d4-3,y-c[2]+c[1],D(d2+y-1,base),y-c[2]+c[1],d4-3],
                    [1,D(d1-2-y,base)+c[2]-c[1],1]
                ];
            }
        }
    }
}

function algorithm_1(m,digits,config,base) {
    debug('Algorithm I');
    const l = digits.length;
    const [x,y,z] = [[],[],[]];
    [x[1],y[1],z[1]] = [config[0][0],config[1][0],config[2][0]];
    const c = [];
    c[1] = idiv(x[1]+y[1]+z[1], base);
    x[2] = z[1] <= digits[2*m-2]-1 ? D(digits[2*m-1]-y[1], base) : D(digits[2*m-1]-y[1]-1, base);
    y[2] = D(digits[2*m-2]-z[1]-1, base);
    z[2] = D(digits[1] - x[2] - y[2] - c[1], base);
    c[2] = idiv(x[2] + y[2] + z[2] + c[1] - digits[1], base);
    for(let i=3;i<=m;i++) {
        x[i] = z[i-1]<=digits[2*m-i]-1 ? 1 : 0;
        y[i] = D(digits[2*m-i] -z[i-1] -1, base);
        z[i] = D(digits[i-1] - x[i] - y[i] - c[i-1], base);
        c[i] = idiv(x[i] + y[i] + z[i] + c[i-1] - digits[i-1], base);
    }
    x[m+1] = 0;
    if(c[m]==1) {
        // do nothing;
    } else if(c[m]==0) {
        x[m+1] = 1;
    } else if(c[m]==2) {
        if(z[m]!=base-1) {
            y[m] -= 1;
            z[m] += 1;
        } else {
            x[m+1] = 1;
            y[m] -= 1;
            z[m] = 0;
        }
    }
    for(let i=1;i<=m;i++) {
        config[0][i-1] = x[i];
        config[0][2*m+1-i] = x[i];
        config[1][i-1] = y[i];
        config[1][2*m-i] = y[i];
        config[2][i-1] = z[i];
        config[2][2*m-i-1] = z[i];
    }
    config[0][m] = x[m+1];
    return config;
}

function algorithm_2(digits,config,base) {
    debug('Algorithm II');
    const l = digits.length;
    const m = l >> 1;
    const [x,y,z] = [[],[],[]];
    [x[1],y[1],z[1]] = [config[0][0],config[1][0],config[2][0]];
    const c = [];
    c[1] = idiv(x[1]+y[1]+z[1], base);
    x[2] = z[1] <= digits[2*m-3]-1 ? D(digits[2*m-2]-y[1], base) : D(digits[2*m-2]-y[1]-1, base);
    y[2] = D(digits[2*m-3]-z[1]-1, base);
    z[2] = D(digits[1] - x[2] - y[2] - c[1], base);
    c[2] = idiv(x[2] + y[2] + z[2] + c[1] - digits[1], base);
    for(let i=3;i<=m-1;i++) {
        x[i] = z[i-1]<=digits[2*m-i-1]-1 ? 1 : 0;
        y[i] = D(digits[2*m-i-1] -z[i-1] - 1, base);
        z[i] = D(digits[i-1] - x[i] - y[i] - c[i-1], base);
        c[i] = idiv(x[i] + y[i] + z[i] + c[i-1] - digits[i-1], base);
    }
    x[m] = 0;
    y[m] = D(digits[m-1]-z[m-1] - c[m-1],base);
    c[m] = idiv(x[m] + y[m] + z[m-1] + c[m-1] - digits[m-1], base);

    if(c[m]==1) {   // II.1
        // do nothing
    } else if(c[m]==0) {    // II.2
        if(y[m]!=0) {   // II.2.i
            x[m] = 1;
            y[m] -= 1;
        } else {    // II.2.ii
            if(y[m-1]!=0) { // II.2.ii.a
                x[m] = 1;
                y[m] = base-2;
                y[m-1] -= 1;
                z[m-1] += 1;
            } else if(y[m-1]==0 && z[m-1]!=0) { // II.2.ii.b
                y[m] = 1;
                y[m-1] = 1;
                z[m-1] -= 1;
            } else if(y[m-1]==0 && z[m-1]==0) { // II.2.ii.c
                x[m-1] -= 1;
                x[m] = 1;
                y[m] = base-4;
                y[m-1] = base-1;
                z[m-1] = 2;
            }
        }
    } else if(c[m]==2) {    // II.3
        x[m] = 1;
        y[m-1] -= 1;
        y[m] = base-2;
        z[m-1] = 0;
    }

    for(let i=1;i<=m-1;i++) {
        config[0][i-1] = x[i];
        config[0][2*m-i] = x[i];
        config[1][i-1] = y[i];
        config[1][2*m-i-1] = y[i];
        config[2][i-1] = z[i];
        config[2][2*m-i-2] = z[i];
    }
    config[0][m] = x[m];
    config[0][m-1] = x[m];
    config[1][m-1] = y[m];
    return config;
}

function algorithm_3(digits,config,base) {
    debug('Algorithm III');
    const l = digits.length;
    const m = l >> 1;
    const [x,y,z] = [[],[],[]];
    [x[1],y[1],z[1]] = [config[0][1],config[1][0],config[2][0]];
    const c = [];
    c[1] = idiv(1+y[1]+z[1], base);
    x[2] = z[1]<=digits[2*m-3]-1 ? D(digits[2*m-2]-y[1],base) : D(digits[2*m-2]-y[1]-1,base);
    y[2] = D(digits[2*m-3]-z[1]-1,base);
    z[2] = D(digits[1]-x[1]-y[2]-c[1],base);
    c[2] = idiv(x[1]+y[2]+z[2]+c[1]-digits[1],base);
    for(let i=3;i<=m-1;i++) {
        x[i] = z[i-1]<=digits[2*m-i-1]-1 ? 1 : 0;
        y[i] = D(digits[2*m-i-1]-z[i-1]-1,base);
        z[i] = D(digits[i-1]-x[i-1]-y[i]-c[i-1],base);
        c[i] = idiv(x[i-1]+y[i]+z[i]+c[i-1]-digits[i-1], base);
    }
    x[m] = 0;
    y[m] = D(digits[m-1]-z[m-1]-x[m-1]-c[m-1],base);
    c[m] = idiv(x[m-1] + y[m] + z[m-1] + c[m-1] - digits[m-1], base);
    if(c[m]==1) {
        // do nothing
    } else if(c[m]==0) {
        x[m] = 1;
    } else if(c[m]==2) {
        if(y[m-1]!=0) {
            if(z[m-1]!=base-1) {
                y[m-1] -= 1;
                y[m] -= 1;
                z[m-1] += 1;
            } else {
                x[m] = 1;
                y[m-1] -= 1;
                z[m-1] = 0;
            }
        } else {
            if(z[m-1]!=base-1) {
                x[m-1] -= 1;
                y[m-1] = base-1;
                y[m] -= 1;
                z[m-1] += 1;
            } else {
                x[m-1] -= 1;
                x[m] = 1;
                y[m-1] = base-1;
                z[m-1] = 0;
            }
        }
    }
    for(let i=1;i<=m-1;i++) {
        config[0][i] = x[i];
        config[0][2*m-i] = x[i];
        config[1][i-1] = y[i];
        config[1][2*m-i-1] = y[i];
        config[2][i-1] = z[i];
        config[2][2*m-i-2] = z[i];
    }
    config[0][m] = x[m];
    config[1][m-1] = y[m];
    return config;
}

function algorithm_4(digits,config,base) {
    debug('Algorithm IV');
    const l = digits.length;
    const m = l >> 1;
    const [x,y,z] = [[],[],[]];
    [x[1],y[1],z[1]] = [config[0][1],config[1][0],config[2][0]];
    const c = [];
    c[1] = idiv(1+y[1]+z[1], base);
    debug('c1',c[1]);
    x[2] = z[1] <= digits[2*m-4]-1 ? D(digits[2*m-3]-y[1],base) : D(digits[2*m-3]-y[1]-1,base);
    y[2] = D(digits[2*m-4]-z[1]-1,base);
    z[2] = D(digits[1]-x[1]-y[2]-c[1],base);
    c[2] = idiv(x[1]+y[2]+z[2]+c[1]-digits[1],base);
    debug(`x2: ${x[2]} y2: ${y[2]} z2: ${z[2]} c2: ${c[2]}`);
    for(let i=3;i<=m-2;i++) {
        x[i] = z[i-1]<=digits[2*m-i-2]-1 ? 1 : 0;
        y[i] = D(digits[2*m-i-2]-z[i-1]-1,base);
        z[i] = D(digits[i-1]-x[i-1]-y[i]-c[i-1],base);
        c[i] = idiv(x[i-1]+y[i]+z[i]+c[i-1]-digits[i-1],base);
        debug(`x${i}: ${x[i]} y${i}: ${y[i]} z${i}: ${z[i]} c${i}: ${c[i]}`);
    }
    x[m-1] = z[m-2] <= digits[m-1]-1 ? 1 : 0;
    y[m-1] = D(digits[m-1]-z[m-2]-1,base);
    z[m-1] = D(digits[m-2]-x[m-2]-y[m-1]-c[m-2],base);
    c[m-1] = idiv(x[m-2]+y[m-1]+z[m-1]+c[m-2]-digits[m-2],base);
    debug(`x${m-1}: ${x[m-1]} y${m-1}: ${y[m-1]} z${m-1}: ${z[m-1]} c${m-1}: ${c[m-1]}`);

    debug(`x: ${x}\ny: ${y}\nz: ${z}\nc: ${c}`);

    if(x[m-1]+c[m-1] == 1) { // IV.1
        debug("no adjustment");
        // do nothing
    } else if(x[m-1]+c[m-1]==0 && y[m-1]!=base-1) { // IV.2
        debug("IV.2");
        if(z[m-1]!=0) { // IV.2.i
            debug("IV.2.i");
            y[m-1] += 1;
            z[m-1] -= 1;
        } else if(z[m-1]==0 && y[m-2]!=0) { // IV.2.ii
            debug("IV.2.ii");
            if(y[m-1]!=1 && z[m-2] != base-1) { // IV.2.ii.a
                debug("IV.2.ii.a");
                x[m-1] = 1;
                y[m-2] -= 1;
                y[m-1] -= 1;
                z[m-2] += 1;
                z[m-1] += 1;
            } else if(y[m-1] != 1 && z[m-2] == base-1) {    // IV.2.ii.b
                debug("IV.2.ii.b");
                x[m-1] = 2;
                y[m-2] -= 1;
                y[m-1] -= 2;
                z[m-2] = 0;
                z[m-1] = 3;
            } else if(y[m-1]==1) {  // IV.2.ii.c
                debug("IV.2.ii.c");
                x[m-1] = 1;
                y[m-2] -= 1;
                y[m-1] = base-1;
                z[m-2] = 0;
                z[m-1] = 3;
            }
        } else if(z[m-1]==0 && y[m-2]==0) { // IV.2.iii
            debug("IV.2.iii");
            if(z[m-2] != base-1) {  // IV.2.iii.a
                debug("IV.2.iii.a");
                x[m-2] -= 1;
                x[m-1] = 1;
                y[m-2] = base-1;
                y[m-1] -=1;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(z[m-2]==base-1 && y[m-1]!=1) { // IV.2.iii.b
                debug("IV.2.iii.b");
                x[m-2] -= 1;
                x[m-1] = 2
                y[m-2] = base-1;
                y[m-1] -= 2;
                z[m-2] = 0;
                z[m-1] = 3;
            } else if(z[m-1]==base-1 && y[m-1]==1) {    // IV.2.iii.c
                debug("IV.2.iii.c");
                x[m-2] -= 1;
                x[m-1] = 1;
                y[m-2] = base-1;
                y[m-1] = base-1;
                z[m-2] = 0;
                z[m-1] = 3;
            }
        }
    } else if(x[m-1] + c[m-1]==0 && y[m-1]==base-1) {   // IV.3
        debug("IV.3");
        x[m-1] = 1;
        y[m-2] -= 1;
        y[m-1] = base-2;
        z[m-2] += 1;
        z[m-1] = 1;
    } else if(x[m-1]+c[m-1]==2 && x[m-1]==0 && c[m-1]==2) { // IV.4
        debug("IV.4");
        if(z[m-1]!=base-1) {    // IV.4.i
            debug("IV.4.i");
            y[m-1] -= 1;
            z[m-1] += 1;
        } else if(z[m-1]==base-1 && z[m-2]!=base-1) {   // IV.4.ii
            debug("IV.4.ii");
            if(y[m-2] != 0) {   // IV.4.ii.a
                debug("IV.4.ii.a");
                x[m-1] = 1;
                y[m-2] -= 1;
                y[m-1] -= 2;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(y[m-2]==0) {  //IV.4.ii.b
                debug("IV.4.ii.b");
                x[m-2] -= 1;
                x[m-1] = 1;
                y[m-2] = base-1;
                y[m-1] -= 2;
                z[m-2] += 1;
                z[m-1] = 1;
            }
        } else if(z[m-1]==base-1 && z[m-2]==base-1) {   // IV.4.iii
            debug("IV.4.iii");
            if(y[m-1]<base-2) { // IV.4.iii.a
                debug("IV.4.iii.a");
                if(y[m-2]!=base-1) {
                    x[m-2] -= 1;
                    x[m-1] = base-2;
                    y[m-2] += 1;
                    y[m-1] += 2;
                    z[m-2] = base-2;
                    z[m-1] = base-2;
                } else {
                    x[m-1] = base-2;
                    y[m-2] = 0;
                    y[m-1] += 2;
                    z[m-2] = base-2;
                    z[m-1] = base-2;
                }
            } else {    // IV.4.iii.b
                debug("IV.4.iii.b");
                if(y[m-2] >= 1) {
                    x[m-1] = 2;
                    y[m-2] -= 1;
                    y[m-1] -= 3;
                    z[m-2] = 0;
                    z[m-1] = 3;
                } else {
                    x[m-2] -= 1;
                    x[m-1] = 2;
                    y[m-2] = base-1;
                    y[m-1] -= 3;
                    z[m-2] = 0;
                    z[m-1] = 3;
                }
            }
        }
    } else if(x[m-1]+c[m-1]==2 && x[m-1]==1 && c[m-1]==1) {
        debug("IV.5")
        if(z[m-1]!=base-1 && y[m-1] != 0) {
            debug("IV.5.i")
            y[m-1] -= 1;
            z[m-1] += 1;
        } else if(z[m-1] != base-1 && y[m-1]==0) {
            debug("IV.5.ii")
            x[m-1] = 0;
            y[m-1] = base-1;
            z[m-1] += 1;
        } else if(z[m-1] == base-1 && z[m-2] != 0) {
            debug("IV.5.iii")
            if(y[m-2]!=base-1) {
                debug("IV.5.iii.a")
                x[m-1] = 0;
                y[m-2] += 1;
                y[m-1] += 1;
                z[m-2] -= 1;
                z[m-1] = base-2;
            } else if(y[m-2]==base-1 && y[m-1] > 1) {
                debug("IV.5.iii.b")
                x[m-1] = 2;
                y[m-2] = base-2;
                y[m-1] -= 2;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(y[m-2]==base-1 && y[m-1] == 0) {
                debug("IV.5.iii.c")
                y[m-2] = base-2;
                y[m-1] = base-2;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(y[m-2] == base-1 && y[m-1] == 1) {
                debug("IV.5.iii.d")
                y[m-2] = base-2;
                y[m-1] = base-1;
                z[m-2] += 1;
                z[m-1] = 1;
            }
        } else if(z[m-1] == base-1 && z[m-2] == 0 && y[m-2] != 0) {
            debug("IV.5.iv")
            if(y[m-1] > 1) {
                debug("IV.5.iv.a")
                x[m-1] = 2;
                y[m-2] -= 1;
                y[m-1] -= 2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1]==0) {
                debug("IV.5.iv.b")
                y[m-2] -= 1;
                y[m-1] = base-2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1] == 1) {
                debug("IV.5.iv.c")
                y[m-2] -= 1;
                y[m-1] = base-1;
                z[m-2] = 1;
                z[m-1] = 1;
            }
        } else if(z[m-1] == base-1 && z[m-2] == 0 && y[m-2] == 0) {
            debug("IV.5.v")
            if(y[m-1] > 1) {
                debug("IV.5.v.a")
                x[m-2] -= 1;
                x[m-1] = 2;
                y[m-2] = base-1;
                y[m-1] -= 2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1] == 0) {
                debug("IV.5.v.b")
                x[m-2] -= 1;
                y[m-2] = base-1;
                y[m-1] = base-2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1] == 1) {
                debug("IV.5.v.c")
                x[m-2] -= 1;
                y[m-2] = base-1;
                y[m-1] = base-1;
                z[m-2] = 1;
                z[m-1] = 1;
            }
        }
    } else if(x[m-1] + c[m-1] == 3) {
        debug("IV.6");
        y[m-1] -= 1;
        z[m-1] = 0;
    }
    for(let i=1;i<=m-1;i++) {
        config[0][i] = x[i];
        config[0][2*m-1-i] = x[i];
        config[1][i-1] = y[i];
        config[1][2*m-2-i] = y[i];
        config[2][i-1] = z[i];
        config[2][2*m-3-i] = z[i];
    }
    return config;
}

function algorithm_5(digits,config,base) {
    debug("Algorithm V");
    const l = digits.length;
    const m = l >> 1;
    const s = [];
    debug(`l: ${l}, m: ${m}`);
    for(let i=0;i<l;i++) {
        s[i] = 0;
    }
    s[m] = 1;
    s[m-1] = 1;
    let digits2 = big_sub(digits,s,base);
    debug(`${digits}\n${s}\n${digits2}`);
    if(digits2[m-1]==0 || digits2[m]==0) {
        debug("One of d'm-1 and d'm is 0");
        s[m] = 2;
        s[m-1] = 2;
        digits2 = big_sub(digits,s,base);
    }
    const res = decide_type(digits2,base=10);
    const even = res.config[0].length%2==0;
    let ps;
    if(even) {
        ps = main_algorithm(digits2,base);
    } else {
        const config2 = [[],[],[]];
        const [dl1,dl2,dl3] = [digits[l-1],digits[l-2],digits[l-3]];
        const d0 = digits[0];
        if(dl1==1 && dl2<=2 && dl3>=4 && D(d0-dl3,base) != 0) {
            type = 'B1';
            config2[0][l-1] = 1;
            config2[0][l-2] = dl2;
            config2[0][1] = dl2;
            config2[0][0] = 1;
            config2[1][l-3] = dl3-1;
            config2[1][0] = dl3-1;
            z1 = D(d0-dl3,base);
            config2[2][l-4] = z1;
            config2[2][0] = z1;
        } else if(dl1==1 && dl2<=2 && dl3>=3 && D(d0-dl3,base) == 0) {
            type = 'B2';
            config2[0][l-1] = 1;
            config2[0][l-2] = dl2;
            config2[0][1] = dl2;
            config2[0][0] = 1;
            config2[1][l-3] = dl3-2;
            config2[1][0] = dl3-2;
            config2[2][l-4] = 1;
            config2[2][0] = 1;
        }
        ps = algorithm_4(digits2,config2,base);
    }
    ps[0][m-1] += s[m-1];
    ps[0][m] += s[m];
    
    return ps;
}

function main_algorithm(digits,base=10) {
    const l = digits.length;
    const odd = l%2==1;
    const m = l >> 1;
    const {type,config, special} = decide_type(digits,base=10);
    debug(`Type ${type}\nConfiguration:\n${config.join('\n')}`);
    switch(type) {
        case 'A1':
        case 'A2':
        case 'A3':
        case 'A4':
            if(odd) {
                return algorithm_1(m,digits,config,base);
            } else if(!special) {
                return algorithm_2(digits,config,base);
            } else {
                return algorithm_5(digits,config,base)
            }
        case 'A5':
        case 'A6':
            if(!odd) {
                return algorithm_1(m-1,digits,config,base)
            } else if(!special) {
                return algorithm_2(digits,config,base)
            } else {
                return algorithm_5(digits,config,base)
            }
        case 'B1':
        case 'B2':
        case 'B3':
        case 'B4':
        case 'B5':
        case 'B6':
        case 'B7':
            if(odd) {
                debug("Odd number of digits");
                return algorithm_3(digits,config,base)
            } else if(!special) {
                debug("Not special");
                return algorithm_4(digits,config,base)
            } else {
                debug("Special");
                return algorithm_5(digits,config,base)
            }
    }
}

function decide_type(digits,base=10) {
    const l = digits.length;
    const m = l >> 1;
    const [dl1,dl2,dl3] = [digits[l-1],digits[l-2],digits[l-3]];
    const d0 = digits[0];
    const config = [[],[],[]];
    let type;
    let z1;
    let special = digits[m] == 0 || digits[m-1]==0;
    if(dl2>2 && D(d0-dl1-dl2+1,base) != 0) {
        type = 'A1';
        config[0][l-1] = dl1;
        config[0][0] = dl1;
        config[1][l-2] = dl2-1;
        config[1][0] = dl2-1;
        z1 = D(d0-dl1-dl2+1,base);
        config[2][0] = z1;
        config[2][l-3] = z1;
        special = special && l%2==0;
    } else if(dl2>2 && D(d0-dl1-dl2+1,base) == 0) {
        type = 'A2';
        config[0][l-1] = dl1;
        config[0][0] = dl1;
        config[1][l-2] = dl2-2;
        config[1][0] = dl2-2;
        config[2][0] = 1;
        config[2][l-3] = 1;
        special = special && l%2==0;
    } else if(dl2 <= 2 && dl1!=1 && D(d0 - dl1+2,base) != 0) {
        type = 'A3';
        config[0][l-1] = dl1-1;
        config[0][0] = dl1-1;
        config[1][l-2] = base-1;
        config[1][0] = base-1;
        z1 = D(d0-dl1+2,base);
        config[2][0] = z1;
        config[2][l-3] = z1;
        special = special && l%2==0;
    } else if(dl2 <= 2 && dl1!=1 && D(d0 - dl1+2,base) == 0) {
        type = 'A4';
        config[0][l-1] = dl1-1;
        config[0][0] = dl1-1;
        config[1][l-2] = base-2;
        config[1][0] = base-2;
        config[2][0] = 1;
        config[2][l-3] = 1;
        special = special && l%2==0;
   } else if(dl1==1 && dl2==0 && dl3<=3 && D(d0-dl3,base) != 0) {
        type = 'A5';
        config[0][l-2] = base-1;
        config[0][0] = base-1;
        config[1][l-3] = dl3+1;
        config[1][0] = dl3+1;
        z1 = D(d0-dl3,base);
        config[2][0] = z1;
        config[2][l-4] = z1;
        special = special && l%2==1;
    } else if(dl1==1 && dl2==0 && dl3<=2 && D(d0-dl3,base) == 0) {
        type = 'A6';
        config[0][l-2] = base-1;
        config[0][0] = base-1;
        config[1][l-3] = dl3+2;
        config[1][0] = dl3+2;
        config[2][0] = base-1;
        config[2][l-4] = base-1;
        special = special && l%2==1;
    } else if(dl1==1 && dl2<=2 && dl3>=4 && D(d0-dl3,base) != 0) {
        type = 'B1';
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = dl3-1;
        config[1][0] = dl3-1;
        z1 = D(d0-dl3,base);
        config[2][l-4] = z1;
        config[2][0] = z1;
        special = special && l%2==0;
    } else if(dl1==1 && dl2<=2 && dl3>=3 && D(d0-dl3,base) == 0) {
        type = 'B2';
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = dl3-2;
        config[1][0] = dl3-2;
        config[2][l-4] = 1;
        config[2][0] = 1;
        special = special && l%2==0;
    } else if(dl1==1 && (dl2==1 || dl2==2) && (dl3==0 || dl3==1) && d0==0) {
        type = 'B3';
        config[0][l-1] = 1;
        config[0][l-2] = dl2-1;
        config[0][1] = dl2-1;
        config[0][0] = 1;
        config[1][l-3] = base-2;
        config[1][0] = base-2;
        config[2][l-4] = 1;
        config[2][0] = 1;
        special = special && l%2==0;
    } else if(dl1==1 && (dl2==1 || dl2==2) && (dl3==2 || dl3==3) && d0==0) {
        type = 'B4';
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = 1;
        config[1][0] = 1;
        config[2][l-4] = base-2;
        config[2][0] = base-2;
        special = special && l%2==0;
    } else if(dl1==1 && (dl2==1 || dl2==2) && dl3<=2 && d0!=0) {
        type = 'B5';
        config[0][l-1] = 1;
        config[0][l-2] = dl2-1;
        config[0][1] = dl2-1;
        config[0][0] = 1;
        config[1][l-3] = base-1;
        config[1][0] = base-1;
        config[2][l-4] = d0;
        config[2][0] = d0;
        special = special && l%2==0;
    } else if(dl1==1 && (dl2==1 || dl2==2) && dl3==3 && D(d0-3,base) != 0) {
        type = 'B6';
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = 2;
        config[1][0] = 2;
        z1 = D(d0-3,base);
        config[2][l-4] = z1;
        config[2][0] = z1;
        special = special && l%2==0;
    } else if(dl1==1 && (dl2==1 || dl2==2) && dl3==3 && d0==3) {
        type = 'B7';
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = 1;
        config[1][0] = 1;
        config[2][l-4] = 1;
        config[2][0] = 1;
        special = special && l%2==0;
    }
    return {type, config, special};
}

function sum_of_palindromes(n,base=10) {
    if(base<5) {
        throw(new Error("This trick only works for base ≥ 5"));
    }
    const digits = digits_of(n).reverse();
    if(is_palindrome(digits)) {
        debug("Is already a palindrome");
        return [digits];
    }
    function by_digits() {
        switch(digits.length) {
            case 1:
                debug("Single-digit number is a palindrome");
                return [digits];
            case 2:
                debug("Two-digit number");
                return sum_two_digits(parseInt(n),digits,base);
            case 3:
                debug("Three-digit number");
                return sum_three_digits(parseInt(n),digits,base);
            case 4:
                debug("Four-digit number");
                return sum_four_digits(parseInt(n),digits,base);
            case 5:
                debug("Five-digit number");
                return sum_five_digits(parseInt(n),digits,base);
            case 6:
                debug("Six-digit number");
                return sum_six_digits(parseInt(n),digits,base);
            default:
                debug("More than 6 digits: use main algorithm");
                return main_algorithm(digits,base);
        }
    }
    return by_digits().map(remove_leading_zeros);
}

try {
    module.exports = {decide_type, sum_of_palindromes, big_sum, is_palindrome, digits_of, debugging};
} catch(e) {
}
