<template>
  <v-data-table
    :headers="headers"
    :items="pagelinks"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>PageLink 外链管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >新的链接</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.linkName" label="链接名称"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.linkUrl" label="链接地址(http)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.linkIcon" label="图标"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: '链接名称', value: 'linkName' },
        { text: '链接地址(http)', value: 'linkUrl' },
        { text: '图标', value: 'linkIcon' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      pagelinks: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新的链接' : '编辑链接'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
        this.loaditem ()
    },
    methods: {
      loaditem () {
          this.axios.get('/api/loadpagelinks').then(resp => {
            if (resp && resp.data.code === 200) {
                this.pagelinks = resp.data.result;
            }
          })
      },
      editItem (item) {
        this.editedIndex = this.pagelinks.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        confirm('确认删除此链接?') && this.axios.post('/api/admin/deletepagelinks',item).then(resp => {
            if (resp && resp.data.code === 200) {
                this.loaditem ()
            }
        })
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        this.axios.post('/api/admin/addpagelinks',this.editedItem).then( resp => {
            if (resp && resp.data.code === 200) {
                this.loaditem ()
            }
        })
        this.close()
      },
    },
  }
</script>