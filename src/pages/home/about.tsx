import LayoutBox from '@/components/layout-box'
import { Affix } from 'antd'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useRequest } from '@umijs/max'

export default function AboutMe() {
  const { data } = useRequest({
    method: 'GET',
    url: '/blog/about-me',
  })

  return (
    <Affix offsetTop={84}>
      <LayoutBox title='关于我' className='mb-[20px]'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {data?.content}
        </ReactMarkdown>
      </LayoutBox>
    </Affix>
  )
}
