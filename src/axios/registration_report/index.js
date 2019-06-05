import request from '@/axios'

export default {
    AccountSelect: data => request({   //各站点 一段时间内站点注册人数
        url: `/account/AccountSelect.do?beginDate=${data.beginDate}&endDate=${data.endDate}&site_id=${data.site_id}`,
        // url: `/account/AccountSelect.do?beginDate='2018/12/11'&endDate='2019/12/11'&site_id='全部'`,
        method: 'get'
        // data: data
    }),
}
