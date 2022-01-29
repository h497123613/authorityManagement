function fun(n, o) {//n=0,o=undefined
  console.log(o)
  return {
    fun(m){
      return fun(m, n)//m=undefined,
    }
  };
}

var a = fun(0); a.fun(1); a.fun(2); a.fun(3);  //undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);  //undefined,?,?,?
var c = fun(0).fun(1); c.fun(2); c.fun(3);  //undefined,?,?,?