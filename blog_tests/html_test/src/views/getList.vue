<template>
  <div>
    <el-button type="primay" @click="show_new = true">新建博客</el-button>
    <el-table :data="blogList.data" style="width: 80%">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Author" prop="author"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="更新" :visible.sync="show_update" width="50%">
      <el-form :model="blogList">
        <el-form-item label="标题">
          <el-input v-model="blogList.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="blogList.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建" :visible.sync="show_new" width="50%">
      <el-form :model="newBlog">
        <el-form-item label="标题">
          <el-input v-model="newBlog.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="newBlog.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleNew">新 建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogList: {},
      newBlog:{
        title:'',
        content:''
      },
      show_update: false,
      show_new: false
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    handleNew() {
      if(this.newBlog.title && this.newBlog.content){
        this.axios.post('/api/blog/new', this.newBlog).then(resp=>{
          console.log(resp)
        })
      }
    },
    submitUpdate() {
      this.axios.post("/api/blog/update", this.blogList).then(resp => {
        console.log(resp);
        this.show_update = false;
      });
    },
    getBlogList() {
      this.axios.get("/api/blog/list?isAdmin=1").then(resp => {
        if (resp.status === 200) {
          this.blogList = resp.data;
          console.log(this.blogList.data);
        } else {
          this.$message.error("请求博客列表数据出错！");
        }
      });
    },
    handleDetail(index, row) {
      this.axios.get("/api/blog/detail?id=" + row.id).then(resp => {
        if (resp.status === 200) {
          alert(resp.data.data.content);
        } else {
          this.$message.error("请求博客列表数据出错！");
        }
      });
    },
    handleEdit(index, row) {
      this.blogList = row;
      this.show_update = true;
    },
    handleDelete(index, row) {
      let params = {
        id: row.id,
        author: row.author
      };
      this.axios.post("/api/blog/del", params).then(resp => {
        console.log(resp);
      });
    }
  }
};
</script>

<style scoped>
</style>