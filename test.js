const add = (a,b,c) => {
  if ((typeof a  && typeof b && typeof c )!=='number'){
    throw new Error('参数必须是数字')
  }
  return a+b+c;
};
console.log(add(...[1,2,'w']));
