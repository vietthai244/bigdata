import request from '@/axios'

export default {
    login_hours: data => request({   //资金流量 表中数据
        url: `/login/login_hours.do?beginDate=${data.beginDate}`,
        method: 'get'
    }),
    login_day: data => request({   //资金流量 表中数据
        url: `/login/login_day.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    }),
}
