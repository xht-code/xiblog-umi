import LoginModal from '@/components/login-modal'
import RegisterModal from '@/components/register-modal'
import useEnv from '@/hooks/useEnv'
import Storage, { StorageKey } from '@/utils/storage'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from '@umijs/max'
import { history, useLocation, useRequest } from '@umijs/max'
import { Button, Drawer, Menu } from 'antd'
import classNames from 'classnames'
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

  const {
    data: user,
    mutate,
    run: getUserInfo,
  } = useRequest(
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
        className='bg-white flex shadow-lg top-0 right-0 left-0 shadow-[rgba(0,0,0,0.02)] 
        z-[1000] fixed justify-center'
      >
        <div className='flex max-auto h-[64px] w-full max-w-[1280px] px-[20px] justify-between items-center'>
          <div className='flex h-full flex-1 items-center overflow-hidden justify-between sm:justify-start'>
            <div
              className='cursor-pointer font-semibold flex-shrink-0 text-primary text-[22px]'
              onClick={() => history.push('/')}
            >
              XHT&apos;s Blog
            </div>

            {!isMobile ? (
              <Menu
                selectedKeys={[activeKey]}
                className='h-full flex-1 hidden !border-b-transparent !px-[20px] sm:flex'
                mode='horizontal'
              >
                {NAVS.map(({ title, path }) => (
                  <Menu.Item
                    key={path}
                    className='items-center !flex'
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
            <div className='gap-x-[10px] hidden sm:flex sm:flex-shrink-0'>
              <Button type='primary' onClick={() => setLoginVisible(true)}>
                登录
              </Button>

              <RegisterModal onLogin={() => setLoginVisible(true)}>
                <Button type='link'>注册</Button>
              </RegisterModal>
            </div>
          ) : (
            <LoginUser user={user} onLogout={() => mutate(null)} />
          )}
        </div>
      </header>

      <Drawer
        width='40vw'
        closable={false}
        placement='right'
        visible={visible}
        bodyStyle={{ padding: 0 }}
        onClose={() => setVisible(false)}
      >
        <header className='pt-[20px]' />
        {NAVS.map(({ title, path }) => (
          <Link
            key={path}
            to={path}
            className={classNames(
              'mx-[10px] py-[8px] px-[15px] rounded-[5px] block text-gray-500',
              { '!text-primary bg-gray-100': activeKey === path },
            )}
          >
            {title}
          </Link>
        ))}
        <footer className='pb-[20px]' />
      </Drawer>

      <LoginModal
        visible={loginVisible}
        onVisibleChange={setLoginVisible}
        afterLogin={getUserInfo}
      />
    </>
  )
}
