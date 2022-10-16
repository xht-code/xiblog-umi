import { useRequest } from '@umijs/max'
import { Card } from 'antd'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function Page() {
  const { data } = useRequest({
    method: 'GET',
    url: '/blog/about',
  })

  return (
    <Card bordered={false} className='article-content'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {data?.content}
      </ReactMarkdown>
    </Card>
  )
}
