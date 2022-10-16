import { useRequest } from '@umijs/max'
import { Card } from 'antd'
import Markdown from '@/components/markdown'
import useEnv from '@/hooks/useEnv'

export default function Page() {
  const { isMobile } = useEnv()

  const { data } = useRequest({
    method: 'GET',
    url: '/blog/about',
  })

  return (
    <Card
      bordered={false}
      bodyStyle={isMobile ? { padding: 0 } : undefined}
      className='article-content'
    >
      <Markdown>{data?.content}</Markdown>
    </Card>
  )
}
