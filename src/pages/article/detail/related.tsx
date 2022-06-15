import LayoutBox, { LayoutBoxProps } from '@/components/layout-box'
import { Link, useRequest } from '@umijs/max'
import React, { FC } from 'react'

interface RelatedArticlesProps extends LayoutBoxProps {
  articleId: string
}

const RelatedArticles: FC<RelatedArticlesProps> = ({ articleId, ...props }) => {
  const { data, loading } = useRequest(
    {
      method: 'GET',
      url: `/article/${articleId}/related`,
    },
    { refreshDeps: [articleId] },
  )

  return (
    <LayoutBox {...props} title='相关文章' loading={loading}>
      <div className='flex flex-col gap-y-[10px]'>
        {data?.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className='truncate'
          >
            {article.title}
          </Link>
        ))}
      </div>
    </LayoutBox>
  )
}

export default RelatedArticles
