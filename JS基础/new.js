//new 生成对象过程
// 1.生成新对象
// 2.新对象的_proto_属性指向原函数的prototype属性（继承原函数的原型）
// 3.将新对象绑定到此函数的this上
// 4.返回新对象

//参数：
//construct:接受一个构造函数
//arguments:传入构造函数的参数

function create(construct,arguments){
  //新对象
  let obj ={}

  //链接到原型
  obj.__proto__ = construct.prototype

  //绑定this并执行构造函数（为对象的属性）
  let result = construct.apply(obj,arguments)

  //如果result没有其他选择的对象，就返回obj
  return result instanceof Object?result:obj
}

//构造函数
function test(name,age){
  this.name= name
  this.age= age
}
test.prototype.sayName = function (){
  console.log(this.name)
}

//实现一个new操作符
const a = create(test,'suixin','23')
console.log(a.age)