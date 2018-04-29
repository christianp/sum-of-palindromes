console.clear();
function digits_of(n) {
    return (n+'').split('').map(d=>parseInt(d));
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
    console.log(a.join(''));
    console.log(b.join(''));
    for(let i=0;i<a.length;i++) {
        a[i] -= (b[i] || 0);
        while(a[i]<0) {
            a[i] += base;
            a[i+1] -= 1;
        }
    }
    console.log(a.join(''));
    return a;
}

function D(n,base) {
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
        return decide_type(digits,base);
    }
    const r = digits_to_int([1,d3,0,d3,1],base);
    const m = n - r;
    const d = D(m,base);
    if(n >= r && m!=digits_to_int([2,0,1],base) && (d==0 || m!=(d+1)*base+d)) {
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
        // here 10110;
    } else if(n<r && d3!=0 && d2==base-1 d<=base-2) {
        const [p1,p2] = sum_of_palindromes(m2,base);
        return f([[1,d3-1,base-1,d3-1,1]]).concat(p1,p2);
    } else {
        return f([[1,d3-1,base-2,d3-1,1],[1,d+1,1],[d-1]]);
    }
}

function sum_six_digits(n,digits,base=10) {
    const [d0,d1,d2,d3,d4,d5] = digits;
    if(d5!=1) {
        const l = 6;
        const m = 3;
        const [x,y,z] = [
            [null,d5,0,0],
            [null,d4-1,0,0],
            [null,D(d0-d5-d4+1,base),0,0]
        ];
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
            y[2] = base+d2-1-x[1];
            z[1] = base-1;
            c[1] = idiv(z[1]+y[1]+z[1]-d0,base);
            x[2] = Math.floor((base+d3-1)/2);
            y[2] = base+d3-1 - x[2];
            z[2] = D(d1-x[2]-y[2]-c[1],base);
            c[2] = idiv(z[2]+y[2]+z[2]+c[1]-digits[1],base);
            x[3] = Math.floor((1+d2-c[2])/2);
            y[3] = 1+d2-c[2]-x[3];
            return [
                [x[1],x[2],x[3],x[2],x[1]],
                [y[1],y[2],y[3],y[2],y[1]],
                [z[1],z[2],z[1]]
            ];
        } else if(D(d0-d4+2)==0 && d2==0) {
            if(d4==0) {
                x[2] = Math.floor(d3/2);
                y[2] = d3-x[2];
                z[2] = D(d1-x[2]-y[2]-1,base);
                c[2] = idiv(x[2]+y[2]+z[2]+1-d1,base);
                x[3] = Math.floor((base-c[2]-z[2])/2);
                y[3] = g-c[2]-z[2]-x[3];
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
                y[3] = g-c[2]-z[2]-x[3];
                return [
                    [base-1,x[2],x[3],x[2],base-1],
                    [1,y[2],y[3],y[2],1],
                    [base-1,z[2],z[2],base-1]
                ];
            } else if(d4==2) {
                x[2] = Math.floor(d3/2);
                y[2] = d3-x[2];
                z[2] = D(d1-x[2]-y[2]-2,base);
                c[2] = idiv(x[2]+y[2]+z[2]+1-d1,base);
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
                c[1] = idiv(3+y+D(d1-3-y)-d1,base);
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
                c[1] = idiv(2+y+D(d1-1-y,base),base);
                c[2] = idiv(base-y-1+D(d2+y+2,base)+base-1-d2,base);
                return [
                    [1,0,g-y-1-c[1],g-y-1-c[1],0,1],
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

function algorithm_1(digits,config,base) {
    console.log('algo 1');
    const l = digits.length;
    const m = l >> 1;
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
    for(let i=1;i<=m;i++) {
        config[0][i-1] = x[i];
        config[0][2*m+1-i] = x[i];
        config[1][i-1] = y[i];
        config[1][2*m-i] = y[i];
        config[2][i-1] = z[i];
        config[2][2*m-i-1] = z[i];
    }
    if(c[m]==1) {
        config[0][m] = 0;
    } else if(c[m]==0) {
        config[0][m] = 1;
    } else if(c[m]==2) {
        config[0][m] = 1;
        config[1][m] -= 1;
        config[1][m-1] -= 1;
        config[2][m-1] = 0;
    }
    return config;
}

function algorithm_2(digits,config,base) {
    console.log('algo 2');
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
                    x[m-1] -= 1;
                    x[m] = 1;
                    y[m] = base-4;
                    y[m-1] = base-1;
                    z[m-1] = 2;
                }
            }
        }
    } else if(c[m]==2) {
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
    console.log('algo 3');
    const l = digits.length;
    const m = l >> 1;
    const [x,y,z] = [[],[],[]];
    [x[1],y[1],z[1]] = [config[0][0],config[1][0],config[2][0]];
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
    console.log(JSON.stringify(config));
    return config;
}

function algorithm_4(digits,config,base) {
    console.log('algo 4');
    const l = digits.length;
    const m = l >> 1;
    const [x,y,z] = [[],[],[]];
    [x[1],y[1],z[1]] = [config[0][1],config[1][0],config[2][0]];
    const c = [];
    c[1] = idiv(1+y[1]+z[1], base);
    x[2] = z[1] <= digits[2*m-4]-1 ? D(digits[2*m-3]-y[1],base) : D(digits[2*m-3]-y[1]-1,base);
    y[2] = D(digits[2*m-4]-z[1]-1,base);
    z[2] = D(digits[1]-x[1]-y[2]-c[1],base);
    c[2] = idiv(x[1]+y[2]+z[2]+c[1]-digits[1],base);
    for(let i=3;i<=m-2;i++) {
        x[i] = z[i-1]<=digits[2*m-i-2]-1 ? 1 : 0;
        y[i] = D(digits[2*m-i-2]-z[i-1]-1,base);
        z[i] = D(digits[i-1]-x[i-1]-y[i]-c[i-1],base);
        c[i] = idiv(x[i-1]+y[i]+z[i]+c[i-1]-digits[i-1],base);
    }
    x[m-1] = z[m-2] <= digits[m-1]-1 ? 1 : 0;
    y[m-1] = D(digits[m-1]-z[m-2]-1,base);
    z[m-1] = D(digits[m-2]-x[m-2]-y[m-1]-c[m-2],base);
    c[m-1] = idiv(x[m-2]+y[m-1]+z[m-1]+c[m-2]-digits[m-2],base);
    if(x[m-1]+c[m-1] == 1) {
        // do nothing
    } else if(x[m-1]+c[m-1]==0 && y[m-1]!=base-1) {
        if(z[m-1]!=0) {
            y[m-1] += 1;
            z[m-1] -= 1;
        } else if(z[m-1]==0 && y[m-1]!=0) {
            if(y[m-1]!=1 && z[m-2] != base-1) {
                x[m-1] = 1;
                y[m-2] -= 1;
                y[m-1] -= 1;
                z[m-2] += 1;
                z[m-1] += 1;
            } else if(y[m-1] != 1 && z[m-2] == base-1) {
                x[m-1] = 2;
                y[m-2] -= 1;
                y[m-1] -= 2;
                z[m-2] = 0;
                z[m-1] = 3;
            } else if(y[m-1]==1) {
                x[m-1] = 1;
                y[m-2] -= 1;
                y[m-1] = base-1;
                z[m-2] = 0;
                z[m-1] = 3;
            }
        } else if(z[m-1]==0 && y[m-2]==0) {
            if(z[m-2] != base-1) {
                x[m-2] -= 1;
                x[m-1] = 1;
                y[m-2] = base-1;
                y[m-1] -=1;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(z[m-2]==base-1 && y[m-1]!=1) {
                x[m-2] -= 1;
                x[m-1] = 2
                y[m-2] = base-1;
                y[m-1] -= 2;
                z[m-2] = 0;
                z[m-1] = 3;
            } else if(z[m-1]==base-1 && y[m-1]==1) {
                x[m-2] -= 1;
                x[m-1] = 1;
                y[m-2] = base-1;
                y[m-1] = base-1;
                z[m-2] = 0;
                z[m-1] = 3;
            }
        }
    } else if(x[m-1] + c[m-1]==0 && y[m-1]==base-1) {
        x[m-1] = 1;
        y[m-2] -= 1;
        y[m-1] = base-2;
        z[m-2] += 1;
        z[m-1] = 1;
    } else if(x[m-1]+c[m-1]==2 && x[m-1]==0 && c[m-1]==2) {
        if(z[m-1]!=base-1) {
            y[m-1] -= 1;
            z[m-1] += 1;
        } else if(z[m-1]==base-1 && z[m-2]!=base-1) {
            if(y[m-2] != 0) {
                x[m-1] = 1;
                y[m-2] -= 1;
                y[m-1] -= 2;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(y[m-2]==0) {
                if(z[m-1]==base-1 && z[m-2]==base-1) {
                    if(y[m-1]<base-2) {
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
                    } else {
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
            }
        }
    } else if(x[m-1]+c[m-1]==2 && x[m-1]==1 && c[m-1]==1) {
        if(z[m-1]!=base-1 && y[m-1] != 0) {
            y[m-1] -= 1;
            z[m-1] += 1;
        } else if(z[m-1] != base-1 && y[m-1]==0) {
            x[m-1] = 0;
            y[m-1] = base-1;
            z[m-1] += 1;
        } else if(z[m-1] == base-1 && z[m-2] != 0) {
            if(y[m-2]!=base-1) {
                x[m-1] = 0;
                y[m-2] += 1;
                y[m-1] += 1;
                z[m-2] -= 1;
                z[m-1] = base-2;
            } else if(y[m-2]==base-1 && y[m-1] > 1) {
                x[m-1] = 2;
                y[m-2] = base-2;
                y[m-1] -= 2;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(y[m-2]==base-1 && y[m-1] == 0) {
                y[m-2] = base-2;
                y[m-1] = base-2;
                z[m-2] += 1;
                z[m-1] = 1;
            } else if(y[m-2] == base-1 && y[m-1] == 1) {
                y[m-2] = base-2;
                y[m-1] = base-1;
                z[m-2] += 1;
                z[m-1] = 1;
            }
        } else if(z[m-1] == base-1 && z[m-2] == 0 && y[m-2] != 0) {
            if(y[m-1] > 1) {
                x[m-1] = 2;
                y[m-2] -= 1;
                y[m-1] -= 1;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1]==0) {
                y[m-2] -= 1;
                y[m-1] = base-2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1] == 1) {
                y[m-2] -= 1;
                y[m-1] = base-1;
                z[m-2] = 1;
                z[m-1] = 1;
            }
        } else if(z[m-1] == base-1 && z[m-2] == 0 && y[m-2] == 0) {
            if(y[m-1] > 1) {
                x[m-2] -= 1;
                x[m-1] = 2;
                y[m-2] = base-1;
                y[m-1] -= 2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1] == 0) {
                x[m-2] -= 1;
                y[m-2] = base-1;
                y[m-1] = base-2;
                z[m-2] = 1;
                z[m-1] = 1;
            } else if(y[m-1] == 1) {
                x[m-2] -= 1;
                y[m-2] = base-1;
                y[m-1] = base-1;
                z[m-2] = 1;
                z[m-1] = 1;
            }
        }
    } else if(x[m-1] + c[m-1] == 3) {
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
    console.log('algo 5');
    const l = digits.length;
    const m = l >> 1;
    const s = [];
    for(let i=0;i<l;i++) {
        s[i] = 0;
    }
    s[m] = 1;
    s[m-1] = 1;
    console.log('s',s);
    let digits2 = big_sub(digits,s,base);
    console.log('digits2',digits2);
    if(digits2[m-1]==0 || digits2[m]==0) {
        s[m] = 2;
        s[m-1] = 2;
        digits2 = big_sub(digits,s);
    }
    const ps = decide_type(digits2,base);
    ps[0][m-1] += s[m-1];
    ps[0][m] += s[m];
    
    return ps;
}

function decide_type(digits,base=10) {
    console.log(digits.join(''));
    const l = digits.length;
    const odd = l%2==1;
    const m = l >> 1;
    const special = !odd && (digits[m-1]==0 || digits[m]==0);
    const config = [[undefined,undefined],[undefined],[]];
    for(let i=0;i<l-2;i++) {
        config[0].push(undefined);
        config[1].push(undefined);
        config[2].push(undefined);
    }
    const [dl1,dl2,dl3] = [digits[l-1],digits[l-2],digits[l-3]];
    const d0 = digits[0];
    let z1;
    if(dl2>2 && D(d0-dl1-dl2+1,base) != 0) {
        // A1
        console.log('A1');
        config[0][l-1] = dl1;
        config[0][0] = dl1;
        config[1][l-2] = dl2-1;
        config[1][0] = dl2-1;
        z1 = D(d0-dl1-dl2+1,base);
        config[2][0] = z1;
        config[2][l-3] = z1;
        if(odd) {
            return algorithm_1(digits,config,base);
        } else if(!special) {
            return algorithm_2(digits,config,base);
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl2>2 && D(d0-dl1-dl2+1,base) == 0) {
        // A2
        console.log('A2');
        config[0][l-1] = dl1;
        config[0][0] = dl1;
        config[1][l-2] = dl2-2;
        config[1][0] = dl2-2;
        config[2][0] = 1;
        config[2][l-3] = 1;
        if(odd) {
            return algorithm_1(digits,config,base)
        } else if(!special) {
            return algorithm_2(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl2 <= 2 && dl1!=1 && D(d0 - dl1+2,base) != 0) {
        // A3
        console.log('A3');
        config[0][l-1] = dl1-1;
        config[0][0] = dl1-1;
        config[1][l-2] = base-1;
        config[1][0] = base-1;
        z1 = D(d0-dl1+2,base);
        config[2][0] = z1;
        config[2][l-3] = z1;
        if(odd) {
            return algorithm_1(digits,config,base)
        } else if(!special) {
            return algorithm_2(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl2 <= 2 && dl1!=1 && D(d0 - dl1+2,base) == 0) {
        // A4
        console.log('A4');
        config[0][l-1] = dl1-1;
        config[0][0] = dl1-1;
        config[1][l-2] = base-2;
        config[1][0] = base-2;
        config[2][0] = 1;
        config[2][l-3] = 1;
        if(odd) {
            return algorithm_1(digits,config,base)
        } else if(!special) {
            return algorithm_2(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
   } else if(dl1==1 && dl2==0 && dl3<=3 && D(d0-dl3,base) != 0) {
        // A5
        console.log('A5');
        config[0][l-1] = base-1;
        config[0][0] = base-1;
        config[1][l-2] = dl3+1;
        config[1][0] = dl3+1;
        z1 = D(d0-dl3,base);
        config[2][0] = z1;
        config[2][l-3] = z1;
        if(!odd) {
            return algorithm_1(digits,config,base)
        } else if(!special) {
            return algorithm_2(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && dl2==0 && dl3<=2 && D(d0-dl3,base) == 0) {
        // A6
        console.log('A6');
        config[0][l-1] = base-1;
        config[0][0] = base-1;
        config[1][l-2] = dl3+2;
        config[1][0] = dl3+2;
        config[2][0] = base-1;
        config[2][l-3] = base-1;
        if(!odd) {
            return algorithm_1(digits,config,base)
        } else if(!special) {
            return algorithm_2(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && dl2<=2 && dl3>=4 && D(d0-dl3,base) != 0) {
        // B1
        console.log('B1');
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = dl3-1;
        config[1][0] = dl3-1;
        z1 = D(d0-dl3,base);
        config[2][l-4] = z1;
        config[2][0] = z1;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && dl2<=2 && dl3>=3 && D(d0-dl3,base) == 0) {
        // B2
        console.log('B2');
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = dl3-2;
        config[1][0] = dl3-2;
        config[2][l-4] = 1;
        config[2][0] = 1;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && (dl2==1 || dl2==2) && (dl3==0 || dl3==1) && d0==0) {
        // B3
        console.log('B3');
        config[0][l-1] = 1;
        config[0][l-2] = dl2-1;
        config[0][1] = dl2-1;
        config[0][0] = 1;
        config[1][l-3] = base-2;
        config[1][0] = base-2;
        config[2][l-4] = 1;
        config[2][0] = 1;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && (dl2==1 || dl2==2) && (dl3==2 || dl3==3) && d0==0) {
        // B4
        console.log('B4');
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = 1;
        config[1][0] = 1;
        config[2][l-4] = base-2;
        config[2][0] = base-2;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && (dl2==1 || dl2==2) && dl3<=2 && d0!=0) {
        // B5
        console.log('B5');
        config[0][l-1] = 1;
        config[0][l-2] = dl2-1;
        config[0][1] = dl2-1;
        config[0][0] = 1;
        config[1][l-3] = base-1;
        config[1][0] = base-1;
        config[2][l-4] = d0;
        config[2][0] = d0;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && (dl2==1 || dl2==2) && dl3==3 && D(d0-3,base) != 0) {
        // B6
        console.log('B6');
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = 2;
        config[1][0] = 2;
        z1 = D(d0-3,base);
        config[2][l-4] = z1;
        config[2][0] = z1;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    } else if(dl1==1 && (dl2==1 || dl2==2) && dl3==3 && d0==3) {
        // B7
        console.log('B7');
        config[0][l-1] = 1;
        config[0][l-2] = dl2;
        config[0][1] = dl2;
        config[0][0] = 1;
        config[1][l-3] = 1;
        config[1][0] = 1;
        config[2][l-4] = 1;
        config[2][0] = 1;
        if(odd) {
            return algorithm_3(digits,config,base)
        } else if(!special) {
            return algorithm_4(digits,config,base)
        } else {
            return algorithm_5(digits,config,base)
        }
    }
}

function sum_of_palindromes(n,base=10) {
    if(base<5) {
        throw(new Error("This trick only works for base ≥ 5"));
    }
    const digits = digits_of(n).reverse();
    if(is_palindrome(digits)) {
        return [digits];
    }
    switch(digits.length) {
        case 1:
            return [digits];
        case 2:
            return sum_two_digits(parseInt(n),digits,base);
        case 3:
            return sum_three_digits(parseInt(n),digits,base);
        case 4:
            return sum_four_digits(parseInt(n),digits,base);
        case 5:
            return sum_five_digits(parseInt(n),digits,base);
        case 6:
            return sum_six_digits(parseInt(n),digits,base);
        default:
            return decide_type(digits,base);
    }
}

function test(n,base=10) {
    try {
        const palindromes = sum_of_palindromes(n,base);
        if(!palindromes.every(is_palindrome)) {
            console.log(palindromes);
            throw(new Error("Not every number is a palindrome"));
        }
        const digits = digits_of(n,base).reverse();
        const t = big_sum(palindromes);
        for(let i=0;i<digits.length;i++) {
            if(digits[i]!=t[i]) {
                console.log('total',t);
                throw(new Error("Doesn't sum to the same thing"));
            }
        }
    } catch(e) {
        console.error('n:',n);
        console.error(e);
        console.log(e.stack);
        throw(e);
    }
    return true;
}


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

