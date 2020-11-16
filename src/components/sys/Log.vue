<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Root</el-breadcrumb-item>
            <el-breadcrumb-item>Log</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "Log"
    }
</script>

<style scoped>

</style>