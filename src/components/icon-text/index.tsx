import React from 'react'

const IconText: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.FC
    text: string
  }
> = ({ className, icon, text, ...props }) => (
  <div {...props} className={`flex items-center gap-[8px] ${className}`}>
    {React.createElement(icon)}
    {text}
  </div>
)

export default IconText
