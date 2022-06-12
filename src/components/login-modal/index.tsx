import { login } from '@/services/user'
import { encryptPassword } from '@/utils/user'
import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components'
import { useRequest } from '@umijs/max'
import React, { FC, useEffect } from 'react'

export interface LoginModalProps extends ModalFormProps {
  children: ModalFormProps['trigger']
  afterLogin?: () => void
}

const LoginModal: FC<LoginModalProps> = ({
  children,
  afterLogin,
  ...props
}) => {
  const [form] = ProForm.useForm()

  const { data, run: getCode } = useRequest(
    {
      method: 'GET',
      url: '/auth/code',
    },
    {
      manual: true,
      formatResult: ({ data }) => {
        return {
          captchaId: data.captchaId,
          graphics: 'data:image/svg+xml;base64,' + btoa(data.graphics),
        }
      },
      onSuccess: (data) => {
        form.setFieldsValue({ captchaId: data.captchaId })
      },
    },
  )

  useEffect(() => {
    getCode()
  }, [])

  const handleFinish = async (values) => {
    try {
      const data = {
        ...values,
        password: encryptPassword(values.password),
      }
      await login(data)
      afterLogin?.()
      return true
    } catch (error) {
      form.resetFields(['code'])
      getCode()
    }
  }

  return (
    <ModalForm
      width={480}
      {...props}
      form={form}
      title='登录'
      trigger={children}
      onFinish={handleFinish}
    >
      <ProFormText
        name='account'
        label='账号'
        placeholder='输入你的账号'
        rules={[{ required: true, whitespace: true }]}
      />

      <ProFormText.Password
        name='password'
        label='密码'
        placeholder='输入您的密码'
        rules={[{ required: true, whitespace: true }]}
      />

      <ProForm.Item noStyle name='captchaId' />

      <ProForm.Item required label='验证码'>
        <div className='flex items-center'>
          <ProFormText
            noStyle
            label='验证码'
            name='code'
            placeholder='输入验证码'
            rules={[{ required: true, whitespace: true }]}
          />

          <img
            className='h-[36px] ml-[10px] flex-shrink-0 cursor-pointer'
            src={data?.graphics}
            onClick={getCode}
          />
        </div>
      </ProForm.Item>
    </ModalForm>
  )
}

export default LoginModal
