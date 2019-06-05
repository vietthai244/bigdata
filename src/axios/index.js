import axios from 'axios'
// import store from '@/store'

// 创建axios实例
const service = axios.create({
    baseURL: '/api',
    timeout: 0,
});

// let numberOfAjaxCAllPending = 0;
// // Add a request interceptor
// service.interceptors.request.use(function (config) {
//     numberOfAjaxCAllPending++;
//     // show loader
//     store.commit('PAGE_LOADING');
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });
//
// // Add a response interceptor
// service.interceptors.response.use(function (response) {
//     numberOfAjaxCAllPending--;
//     console.log("------------  Ajax pending", numberOfAjaxCAllPending);
//
//     if (numberOfAjaxCAllPending == 0) {
//         //hide loader
//         store.commit('LOADED');
//     }
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });

export default service
