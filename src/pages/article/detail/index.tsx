import useEnv from '@/hooks/useEnv'
import React, { useRef } from 'react'
import ArticleAnchor, { AnchorRefMethods } from './anchor'
import ArticleContent from './content'

export default function Page() {
  const anchorRef = useRef<AnchorRefMethods>(null)

  const { isMobile } = useEnv()

  return (
    <section className='flex'>
      <main className='flex-1 overflow-hidden'>
        <ArticleContent anchorRef={anchorRef} className='p-[30px]' />
      </main>

      {!isMobile && (
        <aside className='hidden sm:block ml-[20px] flex-shrink-0 w-[200px]'>
          <ArticleAnchor ref={anchorRef} />
        </aside>
      )}
    </section>
  )
}
