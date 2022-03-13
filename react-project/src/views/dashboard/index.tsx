import React from 'react'

import { useAppSelector } from '@/hooks';

import Admin from './components/Admin'
import Teacher from './components/Teacher'
import './style.scss'

const dash = {
  test: <Teacher />,
  teacher: <Admin />
}

export default () => {
  const { roleInfo } = useAppSelector(state=>state.user)
  return (
    <>
    <div>
    { roleInfo && roleInfo.role && dash[roleInfo.role] }
    </div>
    </>
  )
}
