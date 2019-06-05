import request from '@/axios'

export default {
    control_features_count: data => request({   //总控功能使用频次  以天为单位、自选周、默认展示7天数
        url: `/features/control_features_count.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    }),
    agent_features_count: data => request({   //代理功能使用频次  以天为单位、自选周、默认展示7天数
        url: `/features/agent_features_count.do?beginDate=${data.beginDate}&endDate=${data.endDate}`,
        method: 'get'
    })
}
