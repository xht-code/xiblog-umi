import { ProTable, ProTableProps } from '@ant-design/pro-components'
import { useParams, Link } from '@umijs/max'
import { request } from '@umijs/max'
import { Tag } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

type TableProps = ProTableProps<any, any>

export default function ArticleTag() {
  const { tagId } = useParams()
  const [tagName, setTagName] = useState('')

  const columns: TableProps['columns'] = [
    {
      title: '名称',
      dataIndex: 'title',
      fieldProps: {
        placeholder: '输入文章标题',
      },
      formItemProps: {
        label: '文章标题',
        name: 'articleTitle',
      },
      render: (dom, record) => {
        return <Link to={`/article/${record.id}`}>{dom}</Link>
      },
    },
    {
      title: '作者',
      dataIndex: ['author', 'nickname'],
      fieldProps: {
        placeholder: '输入作者名称',
      },
    },
    {
      title: '所属标签',
      dataIndex: 'tags',
      search: false,
      render: (dom, { tags }) => {
        return tags?.map(({ id, name }) => <Tag key={id}>{name}</Tag>)
      },
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      search: false,
      render: (dom, { createTime }) => {
        return dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')
      },
    },
  ]

  const tableRequest: TableProps['request'] = async ({
    current,
    pageSize,
    ...params
  }) => {
    const {
      articles: { list: data, total },
      tag,
    } = await request('/article/tag/search', {
      method: 'POST',
      data: { page: current, pageSize, tagId, ...params },
    }).then(({ data }) => data)

    setTagName(tag.name)
    return { data, total }
  }

  return (
    <ProTable
      headerTitle={`标签为“${tagName}”的文章`}
      columns={columns}
      request={tableRequest}
      rowKey='id'
      options={false}
    />
  )
}
