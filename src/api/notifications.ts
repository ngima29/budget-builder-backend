import { AxiosResponse } from 'axios'
import { notificationBaseUrl } from '../config'
import { MethodEnum } from '../enums'
import { InputEmailInterface, InputSmsInterface } from '../interfaces'
import { createApi } from '../utils'
class Notification {
  private static instance: Notification

  private constructor() { }

  static get(): Notification {
    if (!Notification.instance) {
      Notification.instance = new Notification()
    }
    return Notification.instance
  }

  sendEmail(
    input: InputEmailInterface,
  ): Promise<AxiosResponse> {
    const api = createApi()

    return api({
      url: '/notifications/private/v1/email/send',
      method: MethodEnum.POST,
      data: input,
      baseURL: notificationBaseUrl,
    })
  }

  sendSms(
    input: InputSmsInterface,
  ): Promise<AxiosResponse> {
    const api = createApi()

    return api({
      url: '/notifications/private/v1/sms/send',
      method: MethodEnum.POST,
      data: input,
      baseURL: notificationBaseUrl,
    })
  }
}

const notification = Notification.get()

export { notification as Notification }
