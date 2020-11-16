<template>
    <div class="login-box">
        <el-form v-loading="loading" label-position="right" :model="form" @submit.native.prevent>
            <h2>LOGIN</h2>
            <p style="color: red">Login token is expired, Please Login Again.</p>
            <el-form-item label="USERNAME">
                <el-input v-model="form.username" ref="usernameInput" />
            </el-form-item>
            <el-form-item label="PASSWORD">
                <el-input v-model="form.password" @keyup.enter.native="submitForm(form)"/>
            </el-form-item>
            <el-button type="primary" @click="submitForm(form)">LOGIN</el-button>
        </el-form>
    </div>
</template>

<script>
    import qs from 'qs'
    import session from "@/assets/js/session";

    export default {
        name: "LoginBox",
        data() {
            return {
                loading: false,
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submitForm(form) {
                this.loading = true;
                let that = this;
                let params = {
                    client_id: '1001001',
                    client_secret: 'admin',
                    grant_type: 'password',
                    username: form.username,
                    password: form.password
                };
                if (form.username.length > 0 && form.password.length > 0) {
                    this.$axios.get('/oauth/token?' + qs.stringify(params))
                    .then(function (res) {
                        let data = res.data;
                        setTimeout(function () {
                            //转转停掉
                            that.loading = false;
                            //判断数据是否正确
                            if (session.setToken(data)) {
                                that.emptyForm();
                                //关闭弹窗，事件触发
                                that.$emit('loginAfter');
                            } else {
                                that.$message.warning("Failed to Login,check your username or password.")
                            }
                        },500);
                    }).catch(function () {
                        that.$message.warning("Failed to Login,check your username or password.");
                        that.loading = false;
                    })
                } else {
                    this.$message.warning("Please enter your username and password");
                    that.loading = false;
                }
            },
            emptyForm() {
                this.form.username = '';
                this.form.password = '';
            }
        }
    }
</script>

<style scoped>
    .login-box {
        width: 400px;
        height: 360px;
        border: 1px solid #e1e1e1;
        background-color: #ffffff;
        padding: 20px 40px;
        text-align: center;
        position: absolute;
        top: calc(50% - 200px);
        left: calc(50% - 240px);
    }
</style>