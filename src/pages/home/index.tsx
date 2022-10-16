import IconText from '@/components/icon-text'
import { InfiniteScroll } from '@/components/infinite-scroll'
import LayoutBox from '@/components/layout-box'
import useEnv from '@/hooks/useEnv'
import Event from '@/utils/event'
import { DEFAULT_AVATAR } from '@/utils/user'
import {
  ClockCircleOutlined,
  EyeOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { history, useRequest } from '@umijs/max'
import { Avatar, List, Skeleton } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import AboutMe from './about'

import { InfoItem, ListItem } from './components'
import HotArticle from './hot-article'

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
        url: '/article/list',
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
    return (
      <LayoutBox>
        {Array(5)
          .fill(0)
          .map((_value, index) => (
            <Skeleton key={index} className='mb-[40px]' />
          ))}
      </LayoutBox>
    )
  }

  return (
    <div className='flex'>
      <LayoutBox title='最新发布' className='flex-1'>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={data.list}
          renderItem={(item: any) => (
            <ListItem
              key={item.id}
              className='cursor-pointer flex-col-reverse transition-[background] transition-direction-[0.3s] duration-300 
              group !px-0 sm:flex-row 
              sm:!px-[24px] hover:bg-[rgba(0,0,0,0.01)]'
              actions={[
                <IconText icon={EyeOutlined} text={item.pv} key='pv' />,
                <IconText icon={StarOutlined} text={item.star} key='star' />,
              ]}
              extra={
                <img
                  className='object-cover rounded-[10px] h-[200px] w-full sm:h-[150px] sm:w-[272px]'
                  src={item.coverPic}
                  alt='cover'
                />
              }
              onClick={() => history.push(`/article/${item.id}`)}
            >
              <div className='font-semibold flex-shrink-0 transition text-[22px] duration-300 group-hover:text-primary'>
                {item.title}
              </div>
              <div className='flex flex-wrap mt-[5px] items-center'>
                <div className='flex mr-[15px] text-secondary gap-x-[5px] items-center'>
                  <Avatar
                    size='small'
                    src={item.author.avatar || DEFAULT_AVATAR}
                  />
                  {item.author.nickname}
                </div>

                <InfoItem
                  // @ts-ignore
                  icon={ClockCircleOutlined}
                  text={dayjs(item.createTime).format(
                    isMobile ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm:ss',
                  )}
                />
              </div>
              <div className='flex-1 mt-[10px] text-gray-600'>{item.intro}</div>
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
      </LayoutBox>

      {!isMobile && (
        <aside className='flex-shrink-0 ml-[20px] w-[300px]'>
          <HotArticle />
          <AboutMe />
        </aside>
      )}
    </div>
  )
}
