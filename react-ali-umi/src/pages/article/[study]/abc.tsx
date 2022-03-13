import { useParams } from 'umi'
export default () => {
  const { study } = useParams()
  return (
    <>
    <div>我的访问路径是 /article/xxx/abc </div>
    <h1>我学习的科目是：{study}</h1>
    </>
  )
}
