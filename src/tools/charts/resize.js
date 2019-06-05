//图表resize的方法
const chart_resize = (refs) => {
    for (let item in refs) {
        if (refs[item] && refs[item].chart) {    //是否图表
            refs[item].chart.resize()
        }
    }
};
export default (cmp) => {
    cmp.$nextTick(() => {
        if (cmp.$refs) {
            chart_resize(cmp.$refs);
            window.addEventListener('resize', () => {
                let dom = null;
                chart_resize(cmp.$refs)
            })
        }
    });
}
