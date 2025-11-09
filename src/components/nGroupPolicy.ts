export class NGroupPolicy {
  constructor() {
    // n is the group size
    this.n = 2;
  }
  setN(n){
    this.n = n;
  }
  drawFingers(dots){
    // Laggers are the amount of groups we create with 1 less finger. (When we can't create an exact amount of the group sizes)
    let laggers = (this.n - (dots.length % this.n)) % this.n;
    let ret = [];
    let _dots = [...dots]; // copy array (dereference)

    // create lagger groups
    for (let i = 0; i < laggers; i++) {
      let group = [];
      while (group.length !== (this.n - 1)){
        let i = Math.floor(Math.random() * _dots.length);
        group.push(_dots[i]);
        _dots.splice(i, 1);
      }
      ret.push(group);
    }

    // Create n sized groups
    while (_dots.length !== 0){
      let group = [];
      while (group.length !== this.n){
        let i = Math.floor(Math.random() * _dots.length);
        group.push(_dots[i]);
        _dots.splice(i, 1);
      }
      ret.push(group);
    }

    return ret;
  }
}
