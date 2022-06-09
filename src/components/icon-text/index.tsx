import classNames from 'classnames'
import React from 'react'

export type IconTextProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: React.FC
  text: string
}

const IconText: React.FC<IconTextProps> = ({
  className,
  icon,
  text,
  ...props
}) => (
  <div
    {...props}
    className={classNames('flex items-center gap-[8px]', className)}
  >
    {React.createElement(icon)}
    {text}
  </div>
)

export default IconText
