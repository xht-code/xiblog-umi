import useEnv from '@/hooks/useEnv'
import LatestArticle from './latest'
import HotArticle from './hot-article'
import AboutMe from './about'

export default function HomePage() {
  const { isMobile } = useEnv()

  return (
    <div className='flex'>
      <LatestArticle />

      {!isMobile && (
        <aside className='flex-shrink-0 ml-[20px] w-[300px]'>
          <HotArticle />
          <AboutMe />
        </aside>
      )}
    </div>
  )
}
