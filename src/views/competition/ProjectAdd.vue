<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item label="项目名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['name', {rules: [{ required: true, message: '请输入项目名称' }]}]" placeholder="请输入项目名称" />
      </a-form-item>
      <a-form-item label="项目简介" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea v-decorator="['projectDesc', {rules: [{ required: true, message: '请输入项目简介' }]}]" placeholder="请输入项目简介" :rows="4" />
      </a-form-item>
      <a-form-item label="负责人" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['leader', {rules: [{ required: true, message: '请输入负责人' }]}]" placeholder="请输入负责人" />
      </a-form-item>
      <a-form-item label="项目成员" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['projectMember', {rules: [{ required: true, message: '请输入项目成员' }]}]" placeholder="请输入项目成员" />
      </a-form-item>
      <a-form-item label="当前阶段描述" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea v-decorator="['currentStage', {rules: [{ required: true, message: '请输入当前阶段描述' }]}]" placeholder="请输入当前阶段描述" :rows="4" />
      </a-form-item>
      <a-form-item label="未来目标描述" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea v-decorator="['futureGoals', {rules: [{ required: true, message: '请输入未来目标描述' }]}]" placeholder="请输入未来目标描述" :rows="4" />
      </a-form-item>
      <a-form-item label="经营范围" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['businessScope', {rules: [{ required: true, message: '请输入经营范围' }]}]" placeholder="请输入经营范围" />
      </a-form-item>
      <a-form-item label="联系电话" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['phoneNumber', {rules: [{ required: true, message: '请输入联系电话' }]}]" placeholder="请输入联系电话" />
      </a-form-item>
      <a-form-item label="经营地址" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['businessAddress', {rules: [{ required: true, message: '请输入经营地址' }]}]" placeholder="请输入经营地址" />
      </a-form-item>
      <a-form-item label="项目logo" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <input type="file" ref="fileHandle" hidden/>
        <a-button type="primary" shape="round" icon="upload" :size="size" @click="fileOpen">上传Logo</a-button>
        <a-input v-decorator="['logo', {rules: [{ required: true, message: '请输入经营地址' }]}]" hidden/>
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
// 导入接口函数
import { saveProjectList } from '@/api/projectList'
export default {
  components: {
  },
  data () {
    var pageData = {
      // 页面描述
      description: '孵化项目添加，填写项目信息并提交',
      form: this.$form.createForm(this)
    }
    return pageData
  },
  methods: {
    // 提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveProjectList(values).then(res => {
            if (res.code === 0) {
              this.$message.success('项目申报信息提交成功')
            } else {
              this.$message.error('项目申报信息提交失败，检查信息有效性后重试')
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    fileOpen () {
      var fileHandle = this.$refs.fileHandle
      var form = this.form
      fileHandle.click()
      fileHandle.onchange = function () {
        var file = fileHandle.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          form.setFieldsValue({ logo: this.result })
          // this.base64Logo = this.result
          console.log(this.result)
        }
      }
    }
  }
}
</script>
