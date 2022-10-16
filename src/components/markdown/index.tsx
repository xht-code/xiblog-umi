import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

export default function Markdown(props: ReactMarkdownOptions) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      {...props}
    />
  )
}
