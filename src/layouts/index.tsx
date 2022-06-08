import { Menu } from 'antd'
import React from 'react'
import { Link, Outlet } from 'umi'

const NAVS = [
  { name: '首页', path: '/' },
  { name: '关于', path: '/about' },
]

export default function GlobalLayout() {
  return (
    <div className='!min-h-[100vh] flex flex-col'>
      <header
        className='fixed z-1000 top-0 w-full h-[64px] px-[20px] flex items-center
      bg-white shadow-lg shadow-[rgba(0,0,0,0.02)] '
      >
        <div className='text-[22px] text-primary'>XHT&apos;s Blog</div>

        <Menu mode='horizontal'>
          {NAVS.map(({ name, path }) => (
            <Link key={path} to={path}>
              <Menu.Item>{name}</Menu.Item>
            </Link>
          ))}
        </Menu>
      </header>

      <main className='flex-1 mt-[64px] p-[20px] bg-white'>
        <Outlet />
      </main>

      <footer className='flex-shrink-0 text-center p-[20px]'>
        Copyright © 2022 XiBlog.CN. All Rights Reserved.
        <a target='_blank' href='http://beian.miit.gov.cn' rel='noreferrer'>
          粤ICP备20013623号
        </a>
      </footer>
    </div>
  )
}
