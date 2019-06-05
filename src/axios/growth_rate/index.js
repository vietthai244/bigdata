import request from '@/axios'

export default {
    ConclusionRingRatio: data => request({  // 环比增长率=（本期数-上期数）/上期数×100%（天）
        url: `/conclusion/ConclusionRingRatio.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    }),
    ConclusionRingRatio_month: data => request({   //环比增长率=（本期数-上期数）/上期数×100%（月）
        url: `/conclusion/ConclusionRingRatio_month.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    }),
    ConclusionRingRatio_year: data => request({   //环比增长率=（本期数-上期数）/上期数×100%（年
        url: `/conclusion/ConclusionRingRatio_year.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    }),
}
