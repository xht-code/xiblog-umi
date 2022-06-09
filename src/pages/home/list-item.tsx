import { List } from 'antd'
import { ListItemProps } from 'antd/lib/list'
import styled from 'styled-components'

const ListItem = styled(List.Item)<ListItemProps>`
  .ant-list-item-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .ant-list-item-action {
    margin-left: 0;
  }

  @media screen and (max-width: 576px) {
    .ant-list-item-extra {
      width: 100%;
    }
  }
`

export default ListItem
