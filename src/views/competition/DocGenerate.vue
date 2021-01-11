<template>
  <div>
    <a-collapse defaultActiveKey="1" :bordered="false" style="position:relative">
      <a-collapse-panel header="模板搜索">
        <div class="table-page-search-wrapper">
          <a-form :form="form" layout="inline">
            <a-row :gutter="16">
              <a-col class="inputWrap" :md="6">
                <a-form-item label="模板名称">
                  <a-input placeholder="请输入模板名称" v-decorator="['templateName']" />
                </a-form-item>
              </a-col>
              <a-col class="inputWrap" :md="6">
                <a-form-item label="数据源">
                  <a-input placeholder="请输入数据源" v-decorator="['dataSource']" />
                </a-form-item>
              </a-col>
              <a-col :md="6"><!-- 不写满宽度 剩余宽度自适应 -->
                <span class="table-page-search-submitButtons">
                  <a-button type="primary" @click="getListSearchData">查询</a-button>
                  <a-button style="margin-left: 8px" @click="resetSearch">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-collapse-panel>
    </a-collapse>

    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>
      </div>

      <s-table ref="table" rowKey="id" :columns="columns" :data="loadData" defaultSort="id">
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="delById(record.id)">删除</a>
        </span>
      </s-table>
      <docGenerate-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getDocumentGenList, delDocumentGen } from '@/api/docGen'
import DocGenerateModal from './modules/DocGenerateModal.vue'

export default {
  name: 'TableList',
  components: {
    STable,
    DocGenerateModal
  },
  data () {
    return {
      description: '文档生成模板管理',
      form: this.$form.createForm(this),
      // 表头
      columns: [
        {
          title: '模板id',
          dataIndex: 'id',
          width: 80
        },
        {
          title: '模板名称',
          dataIndex: 'templateName',
          width: 180
        },
        {
          title: '数据源（表名）',
          dataIndex: 'dataSource',
          width: 180
        },
        {
          title: '数据索引（字段名）',
          dataIndex: 'dataIndex'
        },
        {
          title: '模板文件id',
          dataIndex: 'fileId',
          width: 280
        },
        {
          title: '操作',
          width: 110,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 搜索参数
      queryParam: [],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getDocumentGenList(Object.assign(parameter, this.queryParam))
      }
    }
  },
  methods: {
    getListSearchData (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam = values
          this.handleOk()
        }
      })
    },
    resetSearch () {
      this.form.resetFields()
      this.queryParam = []
      this.handleOk()
    },
    handleAdd () {
      this.$refs.modal.add()
    },
    handleEdit (record) {
      this.$refs.modal.edit(record.id)
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    delById (id) {
      delDocumentGen(id).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
