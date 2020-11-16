<template>
    <el-row>
        <el-col :span="12">
            <div class="root-title">
                <router-link to="/">KEEP YOUNGER</router-link>
            </div>
        </el-col>
        <el-col :span="12">
            <el-menu mode="horizontal" :default-active="activeHeader" style="box-sizing: border-box;float: right">
                <el-menu-item index="system">
                    <router-link to="/" tag="span">SYSTEM</router-link>
                </el-menu-item>
                <el-menu-item index="manager">
                    <router-link to="/manager" tag="span">MANAGER</router-link>
                </el-menu-item>
                <el-submenu index="user_center">
                    <template slot="title">{{user.username}}</template>
                    <el-menu-item index="personal" style="height: 60px; border-bottom: 1px solid #fafafa;">
                        <el-row>
                            <el-col :span="8" style="padding: 10px 0">
                                <el-avatar :src="user.image" style="padding: 0"/>
                            </el-col>
                            <el-col :span="16" style="line-height: 60px;">
                                <span>{{user.username}}</span>
                            </el-col>
                        </el-row>
                    </el-menu-item>
                    <el-menu-item index="setting" style="border-bottom: 1px solid #fafafa">SETTING</el-menu-item>
                    <el-menu-item index="logout" @click="logout">LOGOUT</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
    import session from "@/assets/js/session";

    export default {
        name: "Header",
        props: {
            activeHeader: String,
            user: Object,
            intervalId: Number
        },
        methods: {
            logout() {
                if (this.intervalId > 0)
                    clearInterval(this.intervalId);
                session.removeToken();
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>