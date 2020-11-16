<template>
    <el-row>
        <el-col :span="24">
            <el-page-header @back="goBack" content="USER ADD"/>
        </el-col>
        <el-col :span="24">
            <div>
                <h1>User ADD</h1>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "UserAdd",
        methods: {
            goBack() {
                this.$router.push('/user')
            }
        }
    }
</script>

<style scoped>

</style>