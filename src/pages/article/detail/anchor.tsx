import LayoutBox from '@/components/layout-box'
import { Affix, AffixProps, Anchor as AntAnchor, AnchorProps } from 'antd'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react'
import styled from 'styled-components'

interface AnchorItem {
  id: string
  name: string
}

export interface AnchorRefMethods {
  setData: (data: AnchorItem[]) => void
}

const Anchor = styled(AntAnchor)<AnchorProps>`
  .ant-anchor-ink::before {
    display: none;
    width: 1px;
  }

  .ant-anchor-ink-ball {
    width: 6px;
    height: 6px;
    background: var(--primary-color);
  }

  .ant-anchor-link {
    padding-left: 12px;
  }
`

const ArticleAnchor: ForwardRefRenderFunction<
  AnchorRefMethods,
  Omit<AffixProps, 'children'>
> = (props, ref) => {
  const [data, setData] = useState<AnchorItem[]>([])

  useImperativeHandle(ref, () => ({
    setData,
  }))

  if (!data.length) return null

  return (
    <Affix offsetTop={84} {...props}>
      <LayoutBox title='文章导航'>
        <Anchor
          affix={false}
          showInkInFixed
          targetOffset={84}
          className='-ml-[12px]'
          onClick={(e) => e.nativeEvent.preventDefault()}
        >
          {data.map((anchor) => (
            <AntAnchor.Link
              key={anchor.id}
              href={`#${anchor.id}`}
              title={anchor.name}
            />
          ))}
        </Anchor>
      </LayoutBox>
    </Affix>
  )
}

export default forwardRef(ArticleAnchor)
