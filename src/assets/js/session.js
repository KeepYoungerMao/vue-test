// javascript for vue-test
// create by zongx at 2020/11/12 14:13

const TOKEN_NAME = 'Authorization';
const TOKEN_EXPIRE_NAME = 'TOKEN_EXPIRE';

const session = {
    getToken() {
        let token = sessionStorage.getItem(TOKEN_NAME);
        let expire = sessionStorage.getItem(TOKEN_EXPIRE_NAME);
        let expire_time;
        try {
            expire_time = parseInt(expire);
        } catch (e) {
            expire_time = null;
        }
        if (token && null != expire) {
            return {
                token: token,
                expire: expire_time
            }
        } else {
            return null;
        }
    },
    setToken(data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data && data.hasOwnProperty('access_token') && data.hasOwnProperty('expires_in')) {
            sessionStorage.setItem(TOKEN_NAME, data.access_token);
            let expire = new Date().getTime() + ((data.expires_in - 60) * 1000);
            sessionStorage.setItem(TOKEN_EXPIRE_NAME, expire + '');
            return true;
        }
        return false;
    },
    removeToken() {
        sessionStorage.removeItem(TOKEN_NAME);
        sessionStorage.removeItem(TOKEN_EXPIRE_NAME);
    }
};

export default session;