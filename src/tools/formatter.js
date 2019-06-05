export default {
    money(val) {
        if (isNaN(val)) return;
        let result = parseFloat(val).toFixed(2) + '';
        result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return result
    }
}
