import useCaptcha from '@/hooks/useCaptcha'
import { login } from '@/services/user'
import Storage, { StorageKey } from '@/utils/storage'
import { encryptPassword } from '@/utils/user'
import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components'
import React, { FC } from 'react'

export interface LoginModalProps extends ModalFormProps {
  children?: ModalFormProps['trigger']
  afterLogin?: () => void
}

const LoginModal: FC<LoginModalProps> = ({
  children,
  afterLogin,
  ...props
}) => {
  const [form] = ProForm.useForm()

  const { data, getCode } = useCaptcha({
    onSuccess: (data) => form.setFieldsValue({ captchaId: data.captchaId }),
  })

  const handleFinish = async (values) => {
    try {
      const data = {
        ...values,
        password: encryptPassword(values.password),
      }
      const {
        data: { accessToken, user },
      } = await login(data)
      Storage.set(StorageKey.TOKEN, accessToken)
      Storage.set(StorageKey.USER_INFO, user)

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
      onVisibleChange={(visible) => {
        if (visible) getCode()
        props.onVisibleChange?.(visible)
      }}
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
