import { useParams } from 'umi'

export default () => {
  const { id } = useParams()
  return (
    <div>用户详情 {id}</div>
  )
}
