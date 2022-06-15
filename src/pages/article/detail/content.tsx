import LayoutBox, { LayoutBoxProps } from '@/components/layout-box'
import { InfoItem } from '@/pages/home/components'
import { setTitle } from '@/utils'
import { base64Parse } from '@/utils/encryption'
import {
  ClockCircleOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link, useRequest } from '@umijs/max'
import { Skeleton } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { FC, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'
import { AnchorRefMethods } from './anchor'

const ANCHOR_CLASS = 'article-anchor'

interface ArticleContentProps extends LayoutBoxProps {
  articleId: string
  anchorRef: React.RefObject<AnchorRefMethods>
}

const reRender =
  (level: string) =>
  (props: HeadingProps): JSX.Element => {
    return React.createElement(
      level,
      {
        id: Math.random().toString(16).slice(2),
        className: classNames(props.className, ANCHOR_CLASS),
      },
      props.children,
    )
  }

const ArticleContent: FC<ArticleContentProps> = ({
  articleId,
  anchorRef,
  ...props
}) => {
  const articleRef = useRef<HTMLElement>(null)

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
          content: base64Parse(data.detail.content),
          createTime,
          updateTime,
          detail: undefined,
        }
      },
      onSuccess: (data) => {
        setTitle(data.title)
      },
    },
  )

  useEffect(() => {
    if (!data?.content || !articleRef.current || !anchorRef.current) return

    const anchors = [
      ...articleRef.current.querySelectorAll(`.${ANCHOR_CLASS}`)!,
    ].map((node) => ({
      id: node.id,
      name: node.innerHTML,
    }))
    anchorRef.current.setData(anchors)
  }, [data?.content])

  if (loading) {
    return <Skeleton />
  }

  return (
    <LayoutBox {...props}>
      <h1 className='text-[26px] sm:text-[32px] font-semibold'>{data.title}</h1>
      <div className='mt-[5px] sm:mt-[10px] text-[16px] flex items-center flex-wrap gap-y-[5px]'>
        <InfoItem
          icon={UserOutlined}
          text={
            <Link to={`/user/${data.author.id}`}>{data.author.nickname}</Link>
          }
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
      <article ref={articleRef} className='article-content mt-[20px]'>
        <ReactMarkdown
          components={{
            // 生成 h1-h4 标签
            ...Array(4)
              .fill(0)
              .reduce((obj, _cur, index) => {
                return Object.assign(obj, {
                  [`h${index + 1}`]: reRender(`h${index + 1}`),
                })
              }, {}),
          }}
          // FIXME: 构建报错
          // remarkPlugins={[remarkGfm]}
          // rehypePlugins={[rehypeHighlight]}
        >
          {data.content}
        </ReactMarkdown>
      </article>
    </LayoutBox>
  )
}

export default ArticleContent
