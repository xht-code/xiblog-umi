import classNames from 'classnames'
import React, { FC } from 'react'

export type LayoutBoxProps = React.HTMLAttributes<HTMLElement> & {
  title?: string
  titleProps?: React.HTMLAttributes<HTMLElement>
}

const LayoutBox: FC<LayoutBoxProps> = ({
  children,
  title,
  titleProps,
  ...props
}) => {
  return (
    <section
      {...props}
      className={classNames(
        'p-[20px] rounded-[10px] bg-white',
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

      {children}
    </section>
  )
}

export default LayoutBox
