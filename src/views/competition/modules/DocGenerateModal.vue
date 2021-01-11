<template>
  <a-modal title="操作" :width="600" v-model="visible" :confirmLoading="confirmLoading" @ok="handleSubmit">
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item label="模板名称">
        <a-input placeholder="模板名称" v-decorator="['templateName', {rules: [{required: true, message: '请输入模板名称'}]}]" />
      </a-form-item>
      <a-form-item label="数据源（表名）">
        <a-input placeholder="数据源" v-decorator="['dataSource', {rules: [{required: true, message: '请输入数据源'}]}]" />
      </a-form-item>
      <a-form-item label="数据索引（字段名）">
        <a-input placeholder="数据所引" v-decorator="['dataIndex', {rules: [{required: true, message: '请输入数据索引'}]}]" />
      </a-form-item>
      <a-form-item label="doc模板文件">
        <a-select v-decorator="['fileId', {rules: [{required: true, message: '请输入数据索引'}]}]" >
          <a-select-option v-for="fileItem in fileList" :key="fileItem.fileId" :value="fileItem.fileId">
            {{ fileItem.fileName }} [{{ fileItem.fileId }}]
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveDocumentGen, getDocumentGenById } from '@/api/docGen'
import { getFileList } from '@/api/system'
import pick from 'lodash.pick'

export default {
  name: 'DocGenerateModal',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      fileList: []
    }
  },
  methods: {
    // 文件列表加载
    loadFileList () {
      getFileList().then(res => {
        if (res.code === 0) {
          this.fileList = res.rows
        } else {
          this.$message.error('获取文件列表失败')
        }
      }).catch(() => {
        this.$message.error('服务器失去连接，请稍后再试')
      })
    },
    add () {
      this.visible = true
      this.$nextTick(() => {
        this.form.resetFields()
        // 标记 新增时提交id=0
        this.form.setFieldsValue({ id: 0 })
      })
    },
    edit (id) {
      this.form.resetFields()
      getDocumentGenById(id).then(res => {
        if (res.code === 500) {
          this.$message.error('取得模板信息失败无法编辑，请稍后再试')
        } else {
          this.visible = true
          this.$nextTick(() => {
            this.form.setFieldsValue(pick(Object.assign(res), 'id', 'templateName', 'dataSource', 'dataIndex', 'fileId'))
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
          // 保存文章
          saveDocumentGen(values).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              // 给父组件回传状态触发列表数据刷新
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
  },
  mounted () {
    this.loadFileList()
  }
}
</script>
