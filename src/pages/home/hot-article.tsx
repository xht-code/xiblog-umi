import LayoutBox from '@/components/layout-box'
import { useRequest, Link } from '@umijs/max'
import classNames from 'classnames'

export default function HotArticle() {
  const { data } = useRequest({
    method: 'GET',
    url: '/article/hot/10',
  })

  return (
    <LayoutBox title='热门文章' className='mb-[20px] leading-[1]'>
      {data?.map((item, index) => (
        <Link
          key={item.id}
          to={`/article/${item.id}`}
          className='flex my-[15px] items-center'
          title={item.title}
        >
          <div
            className={classNames(
              'bg-[#ddd] flex rounded-[50%] flex-shrink-0 h-[20px] text-[#fff] mr-[6px] p-[3px] text-[12px] w-[20px] justify-center items-center',
              { 'bg-[rgb(255,88,88)]': index === 0 },
              { 'bg-[rgb(245,189,86)]': index === 1 },
              { 'bg-[rgb(68,199,68)]': index === 2 },
            )}
          >
            {index + 1}
          </div>
          <div className='flex-1 truncate'>{item.title}</div>
        </Link>
      ))}
    </LayoutBox>
  )
}
