import { MenuOutlined } from '@ant-design/icons'
import { Button, Drawer, Menu } from 'antd'
import React, { useState } from 'react'
import { history, useLocation } from 'umi'
import routes from '../../config/routes'

const NAVS = routes.filter((route) => route.isNav)

export default function GlobalHeader() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  const activeKey =
    NAVS.find((nav) =>
      location.pathname.substring(1).startsWith(nav.path.substring(1)),
    )?.path || '/home'

  const handleOpen = () => setVisible(true)

  const handleClose = () => setVisible(false)

  return (
    <>
      <header
        className='fixed z-1000 top-0 w-full h-[64px] px-[20px] flex justify-between items-center
      bg-white shadow-lg shadow-[rgba(0,0,0,0.02)]'
      >
        <div className='flex items-center flex-1 overflow-hidden justify-between md:justify-start'>
          <div className='flex-shrink-0 text-[22px] text-primary'>
            XHT&apos;s Blog
          </div>

          {/** PC */}
          <Menu
            activeKey={activeKey}
            className='hidden md:flex flex-1 border-b-transparent px-[20px]'
            mode='horizontal'
          >
            {NAVS.map(({ title, path }) => (
              <Menu.Item key={path} onClick={() => history.push(path)}>
                {title}
              </Menu.Item>
            ))}
          </Menu>

          {/** Mobile */}
          <Button
            type='link'
            className='block md:hidden text-gray-500'
            icon={<MenuOutlined />}
            onClick={handleOpen}
          />
        </div>

        <div className='hidden md:flex-shrink-0'></div>
      </header>

      <Drawer
        width='60vw'
        closable={false}
        placement='right'
        visible={visible}
        onClose={handleClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
