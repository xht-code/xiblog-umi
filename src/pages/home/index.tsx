import { EyeOutlined, StarOutlined } from '@ant-design/icons'
import { List } from 'antd'
import { ListItemProps } from 'antd/lib/list'
import React from 'react'
import styled from 'styled-components'
import { useRequest } from 'umi'

const ListItem = styled(List.Item)<ListItemProps>`
  .ant-list-item-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <div className='flex items-center gap-[8px]'>
    {React.createElement(icon)}
    {text}
  </div>
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
          hideOnSinglePage: true,
          current: currentPage,
          onChange: setPage,
          pageSize,
          total,
        }}
        loading={loading}
        dataSource={data?.list}
        renderItem={(item) => (
          <ListItem
            key={item.title}
            actions={[
              <IconText icon={EyeOutlined} text={item.pv} key='pv' />,
              <IconText icon={StarOutlined} text={item.star} key='star' />,
            ]}
            extra={
              <img
                className='w-[272px] h-[150px] object-cover'
                src={item.coverPic}
                alt='cover'
              />
            }
          >
            <h2 className='text-[22px] font-500 flex-shrink-0'>{item.title}</h2>
            <article className='mt-[10px] flex-1'>{item.intro}</article>
          </ListItem>
        )}
      />
    </div>
  )
}
