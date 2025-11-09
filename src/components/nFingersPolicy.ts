export class NFingersPolicy {
  constructor() {
    // n is the amout of fingers selected
    this.n = 1;
  }
  setN(n){
    this.n = n;
  }
  drawFingers(dots){
    if (this.n >= dots.length){
      return dots;
    }

    let ret = [];
    let _dots = [...dots]; // copy array (dereference)

    while (ret.length !== this.n){
      let i = Math.floor(Math.random() * _dots.length);
      ret.push(_dots[i]);
      _dots.splice(i, 1);
    }

    return ret;
  }
}
