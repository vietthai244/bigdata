import request from '@/axios'

export default {
    ChangeSelectCount: data => request({   //各站点 一段时间内站点注册人数
        url: `index/ChangeSelectCount.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    }),
    ChangeSelectDay: data => request({   //各站点 一段时间内站点注册人数
        url: `/index/ChangeSelectDay.do?beginDate=${data.beginDate}&endDate=${data.endDate}&site_id=${data.site_id}`,
        method: 'get'
    }),
}
