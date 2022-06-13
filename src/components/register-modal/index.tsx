import useCaptcha from '@/hooks/useCaptcha'
import { register } from '@/services/user'
import { encryptPassword } from '@/utils/user'
import {
  ModalForm,
  ModalFormProps,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components'
import { Modal } from 'antd'
import omit from 'lodash/omit'
import React, { FC } from 'react'

export interface RegisterModalProps extends ModalFormProps {
  children?: ModalFormProps['trigger']
  onLogin?: () => void
}

const RegisterModal: FC<RegisterModalProps> = ({
  children,
  onLogin,
  ...props
}) => {
  const [form] = ProForm.useForm()

  const { data, getCode } = useCaptcha({
    onSuccess: (data) => form.setFieldsValue({ captchaId: data.captchaId }),
  })

  const handleFinish = async (values) => {
    try {
      const data = {
        ...omit(values, 'repeatPassword'),
        password: encryptPassword(values.password),
      }
      await register(data)

      Modal.success({
        title: '注册成功，欢迎使用～',
        okText: '去登录',
        onOk: onLogin,
      })
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
      title='注册'
      trigger={children}
      onVisibleChange={(visible) => visible && getCode()}
      onFinish={handleFinish}
    >
      <ProFormText
        name='account'
        label='账号'
        extra='账号支持英文、数字、下划线，3-20个字符'
        rules={[
          { required: true, whitespace: true },
          { pattern: /^\w{3,20}$/, message: '账号格式不正确' },
        ]}
      />

      <ProFormText
        name='nickname'
        label='昵称'
        extra='昵称支持中文、英文、数字、下划线，最多12个字符'
        rules={[
          { required: true, whitespace: true },
          { pattern: /^[\u4e00-\u9fa5\w]{1,12}$/, message: '昵称格式不正确' },
        ]}
      />

      <ProFormText.Password
        name='password'
        label='密码'
        extra='密码由英文字母、数字和特殊字符组成，支持6-30位'
        rules={[
          { required: true, whitespace: true },
          { pattern: /^[^\r\n\t]{6,30}$/, message: '密码格式不正确' },
        ]}
      />

      <ProFormText.Password
        name='repeatPassword'
        label='密码确认'
        extra='再次填写密码，确保两次输入一致'
        dependencies={['password']}
        rules={[
          {
            required: true,
            validator: (_rule, value) => {
              if (!value) {
                return Promise.reject(new Error('请再次填写密码'))
              }
              if (value !== form.getFieldValue('password')) {
                return Promise.reject(new Error('两次输入的密码不一致'))
              }
              return Promise.resolve()
            },
          },
        ]}
      />

      <ProForm.Item noStyle name='captchaId' />

      <ProForm.Item required label='验证码'>
        <div className='flex items-center'>
          <ProFormText
            noStyle
            label='验证码'
            name='code'
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

export default RegisterModal
