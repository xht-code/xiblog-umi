import {
  ModalForm,
  ModalFormProps,
  ProFormText,
} from '@ant-design/pro-components'
import React, { FC } from 'react'

export interface LoginModalProps extends ModalFormProps {
  children: ModalFormProps['trigger']
  afterLogin?: () => void
}

const LoginModal: FC<LoginModalProps> = ({
  children,
  afterLogin,
  ...props
}) => {
  const handleFinish = async (values) => {
    console.log('values: ', values)
    afterLogin?.()
    return true
  }

  return (
    <ModalForm
      width={480}
      {...props}
      title='登录'
      trigger={children}
      onFinish={handleFinish}
    >
      <ProFormText
        name='account'
        label='账号'
        placeholder='请输入账号'
        rules={[{ required: true, whitespace: true }]}
      />

      <ProFormText.Password
        name='password'
        label='密码'
        placeholder='请输入密码'
        rules={[{ required: true, whitespace: true }]}
      />
    </ModalForm>
  )
}

export default LoginModal
