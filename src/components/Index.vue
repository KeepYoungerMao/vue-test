<template>
    <div>
        <el-container>
            <el-header>
                <Header v-bind:active_header="activeHeader" v-bind:user="user" v-bind:intervalId="intervalId"/>
            </el-header>
            <el-container>
                <el-aside>
                    <el-row>
                        <el-col :span="24">
                            <el-menu :default-active="$route.path" @select="menuSelect" router>
                                <el-menu-item index="/">OVERVIEW</el-menu-item>
                                <el-submenu index="1">
                                    <div slot="title">
                                        <i class="el-icon-location"/>
                                        <span>SYSTEM</span>
                                    </div>
                                    <el-menu-item index="/user">USER</el-menu-item>
                                    <el-menu-item index="1-2">ROLE</el-menu-item>
                                </el-submenu>
                                <el-submenu index="2">
                                    <div slot="title">
                                        <i class="el-icon-menu"/>
                                        <span>DATA</span>
                                    </div>
                                    <el-menu-item index="2-1">BOOK</el-menu-item>
                                    <el-menu-item index="2-2">BUDDHIST</el-menu-item>
                                    <el-menu-item index="2-3">BJX</el-menu-item>
                                    <el-menu-item index="2-4">FOOD</el-menu-item>
                                    <el-menu-item index="2-5">MOVIE</el-menu-item>
                                    <el-menu-item index="2-6">PICTURE</el-menu-item>
                                    <el-menu-item index="2-7">VIDEO</el-menu-item>
                                    <el-menu-item index="2-8">TV</el-menu-item>
                                </el-submenu>
                                <el-submenu index="3">
                                    <div slot="title">
                                        <i class="el-icon-setting"/>
                                        <span>LOG</span>
                                    </div>
                                    <el-menu-item index="/log">REQUEST LOG</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <keep-alive>
                        <router-view v-if="this.$route.meta.keepAlive"/>
                    </keep-alive>
                    <router-view v-if="!this.$route.meta.keepAlive"/>
                </el-main>
            </el-container>
        </el-container>
        <div class="login-zzc" v-show="loginBox">
            <LoginBox @loginAfter="loginAfter"/>
        </div>
    </div>
</template>

<script>
    import "@/assets/css/structure.css"
    import Header from "@/components/structure/Header";
    import LoginBox from "@/components/LoginBox";
    import session from "@/assets/js/session";

    export default {
        name: 'Index',
        data() {
            return {
                //头部数据选择的菜单
                activeHeader: 'system',
                //用户数据
                user: {},
                //token检查循环id
                intervalId: 0,
                //登陆弹窗
                loginBox: false
            }
        },
        created() {
            //token检查
            this.tokenCheck(true);
        },
        methods: {
            menuSelect(index) {
                this.$store.commit('changeMenu',index);
            },
            loginAfter() {
                this.loginBox = false;
                this.tokenCheck(false);
            },
            tokenCheck(first) {
                let that = this;
                //设置每5秒检查一次token
                //鉴于setInterval的初次不执行，需要先执行一次，在执行setInterval
                //再执行setInterval时，如果第一次已经跳转，则SetInterval会报错，因此加上一个返回值
                if (first) {
                    if (this.tokenCheckDo(0)) {
                        //查询当前用户
                        this.queryUser();
                        //token轮循检查
                        that.intervalId = setInterval(function () {
                            that.tokenCheckDo(that.intervalId);
                        },5000);
                    }
                } else {
                    //查询当前用户
                    this.queryUser();
                    //token轮循检查
                    that.intervalId = setInterval(function () {
                        that.tokenCheckDo(that.intervalId);
                    },5000);
                }
            },
            tokenCheckDo(interval) {
                let that = this;
                let token = session.getToken();
                //有token，expire参数，并且expire大于当前时间，表示没有过期
                //加个 ‘!’ 表示需要登录
                if (!(null != token && token.expire >= new Date().getTime())) {
                    session.removeToken();
                    //> 0表示不是第一次检查，则弹框登录
                    if (interval > 0) {
                        clearInterval(interval);
                        that.user = {};
                        that.loginBox = true;
                    } else {
                        that.$router.push('/login');
                    }
                    return false;
                }
                return true;
            },
            queryUser() {
                let that = this;
                this.$axios.get('/api/sys/user').then(res => {
                    let data = res.data;
                    if (data && data.code === 200) {
                        that.user = data.data;
                    } else {
                        that.$message.warning('Query User Error.');
                    }
                }).catch(function () {
                    that.$message.error("Internet Error");
                })
            }
        },
        components: {
            Header,
            LoginBox
        }
    };
</script>

<style scoped>

</style>