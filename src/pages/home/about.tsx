import LayoutBox from '@/components/layout-box'
import { Affix } from 'antd'
import { useRequest } from '@umijs/max'
import Markdown from '@/components/markdown'

export default function AboutMe() {
  const { data } = useRequest({
    method: 'GET',
    url: '/blog/about-me',
  })

  return (
    <Affix offsetTop={84}>
      <LayoutBox title='关于我' className='mb-[20px]'>
        <Markdown>{data?.content}</Markdown>
      </LayoutBox>
    </Affix>
  )
}
