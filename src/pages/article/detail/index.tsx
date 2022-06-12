import { InfoItem } from '@/pages/home/components'
import {
  ClockCircleOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, useParams, useRequest } from '@umijs/max'
import { Skeleton } from 'antd'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

export default function Page() {
  const { articleId } = useParams()

  const { data, loading } = useRequest(
    {
      method: 'GET',
      url: `/article/${articleId}`,
    },
    {
      formatResult: ({ data }) => {
        const [createTime, updateTime] = [
          data.createTime,
          data.detail.updateTime,
        ].map((time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss'))

        return {
          ...data,
          ...data.detail,
          content: CryptoJS.enc.Base64.parse(data.detail.content).toString(
            CryptoJS.enc.Utf8,
          ),
          createTime,
          updateTime,
          detail: undefined,
        }
      },
    },
  )

  if (loading) {
    return <Skeleton />
  }

  return (
    <div>
      <h1 className='text-[26px] sm:text-[32px] font-semibold'>{data.title}</h1>
      <div className='mt-[5px] sm:mt-[10px] text-[16px] flex items-center flex-wrap gap-y-[5px]'>
        <InfoItem
          icon={UserOutlined}
          text={<Link to={`/user/`}>{data.author}</Link>}
        />
        <InfoItem icon={ClockCircleOutlined} text={data.createTime} />
        <InfoItem
          icon={TagsOutlined}
          text={data.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/article/tag/${tag.id}`}
              className='px-[12px] py-[3px] text-[14px] rounded-[5px] transition-[background]
              text-gray-600 bg-gray-100 hover:text-white hover:bg-primary'
            >
              {tag.name}
            </Link>
          ))}
        />
      </div>
      <article className='article-content mt-[20px]'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {data.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
