import IconText from '@/components/icon-text'
import { InfiniteScroll } from '@/components/infinite-scroll'
import Event from '@/utils/event'
import {
  ClockCircleOutlined,
  EyeOutlined,
  StarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { List } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { useRequest } from 'umi'
import { InfoItem, ListItem } from './components'

const getEventName = (page) => `PAGE_${page}_LOADED`

export default function HomePage() {
  const {
    data,
    pagination: { totalPage, current: currentPage, changeCurrent: setPage },
  } = useRequest(
    ({ current, pageSize }) => {
      return {
        method: 'GET',
        url: `/article/page/${current}/size/${pageSize}`,
      }
    },
    {
      paginated: true,
      defaultPageSize: 5,
      formatResult: ({ data: res }) => {
        return {
          list:
            currentPage === 1 ? res.articles : data?.list.concat(res.articles),
          total: res.total,
        }
      },
      onSuccess: (_data, [paginate]) => {
        Event.emit(getEventName(paginate.current))
      },
    },
  )

  return (
    <div>
      <List
        itemLayout='vertical'
        size='large'
        dataSource={data?.list}
        renderItem={(item) => (
          <ListItem
            key={item.id}
            className='group flex-col-reverse sm:flex-row !px-0 sm:!px-[24px] 
            transition duration-300 transition-direction-[0.3s] cursor-pointer hover:bg-[rgba(0,0,0,0.01)]'
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
          >
            <div className='text-[22px] font-500 flex-shrink-0 transition duration-300 group-hover:text-primary'>
              {item.title}
            </div>
            <div className='mt-[5px] flex items-center'>
              <InfoItem icon={UserOutlined} text={item.author} />
              <InfoItem
                icon={ClockCircleOutlined}
                text={dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
              />
            </div>
            <div className='mt-[10px] flex-1 text-gray-600'>{item.intro}</div>
          </ListItem>
        )}
      />

      <InfiniteScroll
        hasMore={currentPage < totalPage}
        loadMore={async () => {
          const page = currentPage + 1
          setPage(page)
          await new Promise((resolve) => {
            Event.once(getEventName(page), resolve)
          })
        }}
      />
    </div>
  )
}
