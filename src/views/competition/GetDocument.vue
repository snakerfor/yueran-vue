<template>
  <a-card :bordered="false">
    <a-form class="genForm" :form="form">
      <a-row :gutter="24">
        <a-col
          v-for="dataIndex in dataIndexList"
          :key="dataIndex"
          :span="8">
          <a-form-item :label="dataIndex">
            <a-input v-decorator="[dataIndex, {rules: [{required: true, message: `请输入${dataIndex}`}]}]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider dashed />
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-select
            default-value="选择一个模板"
            style="width: 200px"
            @change="handleTemplateChange">
            <a-select-option v-for="(templateItem, index) in templateList" :key="templateItem.id" :value="index">
              {{ templateItem.templateName }}
            </a-select-option>
          </a-select>
          <a-button :style="{ marginLeft: '8px' }" type="primary" @click="handleSubmit">
            生成
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            清空
          </a-button>
        </a-col>
      </a-row>
    </a-form>

    <!-- 结果展示 -->
    <div class="resultShow">
      <a-spin :spinning="spinning" />
      <img :src="`data:image/png;base64,${imgItem}`" v-for="(imgItem, index) in imgBase64List" :key="index" />
    </div>
  </a-card>

</template>

<script>
import { getDocumentGenList, documentGen } from '@/api/docGen'

export default {
  name: 'GetDocument',
  data () {
    return {
      description: '依据文档模版导出文档，务必正确填写表单',
      expand: false,
      form: this.$form.createForm(this),
      templateList: [],
      dataIndexList: [],
      // 当前选中的模板id
      templateId: 0,
      spinning: false,
      imgBase64List: []
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        this.spinning = true
        if (!err) {
          documentGen(this.templateId, values).then(res => {
            if (res.code === 0) {
              this.spinning = false
              this.imgBase64List = res.data
            } else {
              this.$message.error(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          })
        }
      })
    },
    handleTemplateChange (i) {
      this.templateId = this.templateList[i].id

      var dataIndex = this.templateList[i].dataIndex
      this.dataIndexList = dataIndex.split(',')
    },
    handleReset () {
      this.form.resetFields()
    },
    loadTemplateList () {
      getDocumentGenList().then(res => {
        if (res.code === 0) {
          this.templateList = res.rows
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted () {
    this.loadTemplateList()
  }

}
</script>

<style>
.genForm {
  padding: 24px;
  background: #ccc;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.resultShow {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  margin: 20px 0;
}
</style>
