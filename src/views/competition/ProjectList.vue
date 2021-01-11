<template>
  <div>
    <a-collapse defaultActiveKey="1" :bordered="false" style="position:relative">
      <a-collapse-panel header="模糊搜索">
        <div class="table-page-search-wrapper">
          <a-form :form="form" layout="inline">
            <a-row :gutter="16">
              <a-col class="inputWrap" :md="6">
                <a-form-item label="项目名称">
                  <a-input placeholder="请输入项目名称" v-decorator="['name']" />
                </a-form-item>
              </a-col>
              <a-col class="inputWrap" :md="6">
                <a-form-item label="负责人">
                  <a-input placeholder="请输入负责人" v-decorator="['leader']" />
                </a-form-item>
              </a-col>
              <a-col class="inputWrap" :md="6">
                <a-form-item label="联系电话">
                  <a-input placeholder="请输入联系电话" v-decorator="['phoneNumber']" />
                </a-form-item>
              </a-col>
              <a-col class="inputWrap" :md="6">
                <a-form-item label="作品层级">
                  <a-select placeholder="请选择" v-decorator="['prodLevel']">
                    <a-select-option :value="'\u0000'">请选择</a-select-option>
                    <a-select-option :value="'0'">放弃</a-select-option>
                    <a-select-option :value="'1'">通过</a-select-option>
                    <a-select-option :value="'2'">优秀</a-select-option>
                  </a-select>
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
      <s-table
        size="default"
        ref="table"
        rowKey="id"
        :columns="columns"
        :data="loadData"
      >
        <!-- 作品层级列表自定义渲染 -->
        <span slot="prodLevelCustom" slot-scope="prodLevelData">
          <a-tag :color="prodLevelData === '0' ? 'orange' : (prodLevelData === '1' ? 'geekblue' : (prodLevelData === '2' ? 'green' : 'red'))">
            {{ prodLevelData === '0' ? '放弃' : (prodLevelData === '1' ? '通过' : (prodLevelData === '2' ? '优秀' : '未审批')) }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record.id)">审批</a>
          <a-divider type="vertical" />
          <a @click="delById(record.id)">删除</a>
        </span>
      </s-table>
      <projectList-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getProjectList, delProjectList } from '@/api/projectList'
import ProjectListModal from './modules/ProjectListModal.vue'

export default {
  name: 'TableList',
  components: {
    STable,
    ProjectListModal
  },
  data () {
    return {
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '索引id',
          dataIndex: 'id'
        },
        {
          title: '项目名称',
          dataIndex: 'name',
          width: 200
        },
        {
          title: '负责人',
          dataIndex: 'leader'
        },
        {
          title: '项目成员',
          dataIndex: 'projectMember',
          width: 100
        },
        {
          title: '经营范围',
          dataIndex: 'businessScope'
        },
        {
          title: '联系电话',
          dataIndex: 'phoneNumber'
        },
        {
          title: '经营地址',
          dataIndex: 'businessAddress'
        },
        {
          title: '项目层级',
          dataIndex: 'prodLevel',
          scopedSlots: { customRender: 'prodLevelCustom' },
          width: 100
        },
        {
          title: '创建人',
          dataIndex: 'createBy'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 110,
          sorter: true
        },
        {
          title: '操作',
          width: '110px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getProjectList(Object.assign(parameter, this.queryParam))
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
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    delById (id) {
      delProjectList(id).then(res => {
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
