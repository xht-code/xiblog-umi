import { Outlet } from '@umijs/max'
import React from 'react'
import GlobalHeader from './header'

export default function GlobalLayout() {
  return (
    <div className='!min-h-[100vh] flex flex-col bg-[#fafafa]'>
      <GlobalHeader />

      <main className='flex-1 w-full max-w-[1280px] mx-auto mt-[64px] p-[20px]'>
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
