import { Skeleton } from 'antd'
import classNames from 'classnames'
import React, { FC } from 'react'

export type LayoutBoxProps = React.HTMLAttributes<HTMLElement> & {
  title?: string
  titleProps?: React.HTMLAttributes<HTMLElement>
  loading?: boolean
}

const LayoutBox: FC<LayoutBoxProps> = ({
  children,
  title,
  titleProps,
  loading,
  ...props
}) => {
  return (
    <section
      {...props}
      className={classNames(
        'sm:p-[20px] rounded-[10px] sm:bg-white',
        props.className,
      )}
    >
      {title && (
        <div
          {...titleProps}
          className={classNames(
            'text-[18px] font-semibold pb-[10px]',
            titleProps?.className,
          )}
        >
          {title}
        </div>
      )}

      {loading ? <Skeleton /> : children}
    </section>
  )
}

export default LayoutBox
