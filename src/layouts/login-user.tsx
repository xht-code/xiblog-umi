import type { UserInfo } from '@/types'
import Storage from '@/utils/storage'
import { DEFAULT_AVATAR } from '@/utils/user'
import { history } from '@umijs/max'
import { Avatar, Dropdown, Menu } from 'antd'
import React, { FC, useRef } from 'react'

interface LoginUserProps {
  user: UserInfo
  onLogout?: () => void
}

const LoginUser: FC<LoginUserProps> = ({ user, onLogout }) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleToPersonal = () => history.push('/user/personal')
  const handleLogout = () => {
    Storage.clear()
    onLogout?.()
  }

  return (
    <Dropdown
      getPopupContainer={() => ref.current!}
      overlay={
        <Menu
          items={[
            { key: 'personal', label: '个人中心', onClick: handleToPersonal },
            { key: 'logout', label: '退出登录', onClick: handleLogout },
          ]}
        />
      }
    >
      <div
        ref={ref}
        className='h-full px-[10px] hover:bg-[#fcfcfc] 
        flex items-center cursor-pointer select-none'
      >
        <Avatar
          size='small'
          src={user.avatar || DEFAULT_AVATAR}
          className='mr-[5px]'
        />
        {user.nickname}
      </div>
    </Dropdown>
  )
}

export default LoginUser
