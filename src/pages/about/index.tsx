import { useRequest } from '@umijs/max'
import { Card } from 'antd'
import Markdown from '@/components/markdown'

export default function Page() {
  const { data } = useRequest({
    method: 'GET',
    url: '/blog/about',
  })

  return (
    <Card bordered={false} className='article-content'>
      <Markdown>{data?.content}</Markdown>
    </Card>
  )
}
