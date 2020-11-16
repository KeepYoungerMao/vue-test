<template>
    <el-container>
        <el-header>
            <Header v-bind:active_header="activeHeader" v-bind:user="user"/>
        </el-header>
        <el-container>
            <el-aside style="width: 300px !important; border: none">
                <el-row>
                    <el-col :span="24">
                        <el-menu style="border: none; margin-top: 50px">
                            <div style="width: 200px;height: 120px;line-height: 50px;font-size: 20px;padding-left: 20px;font-weight: bolder;color: #409EFF">
                                <span>KEEP</span><br>
                                <span>YOUNGER</span>
                            </div>
                            <el-menu-item index="log">
                                <router-link to="/manager" tag="span">LOGS UPDATE</router-link>
                            </el-menu-item>
                            <el-menu-item index="guide">DEVELOPMENT GUIDE</el-menu-item>
                            <el-menu-item index="install">
                                <router-link to="/manager/install" tag="span">INSTALL</router-link>
                            </el-menu-item>
                            <el-menu-item index="start">GET STARTED QUICKLY</el-menu-item>
                            <el-menu-item index="international">INTERNATIONAL</el-menu-item>
                            <el-menu-item index="theme">CUSTOM THEME</el-menu-item>
                            <div style="width: 200px; height: 50px; line-height: 50px;font-size: 18px;font-weight: bold;color: #409EFF;padding-left: 20px">COMPONENT</div>
                            <el-menu-item index="layout">LAYOUT</el-menu-item>
                            <el-menu-item index="container">CONTAINER</el-menu-item>
                            <el-menu-item index="color">COLOR</el-menu-item>
                            <el-menu-item index="typography">TYPOGRAPHY</el-menu-item>
                            <el-menu-item index="border">BORDER</el-menu-item>
                            <el-menu-item index="icon">ICON</el-menu-item>
                            <el-menu-item index="button">BUTTON</el-menu-item>
                            <el-menu-item index="link">LINK</el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from "@/components/structure/Header";

    export default {
        name: "Manager",
        data() {
            return {
                user: {
                    username: 'James Alex',
                    role: 'Admin',
                    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                activeHeader: 'manager'
            }
        },
        components: {
            Header
        }
    }
</script>

<style scoped>

</style>