<template>
    <el-row>
        <el-col :span="24">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">ROOT</el-breadcrumb-item>
                <el-breadcrumb-item>USER</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24" style="padding: 10px 0; text-align: right">
            <el-button-group>
                <el-button plain type="success" icon="el-icon-edit" @click="add">ADD</el-button>
                <el-button plain type="primary" icon="el-icon-share">CHECKED OUT</el-button>
                <el-button plain type="danger" icon="el-icon-delete">GROUP DELETE</el-button>
            </el-button-group>
        </el-col>
        <el-col :span="24">
            <el-table v-loading="loadStatus" ref="multipleTable" :data="users" border @selection-change="selectChange">
                <el-table-column fixed type="selection" width="60"/>
                <el-table-column prop="id" label="ID" width="150"/>
                <el-table-column prop="username" label="LOGIN NAME" width="160"/>
                <el-table-column prop="locked" label="IS LOCKED" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.locked" class="un">LOCKED</span>
                        <span v-else class="ok">OK</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expired" label="IS EXPIRED" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.expired" class="un">EXPIRED</span>
                        <span v-else class="ok">OK</span>
                    </template>
                </el-table-column>
                <el-table-column prop="enabled" label="ENABLED" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.enabled" class="ok">OK</span>
                        <span v-else class="un">UNABLE</span>
                    </template>
                </el-table-column>
                <el-table-column prop="client" label="CLIENT NAME" width="160"/>
                <el-table-column label="METHODS">
                    <template slot-scope="scope">
                        <el-button plain @click="src(scope.row.username)" type="warning" size="small">SRC</el-button>
                        <el-button plain @click="edit(scope.row.id)" type="primary" size="small">EDIT</el-button>
                        <el-button plain @click="del(scope.row.id)" type="danger" size="small">DEL</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.page"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-col>
    </el-row>
</template>

<script>
    import qs from 'qs'

    export default {
        name: "UserList",
        data() {
            return {
                users: [],
                total: 0,
                params: {
                    type: 'page',
                    page: 1,
                    size: 10,
                },
                loadStatus: true
            }
        },
        created() {
            this.queryUser();
        },
        methods: {
            handleSizeChange(size) {
                this.params.size = size;
                this.queryUser();
            },
            handleCurrentChange(page) {
                this.params.page = page;
                this.queryUser();
            },
            src(username) {
                console.log(username);
                this.$router.push('/user/src/' + username);
            },
            add() {
                this.$router.push('/user/add')
            },
            edit(id) {
                console.log(id)
            },
            del(id) {
                console.log(id)
            },
            selectChange(value) {
                console.log(value);
            },
            loadUser(data) {
                this.users = data.data;
                this.total = data.total;
            },
            queryUser() {
                this.loadStatus = true;
                let that = this;
                setTimeout(function () {
                    that.$axios.get('/api/sys/users?' + qs.stringify(that.params))
                    .then(function (res) {
                        that.loadStatus = false;
                        let data = res.data;
                        if (data && data.code === 200) {
                            that.loadUser(data.data);
                        } else {
                            that.$message.error('Failed to load Users');
                        }
                    }).catch(function () {
                        that.loadStatus = false;
                        that.$message.error('Failed to load Users');
                    });
                },500);
            }
        }
    }
</script>

<style scoped>
    .ok {
        color: yellowgreen;
        font-weight: bold;
    }
    .un {
        color: red;
        font-weight: bold;
    }
</style>