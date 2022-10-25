import IconText from '@/components/icon-text'
import useEnv from '@/hooks/useEnv'
import { EyeOutlined, StarOutlined } from '@ant-design/icons'
import { ProList, ProListProps } from '@ant-design/pro-components'
import { history, Link, request } from '@umijs/max'
import { Divider } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import styled from 'styled-components'

const List = styled(ProList)`
  @media screen and (max-width: 576px) {
    .ant-list-vertical .ant-pro-list-row {
      padding: 0;
    }

    .ant-list-vertical .ant-list-item-extra {
      margin: 0 0 16px;

      img {
        width: 100%;
        height: auto;
      }
    }

    // 分割线
    .ant-list-items {
      .ant-list-item {
        &:last-child {
          border-bottom: none !important;
        }

        &:not(:last-of-type) {
          &::before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #f0f0f0;
            margin: 20px 0;
          }
        }
      }
    }
  }
`

export default function Page() {
  const { isMobile } = useEnv()

  const fetchData: ProListProps['request'] = async ({
    current,
    pageSize,
    ...params
  }) => {
    const { list: data, total } = await request('/article/list', {
      method: 'POST',
      data: { page: current, pageSize, ...params },
    }).then(({ data }) => data)
    return {
      data,
      total,
    }
  }

  return (
    <>
      <List
        cardProps={{ bodyStyle: isMobile ? { padding: 0 } : undefined }}
        itemCardProps={{ bodyStyle: isMobile ? { padding: 0 } : undefined }}
        rowKey='id'
        itemLayout='vertical'
        headerTitle='文章列表'
        request={fetchData}
        search={!isMobile && {}}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 10,
        }}
        onRow={(record) => ({
          onClick: () => history.push(`/article/${record.id}`),
        })}
        metas={{
          articleTitle: {
            title: '文章标题',
            valueType: 'text',
            fieldProps: {
              placeholder: '输入文章标题',
            },
          },
          tagName: {
            title: '标签名',
            valueType: 'text',
            fieldProps: {
              placeholder: '输入标签名',
            },
          },
          author: {
            title: '作者',
            valueType: 'text',
            fieldProps: {
              placeholder: '输入作者名称',
            },
          },
          title: {
            search: false,
          },
          description: {
            search: false,
            render: (_dom, { author, createTime, tags }) => (
              <div className='flex flex-wrap items-center'>
                {author.nickname}
                <Divider type='vertical' />
                {dayjs(createTime).format(
                  isMobile ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm:ss',
                )}
                <Divider type='vertical' />
                {tags.map((item, index) => (
                  <div key={item.id}>
                    <Link
                      to={`/article/tag/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.name}
                    </Link>
                    {index !== tags.length - 1 && '、'}
                  </div>
                ))}
              </div>
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
                className='object-cover rounded-[10px] h-[200px] w-full sm:h-[150px] sm:w-[272px]'
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
    </>
  )
}
