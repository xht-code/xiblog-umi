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
      title: '编号',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '搜索类型',
      dataIndex: 'searchType',
      valueType: 'radio',
      initialValue: 'article',
      valueEnum: {
        article: { text: '文章标题' },
        tag: { text: '标签名' },
        author: { text: '创作者' },
      },
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'title',
      fieldProps: {
        placeholder: '请输入搜索内容',
      },
      formItemProps: {
        label: '搜索内容',
        name: 'searchValue',
      },
      render: (dom, record) => {
        return <Link to={`/article/${record.id}`}>{dom}</Link>
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
