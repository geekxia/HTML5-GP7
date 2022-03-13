// 学习资源：
// 1、阮一峰TS教程：http://ts.xcatliu.com/
// 2、TS官网手册：https://www.typescriptlang.org/docs/handbook/intro.html
// 3、TS中文网：https://www.tslang.cn/

import { type } from "os"
import { pathToFileURL } from "url"
import { useState } from "_@types_react@16.14.21@@types/react"
import { Col } from "_antd@4.17.2@antd"
import { is } from "_immer@9.0.7@immer/dist/internal"

// TS简介
// TypeScript(微软) vs. Flow（脸谱）
// Angular vs. React

// TS被广泛运用于前端工程，大约在2020下半年（Vue3.0出现）

// TS > ES6 > ES5，TS是JavaScript的超集，它是静态语言。
// TS在前端工程化中，大多数的TS错误，热更新没法识别；只有当我们使用VScode时才能更好捕捉到TS的错误。

// 基础类型

const a0: boolean = true
const a1: number = 100
const a2: string = 'hello'

const a3: number | string = '100'

const a4: null = null
const a5: undefined = undefined

const a6: object = { a: 1 }

const a7: Array<number> = [1, 2, 3]
const a8: number[] = [2,3,4]
const a9: object[] = [{a:1},{b:2}]
const a10: Array<number[]> = [[1,1],[2,2],[3,3]]
const a11: Array<any> = [true, 3, 'hello', [1,2]]

// 元组：本质上也是一个数组，只不过数组中每个位置上的数据类型是确定的。
let a12: [string, boolean, object] = ['hello', true, {a:1}]

// any和void
// any表示任意类型（包括自定义类型）
// void表示没有类型（一般函数返回值）
let a13: any = null
a13 = 100

const a14: void = undefined
function foo(): void {
    console.log('--')
}
foo()

// never 一般函数的返回值类型，表示这个函数没有“终点”
function die(): never {
    while(true) {
        console.log('---')
    }
}
function middleware(): never {
    throw(new Error())
}

// enum 枚举类型（数量有限，并元素各不相同）
enum Color { red, green, blue }
console.log(Color.red)
console.log(Color[0])

enum Cate { car='汽车用品', office='办公用品', chothe='男装女装' }
console.log(Cate.car)

// interface 定义一个接口（用于面向对象编程，如果你有兴趣自行搜索）
interface Shape {
    leg: string,
    arm: string
}
class People implements Shape {
    leg = '1m'
    arm = '2m'
}

// interface 自定义类型
interface User {
    username: string,
    password: string,
    age: number,
    addr?: string,    // 可选的属性
    readonly token?: string,  // 只读属性，不能改
    [propName:string]: any,   // 支持扩展属性
    child?: People,
    four?: Shape,
    run?: (start: string)=>boolean,
    eat?(arg:number, arg2?:string):number
}
const zs: User = { username:'zs', password:'123', age:20, addr:'深圳' }
const ls: User = { username:'zs', password:'123', age:20, token:'tt' }
let ww: User = { username:'zs', password:'123', age:20 }
ww.gender = '男'
ww.mobile = '1000'
ww.child = new People()
ww.four = { leg: '1m', arm: '1m' }
ww.run = function () { console.log('run'); return 1===1 }
ww.run('深圳')
ww.eat = function() {return 20}
ww.eat(30,'40')

// type 类型别名
type Hybrid = number | string | boolean | object | null | Shape | User
const b1: Hybrid  = 80
const b2: Hybrid = {a:1}
let b3: Hybrid = true
b3 = 90

// 类型字面量
type S = 'wentao' | 'abc' | 'ced'
const ss: S = 'abc'

type Female = { hair: string } | { makeup: ()=>void }
type Man = { work: ()=>void } & { clown: boolean }

// 类型联合 |
type Human1 = Female | Man
const h1: Human1 = { hair: '1m' }
const h2: Human1 = { work: ()=>console.log('work'), clown: true }

// 类型交叉
type Human2 = Female & Man
const h3: Human2 = { hair: '2m', work:()=>console.log('work'), clown: false }

// type 和 interface
// 1、type用于定义类型别名，可以进行类型交叉和类型联合。
// 2、interface用于自定义类型，还可以参与面向对象编程。
// 3、最佳实践：尽可能只使用interface，如果需要类型交叉或联合时必须用type。


// 函数类型（函数声明）
interface Menu {
    path: string,
    component: string,
    icon: string,
    [propName:string]: any
}
function arrToTree(arr:Array<Menu>): Array<Menu> {
    // do something
    return arr
}
arrToTree([{path:'/article',component:'',icon:''}])

type MathFn = (a:number, b:number)=>number
const add: MathFn  = (a, b) => {
    return a + b
}

const sub: (a:number, b:number)=>number = (a,b)=>a-b
add(1,2)
sub(2,1)

// 在函数声明时，可选参数必须放后面
function bar(a:string, b?:number, c?:boolean): void {
    console.log(a)
    console.log(b)
}

// 函数声明时，函数的返回值类型可以不用写，TS会进行默认“类型推断”
// 当可选参数有默认值时，不加?，带有默认值的可选参数不一定只能放在必填的后面。
function run(b:string='hello', a:string ) {
    return a + b
}
run(undefined, 'world')  //  hello world
run('hi', 'world')  // world hi


function car(a:number, ...rest:Array<number>): void {
    console.log(a)
    console.log(rest)
}
car(1,2,4,4,5,6,6,7)

// 函数重载
// 什么是函数重载？函数名相同，参数列表（参数个数、参数顺序、参数类型）、函数返回值，有一点差异就是“重载”。
function eat(a:string): void 
function eat(a:number): void
function eat(x:boolean, y:boolean): void
function eat(a:any,b?:any): void {
    if (typeof a === 'string') {
        console.log('实现了第一个eat方法')
    }
    if (typeof a==='number') {
        console.log('实现了第二个eat方法')
    }
    if (typeof a==='boolean' && typeof b==='boolean') {
        console.log('实现了第三个eat方法')
    }
}
eat('hello')
eat(200)
eat(true,false)

// 泛型
// 什么泛型？在函数声明、接口定义、类定义中，把不确定的类型用一个符号占位。当真实使用函数、接口和类时，再传入实际的类型。这就是泛型。
// function consoleSomething (a:string): string {
//     console.log(a)
// }
// function consoleSomething (b:number): number {
//     console.log(b)
// }
// function consoleSomething (a:boolean): boolean {
//     console.log(a)
// }

function consoleSomething<T> (a:T): T {
    return a
}
consoleSomething<number>(100)
consoleSomething<boolean>(true)
consoleSomething<number[]>([1,2,3,4])

function swap<T,U>(a:T, b:U): [U,T] {
    // do something
    return [b, a]
}
swap<number,string>(100,'200') // ['200', 100]
interface Dog {
    name: string,
    value: number
}
swap<number[], Dog>([1,2,3], {name:'dog',value:20}) // [{name:'dog',value:20},[2,3,4]]

// 泛型约束（不叫泛型推断）
interface He {
    length: number,
    width: number
}
type TT = string | Array<any> | He
function getLength<T extends TT>(arg:T) {
    return arg.length
}
getLength<string>('zhangsan')  // 8
getLength<string[]>(['a','b','c'])  // 3
getLength<He>({length:20,width:10}) // 20

// 泛型在接口中的应用
interface Qf<T, U> {
    teacher: T,
    student: T,
    work: (arg:U) => T
}
const szqf: Qf<string,number> = {
    teacher: 'xia',
    student: 'gp7',
    work: (arg:number)=>(arg+'人')
}
console.log(szqf.teacher)
szqf.work(56) // '56人'

// 泛型在类定义中的应用
class Animal<T> {}
new Animal<string>()
new Animal<number>()

// 类型推断:  (xx as type) 、 <type>xx
// 类型推荐只能“骗”过TS编译器，项目真实运行时该报错还是报错。
function consoleLength(arg:any) {
    console.log((arg as string).length)
    console.log(<string>arg.length)
    console.log(<Array<any>>arg.length)
}
consoleLength(100)
consoleLength('hello')
consoleLength([1,2,3])

// 声明文件
// 作用：在TS环境，一些非TS的第三方包无法正常使用，要使用"声明文件"来处理。
// 特点：所有的声明文件都是以 .d.ts 结尾。声明文件只在包含在TS检测的目录内部，都可以起作用。
// 常识：以后在前端工程项目，只要看到了 .d.ts文件、@types/* ，都是为了处理第三方包在TS环境中的兼容性。
// 在TS项目中，如果安装了某一个包，但import（第三方包或文件模块）时报错、或者导入的undefined，这一定是因为缺少了“声明文件”，去社区寻找别人写好的声明文件；如果找不到，你自己写。

// 配置文件
// TS项目中的 tsconfig.json / jsconfig.json 就是TS的配置文件。
// TS配置文件被修改了，一般不用重启项目。
// 常用的配置选项有：compilerOptions、include、exclude、。。。。
// 编译选项（compilerOptions）有上百个选项。理论上所有的TS报错，都可以通过适当的编译选项进行关闭。

// TS编译报错 vs. ESLint报错：前者主要用于检测类型，后者用于检测代码规范。TS报错在VScode中会有更加友好的错误提示。

// TS核心库提供了很多JS、BOM、DOM的类型。
const dd: Date = new Date()