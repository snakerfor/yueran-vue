<template>
  <a-modal title="操作" v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item v-show="false">
        <a-input v-decorator="['id']" />
      </a-form-item>
      <a-card class="dataCard" title="作品信息">
        <p>项目简介：{{ projectInfo.projectDesc }}</p>
        <p>当前阶段描述：{{ projectInfo.currentStage }}</p>
        <p>未来目标描述：{{ projectInfo.futureGoals }}</p>
        <p>项目logo：<img :src="projectInfo.logo" /></p>
      </a-card>

      <a-form-item label="作品层级">
        <a-select placeholder="请选择" v-decorator="['prodLevel']">
          <a-select-option :value="'\u0000'">请选择</a-select-option>
          <a-select-option :value="'0'">放弃</a-select-option>
          <a-select-option :value="'1'">通过</a-select-option>
          <a-select-option :value="'2'">优秀</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveProjectList, getProjectById } from '@/api/projectList'
import pick from 'lodash.pick'
export default {
  name: 'ProjectListModal',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      projectInfo: []
    }
  },
  methods: {
    edit (id) {
      this.form.resetFields()
      getProjectById(id).then(res => {
        if (res.code === 500) {
          this.$message.error('取得项目信息失败无法编辑，请稍后再试')
        } else {
          this.projectInfo = res
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(res, 'id', 'prodLevel'))
          })
        }
      }).catch(() => {
        this.$message.error('服务器失去连接，请稍后再试')
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          saveProjectList(values).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>

<style>
.dataCard p {
  margin-bottom: 0px;
}

.dataCard .ant-card-head-title {
  padding:8px 0;
  font-size:14px;
}

.dataCard .ant-card-head {
  min-height: 20px;
}
</style>
