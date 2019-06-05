import request from '@/axios'

export default {
    FundsSelect: data => request({   //资金流量 表中数据
        url: `/site/FundsSelect.do?beginDate=${data.beginDate}&endDate=${data.endDate}&site_id=${data.site_id}&type_name=${data.type_name}&classification=${data.classifications}`,
        method: 'get'
    }),
    Funds_classification: () => request({   //获取张变类型
        url: `/site/Funds_classification.do`,
        method: 'get'
    }),
    funds_select_all: data => request({   //资金流量 图中数据
        url: `/site/funds_select_all.do?beginDate=${data.beginDate}&endDate=${data.endDate}&site_id=${data.site_id}&type_name=${data.type_name}&classification=${data.classifications}`,
        method: 'get'
    }),

}
