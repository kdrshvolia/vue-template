export const Api = {
  getActivityLogData: async () => {
    const url = import.meta.env.BASE_URL
    const response = await fetch(url + 'api/activity-log.json')
    const data = await response.json()
    return data
  },
}
