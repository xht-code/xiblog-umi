import { svgToImage } from '@/utils'
import { useRequest } from '@umijs/max'

export default function useCaptcha(opts?: { onSuccess?: (data: any) => void }) {
  const { data, run: getCode } = useRequest(
    {
      method: 'GET',
      url: '/auth/code',
    },
    {
      manual: true,
      formatResult: ({ data }) => ({
        captchaId: data.captchaId,
        graphics: svgToImage(data.graphics),
      }),
      onSuccess: opts?.onSuccess,
    },
  )

  return { data, getCode }
}
