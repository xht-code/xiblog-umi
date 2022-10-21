import useEnv from '@/hooks/useEnv'
import { useParams } from '@umijs/max'
import React, { useRef } from 'react'
import ArticleAnchor, { AnchorRefMethods } from './anchor'
import ArticleContent from './content'
import RelatedArticles from './related'

export default function Page() {
  const { articleId = '', type } = useParams()
  const anchorRef = useRef<AnchorRefMethods>(null)

  const { isMobile } = useEnv()

  return (
    <section className='flex'>
      <main className='flex-1 overflow-hidden'>
        <ArticleContent
          articleId={articleId}
          isPreview={type === 'preview'}
          anchorRef={anchorRef}
          className='sm:p-[30px]'
        />
      </main>

      {!isMobile && (
        <aside className='flex-shrink-0 ml-[20px] w-[300px] hidden sm:block'>
          <RelatedArticles articleId={articleId} className='mb-[20px]' />
          <ArticleAnchor ref={anchorRef} />
        </aside>
      )}
    </section>
  )
}
