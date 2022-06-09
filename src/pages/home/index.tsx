import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { useRequest } from 'umi'

const ListItemWrapper = styled.div`
  border-bottom: 1px solid #f0f0f0;

  .ant-list-item-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

export default function HomePage() {
  const {
    data,
    loading,
    pagination: {
      total,
      current: currentPage,
      pageSize,
      changeCurrent: setPage,
    },
  } = useRequest(
    ({ current, pageSize }) => {
      return {
        method: 'GET',
        url: `/article/page/${current}/size/${pageSize}`,
      }
    },
    {
      paginated: true,
      formatResult: ({ data }) => {
        return { list: data.articles, total: data.total }
      },
    },
  )

  return (
    <div>
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          current: currentPage,
          onChange: setPage,
          pageSize,
          total,
        }}
        loading={loading}
        dataSource={data?.list}
        renderItem={(item) => (
          <ListItemWrapper>
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text='156'
                  key='list-vertical-star-o'
                />,
                <IconText
                  icon={LikeOutlined}
                  text='156'
                  key='list-vertical-like-o'
                />,
                <IconText
                  icon={MessageOutlined}
                  text='2'
                  key='list-vertical-message'
                />,
              ]}
              extra={
                <img
                  className='w-[272px] h-[150px] object-cover'
                  src={item.coverPic}
                  alt='cover'
                />
              }
            >
              <h2 className='text-[22px] font-500 flex-shrink-0'>
                {item.title}
              </h2>
              <article className='mt-[10px] flex-1'>{item.intro}</article>
            </List.Item>
          </ListItemWrapper>
        )}
      />
    </div>
  )
}
