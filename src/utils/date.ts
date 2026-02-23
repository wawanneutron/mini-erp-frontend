import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatDate = (date: string) => {
  if (!date) return '-'
  return dayjs.utc(date).tz('Asia/Jakarta').format('DD/MM/YYYY')
}

export const formatDateTime = (date: string) => {
  if (!date) return '-'
  return dayjs.utc(date).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm')
}
