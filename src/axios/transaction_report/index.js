import request from '@/axios'

export default {
    DrawSelect: data => request({   //出款实际状况
        url: `/draw/DrawSelect.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        // url: `/draw/DrawSelect.do?beginDate='2017/1/1'&endDate='2019/8/10'`,
        method: 'get'
        // data: data
    }),
    PaySelect: data => request({   //入款实际状况
        url: `/pay/PaySelect.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        // url: `/pay/PaySelect.do?beginDate='2017/1/1'&endDate='2019/8/10'`,
        method: 'get'
        // data: dataresize.js
    }),
    ConclusionSelect: data => request({   //出入款状况比例
        url: `/conclusion/ConclusionSelect.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        // url: `/conclusion/ConclusionSelect.do?beginDate='2017/1/1'&endDate='2019/8/10'`,
        method: 'get'
        // data: data
    }),
}
