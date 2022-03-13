import React from 'react'
import { Navbar, Tabbar } from '@/components'

// 二层的高阶组件，外层是业务层，内层是标准的高阶组件
// 如果是多层的高阶组件，其语法参考如下：
// export default arg1 => arg2 = C => props => <C/>
// fn()()(Home)
// 提示：多层的高阶组件，很少很少用得到。

// export default function page(arg={}) {
//   const { navbar, tabbar } = arg
//   return C => {
//     return props=>(
//       <>
//         { navbar && <Navbar {...navbar} /> }
//         <C {...props} />
//         { tabbar && <Tabbar {...tabbar} /> }
//       </>
//     )
//   }
// }

export default (arg={}) => {
  // do something
  const { navbar, tabbar } = arg
  return C => props => (<>
    { navbar && <Navbar {...navbar} /> }
    <C {...props} />
    { tabbar && <Tabbar {...tabbar} /> }
  </>)
}
