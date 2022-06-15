import IconText from '@/components/icon-text'
import { EyeOutlined, StarOutlined } from '@ant-design/icons'
import { ProList } from '@ant-design/pro-components'
import { history, request } from '@umijs/max'
import { Tag } from 'antd'
import React from 'react'

export default function Page() {
  const fetchData = async ({ current, pageSize }) => {
    const { list: data, total } = await request('/article/list', {
      method: 'POST',
      data: { page: current, pageSize },
    }).then(({ data }) => data)
    return { data, total }
  }

  return (
    <ProList
      rowKey='id'
      itemLayout='vertical'
      headerTitle='文章列表'
      request={fetchData}
      pagination={{
        pageSize: 10,
      }}
      onRow={(record) => ({
        onClick: () => history.push(`/article/${record.id}`),
      })}
      metas={{
        title: {},
        description: {
          render: (_dom, entity) =>
            entity.tags.map((item) => <Tag key={item.id}>{item.name}</Tag>),
        },
        actions: {
          render: (_dom, entity) => [
            <IconText icon={EyeOutlined} text={entity.pv} key='pv' />,
            <IconText icon={StarOutlined} text={entity.star} key='star' />,
          ],
        },
        extra: {
          render: (_dom, entity) => (
            <img
              className='w-full h-[200px] sm:w-[272px] sm:h-[150px] object-cover rounded-[10px]'
              alt='logo'
              src={entity.coverPic}
            />
          ),
        },
        content: {
          render: (_dom, entity) => {
            return entity.intro
          },
        },
      }}
    />
  )
}
