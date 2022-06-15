import IconText from '@/components/icon-text'
import { EyeOutlined, StarOutlined } from '@ant-design/icons'
import { ProList } from '@ant-design/pro-components'
import { history, Link, request } from '@umijs/max'
import { Divider } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

export default function Page() {
  const fetchData = async ({ current, pageSize, ...params }) => {
    const { list: data, total } = await request('/article/list', {
      method: 'POST',
      data: { page: current, pageSize, ...params },
    }).then(({ data }) => data)
    return {
      data: data.map((item) => ({
        ...item,
        createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
      })),
      total,
    }
  }

  return (
    <ProList
      rowKey='id'
      itemLayout='vertical'
      headerTitle='文章列表'
      request={fetchData}
      search={{}}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 10,
      }}
      onRow={(record) => ({
        onClick: () => history.push(`/article/${record.id}`),
      })}
      metas={{
        searchType: {
          title: '搜索类型',
          valueType: 'radio',
          formItemProps: {
            initialValue: 'article',
          },
          valueEnum: {
            article: { text: '文章标题' },
            tag: { text: '标签名' },
            author: { text: '创作者' },
          },
        },
        searchValue: {
          title: '搜索内容',
          valueType: 'text',
          fieldProps: {
            placeholder: '请输入搜索内容',
          },
        },
        title: {
          search: false,
        },
        description: {
          search: false,
          render: (_dom, { author, createTime, tags }) => (
            <>
              {author.nickname}
              <Divider type='vertical' />
              {createTime}
              <Divider type='vertical' />
              {tags.map((item, index) => (
                <>
                  <Link key={item.id} to={`/article/tag/${item.id}`}>
                    {item.name}
                  </Link>
                  {index !== tags.length - 1 && '、'}
                </>
              ))}
            </>
          ),
        },
        actions: {
          search: false,
          render: (_dom, { pv, star }) => [
            <IconText icon={EyeOutlined} text={pv} key='pv' />,
            <IconText icon={StarOutlined} text={star} key='star' />,
          ],
        },
        extra: {
          search: false,
          render: (_dom, { coverPic }) => (
            <img
              className='w-full h-[200px] sm:w-[272px] sm:h-[150px] object-cover rounded-[10px]'
              alt='logo'
              src={coverPic}
            />
          ),
        },
        content: {
          search: false,
          render: (_dom, { intro }) => intro,
        },
      }}
    />
  )
}
