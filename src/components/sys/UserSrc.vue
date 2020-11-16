<template>
    <el-row>
        <el-col :span="24">
            <el-page-header @back="goBack" content="USER SRC"/>
        </el-col>
        <el-col :span="24">
            <div>
                <h1>User Src</h1>
                <h2>{{ this.$route.params.username }}</h2>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "UserSrc",
        methods: {
            goBack() {
                this.$router.push('/user')
            }
        }
    }
</script>

<style scoped>

</style>