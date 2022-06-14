import LoginModal from '@/components/login-modal'
import RegisterModal from '@/components/register-modal'
import useEnv from '@/hooks/useEnv'
import Storage, { StorageKey } from '@/utils/storage'
import { MenuOutlined } from '@ant-design/icons'
import { history, useLocation, useRequest } from '@umijs/max'
import { Button, Drawer, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import routes from '../../config/routes'
import LoginUser from './login-user'

const NAVS = routes.filter((route) => route.isNav)

export default function GlobalHeader() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)

  const { isMobile } = useEnv()

  const activeKey =
    NAVS.find((nav) =>
      location.pathname.substring(1).startsWith(nav.path.substring(1)),
    )?.path || '/home'

  const { data: user, run: getUserInfo } = useRequest(
    {
      method: 'GET',
      url: '/user/info',
      skipErrorHandler: true,
    },
    {
      manual: true,
      onError: ({ response }: any) => {
        if (response.data?.errCode === 4002) {
          Storage.clear()
        }
      },
    },
  )

  useEffect(() => {
    if (Storage.get(StorageKey.TOKEN)) {
      getUserInfo()
    }
  }, [])

  return (
    <>
      <header
        className='fixed z-[1000] top-0 left-0 right-0 flex justify-center 
        bg-white shadow-lg shadow-[rgba(0,0,0,0.02)]'
      >
        <div className='w-full max-w-[1280px] h-[64px] max-auto px-[20px] flex justify-between items-center'>
          <div className='h-full flex items-center flex-1 overflow-hidden justify-between sm:justify-start'>
            <div
              className='flex-shrink-0 text-[22px] font-semibold text-primary cursor-pointer'
              onClick={() => history.push('/')}
            >
              XHT&apos;s Blog
            </div>

            {!isMobile ? (
              <Menu
                selectedKeys={[activeKey]}
                className='hidden sm:flex flex-1 h-full !border-b-transparent !px-[20px]'
                mode='horizontal'
              >
                {NAVS.map(({ title, path }) => (
                  <Menu.Item
                    key={path}
                    className='!flex items-center'
                    onClick={() => history.push(path)}
                  >
                    {title}
                  </Menu.Item>
                ))}
              </Menu>
            ) : (
              <Button
                type='link'
                className='text-gray-500'
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
              />
            )}
          </div>

          {!user ? (
            <div className='hidden sm:flex sm:flex-shrink-0 gap-x-[10px]'>
              <Button type='primary' onClick={() => setLoginVisible(true)}>
                登录
              </Button>

              <RegisterModal onLogin={() => setLoginVisible(true)}>
                <Button type='link'>注册</Button>
              </RegisterModal>
            </div>
          ) : (
            <LoginUser user={user} />
          )}
        </div>
      </header>

      <Drawer
        width='60vw'
        closable={false}
        placement='right'
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <LoginModal
        visible={loginVisible}
        onVisibleChange={setLoginVisible}
        afterLogin={getUserInfo}
      />
    </>
  )
}
