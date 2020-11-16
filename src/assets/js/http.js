// javascript for vue-test
// create by zongx at 2020/11/11 14:19

import axios from 'axios'

const init = function () {
    axios.defaults.baseURL = '/api';
    axios.defaults.timeout = 2000;
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios.defaults.headers['Accept'] = '*/*';
    //axios.defaults.headers['Authorization'] = '123456'
};

export default {
    init
}