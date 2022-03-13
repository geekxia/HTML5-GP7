// 在TS环境自定义了一个全局的类型
declare interface Article {
  _id: string,
  title: string,
  image: string,
  content: string,
  top: boolean,
  author: string,
  create_time: number,
  [propName:string]: any
}
