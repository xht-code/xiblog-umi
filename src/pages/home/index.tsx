import IconText from '@/components/icon-text'
import { InfiniteScroll } from '@/components/infinite-scroll'
import useEnv from '@/hooks/useEnv'
import Event from '@/utils/event'
import {
  ClockCircleOutlined,
  EyeOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { history, useRequest } from '@umijs/max'
import { List, Skeleton } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { InfoItem, ListItem } from './components'

const getEventName = (page) => `PAGE_${page}_LOADED`

export default function HomePage() {
  const [hasMore, setHasMore] = useState(false)

  const {
    data,
    pagination: { current: currentPage, changeCurrent: setPage },
  } = useRequest(
    ({ current, pageSize }) => {
      return {
        method: 'POST',
        url: '/article/no-content',
        data: { page: current, pageSize },
      }
    },
    {
      paginated: true,
      defaultPageSize: 5,
      formatResult: ({ data: res }) => {
        return {
          ...res,
          list: currentPage === 1 ? res.list : data!.list.concat(res.list),
        }
      },
      onSuccess: (res) => {
        setHasMore(res.page < res.totalPage)
        Event.emit(getEventName(res.page))
      },
    },
  )

  const { isMobile } = useEnv()

  if (!data) {
    return Array(5).fill(<Skeleton className='mb-[40px]' />)
  }

  return (
    <div>
      <List
        itemLayout='vertical'
        size='large'
        dataSource={data.list}
        renderItem={(item) => (
          <ListItem
            key={item.id}
            className='group flex-col-reverse sm:flex-row !px-0 sm:!px-[24px] 
              transition-[background] duration-300 transition-direction-[0.3s] 
              cursor-pointer hover:bg-[rgba(0,0,0,0.01)]'
            actions={[
              <IconText icon={EyeOutlined} text={item.pv} key='pv' />,
              <IconText icon={StarOutlined} text={item.star} key='star' />,
            ]}
            extra={
              <img
                className='w-full h-[200px] sm:w-[272px] sm:h-[150px] object-cover rounded-[10px]'
                src={item.coverPic}
                alt='cover'
              />
            }
            onClick={() => history.push(`/article/${item.id}`)}
          >
            <div className='text-[22px] font-semibold flex-shrink-0 transition duration-300 group-hover:text-primary'>
              {item.title}
            </div>
            <div className='mt-[5px] flex items-center'>
              <InfoItem icon={UserOutlined} text={item.author.nickname} />
              <InfoItem
                icon={ClockCircleOutlined}
                text={dayjs(item.createTime).format(
                  isMobile ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm:ss',
                )}
              />
            </div>
            <div className='mt-[10px] flex-1 text-gray-600'>{item.intro}</div>
          </ListItem>
        )}
      />

      <InfiniteScroll
        hasMore={hasMore}
        loadMore={() => {
          const page = currentPage + 1
          setPage(page)

          // 等待请求完成
          return new Promise((resolve) => {
            Event.once(getEventName(page), resolve)
          })
        }}
      />
    </div>
  )
}
