<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="410">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  depressed
                  large
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  添加新文件
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">上传文件</v-card-title>
                <v-card-text>
                  <img-upload :limit="10" ref="imgUpload"></img-upload>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false; loadFileList()">完成</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.fileName"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-img
                class="white--text align-end"
                :src="'/api/file/' + item.fileName"
                height="200px"
                fit="cover">
                <v-card-title style="text-shadow: 2px 2px 2px #888888; font-weight: bold">{{'/api/file/' + item.fileName}}</v-card-title>
              </v-img>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item
                  v-for="(key, index) in keys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content v-if="key=='fileLastModified'" class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key] | dateformat('lll') }}</v-list-item-content>
                  <v-list-item-content v-else-if="key=='fileLength'" class="align-end" :class="{ 'blue--text': sortBy === key }">{{ (item[key]/1024).toFixed(2) }} KB </v-list-item-content>
                  <v-list-item-content v-else class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key] }}</v-list-item-content>
                </v-list-item>
              </v-list>
              <v-btn
                  absolute
                  fab
                  bottom
                  dark
                  right
                  style="z-index:2"
                  @click="dialog2.dialogShow = true; dialog2.fileName = item.fileName"
                  color="red"
              >
                  <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>

    <v-dialog
      v-model="dialog2.dialogShow"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">确认要删除嘛?</v-card-title>
        <v-card-text>
          一旦进行此操作则无法撤销，请确认是否删除。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog2.dialogShow = false;"
          >
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog2.dialogShow = false; deleteFile(dialog2.fileName)"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import ImgUpload from '../articles/ImgUpload'
  export default {
    components: {ImgUpload},
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: true,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'fileLastModified',
        keys: [
          'fileLastModified',
          'fileLength',
          'fileName',
        ],
        items: [],
        dialog: false,
        dialog2: {
          dialogShow: false,
          fileName: null
        },
        uploadFile: null,
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
    },
    mounted(){
        this.loadFileList()
    },
    methods: {
      loadFileList () {
        this.axios.get('/api/content/filelist').then(resp => {
            if (resp && resp.data.code === 200) {
                this.items = resp.data.result;
            }
        })
      },
      deleteFile (filename) {
        console.log(filename)
        this.axios.post('/api/admin/content/filedelete',{fileName: filename}).then(resp => {
            if (resp && resp.data.code === 200) {
                this.loadFileList()
            }
        })
      },
      changeFile (file) {
        this.uploadFile = file
      },
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
  }
</script>