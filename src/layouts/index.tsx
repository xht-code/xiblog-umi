import React from 'react'
import { Outlet } from 'umi'
import GlobalHeader from './header'

export default function GlobalLayout() {
  console.log('husky test')
  return (
    <div className='!min-h-[100vh] flex flex-col'>
      <GlobalHeader />

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
