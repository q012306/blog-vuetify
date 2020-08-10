<template>
<div style="margin:32px auto;max-width:1000px;">
    <v-card style="margin:10px;padding:10px">

        <v-skeleton-loader
        class="mx-auto"
        type="card"
        v-if="friends==''||friends==null"
        ></v-skeleton-loader>

        <div v-for="friend in friends" :key="friend.id">
          <v-card style="margin:10px;" dark>
            <v-img
            height="200px"
            gradient="to right,rgba(25,32,72,.7),rgba(100,115,201,.33)"
            :src="friend.friendBackGroundImgUrl"
            >
            <v-card-title class="headline">
                <v-avatar size="64" style="margin-right:12px;margin-bottom:16px;">
                    <img :src="friend.friendAvatar">
                </v-avatar>
                {{friend.friendName}}
            </v-card-title>
            <v-card-subtitle>{{friend.friendAbstract}}</v-card-subtitle>
            <v-card-actions>
                <v-btn :href='friend.friendPageUrl' text>进去看看</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                v-if="$store.state.status>=2"
                color="orange"
                @click="newfriend = friend;dialog = true"
                >
                修改</v-btn>       
                <v-btn
                v-if="$store.state.status>=2"
                @click="deleteFriends(friend)"
                color="red">
                删除</v-btn>       
            </v-card-actions>
           </v-img>
          </v-card>
        </div>

        <v-btn
            v-if="$store.state.status>=2"
            absolute
            fab
            bottom
            right
            style="z-index:2"
            @click="dialog = true"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">修改/添加</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="newfriend.friendName"
                            label="昵称"
                        ></v-text-field>
                        <v-text-field
                            v-model="newfriend.friendPageUrl"
                            label="主页Url"
                        ></v-text-field>
                        <v-text-field
                            v-model="newfriend.friendAbstract"
                            label="描述"
                        ></v-text-field>
                        <v-text-field
                            v-model="newfriend.friendAvatar"
                            label="头像Url"
                        ></v-text-field>
                        <v-text-field
                            v-model="newfriend.friendBackGroundImgUrl"
                            label="卡片背景图片Url"
                        ></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="newfriend={};dialog = false">关闭</v-btn>
                        <v-btn color="blue darken-1" text @click="saveFriends();dialog = false">保存</v-btn>
                    </v-card-actions>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</div>
</template>

<script>
export default {
    data(){
        return{
            friends:[],
            newfriend:{},
            dialog:false
        }
    },
    mounted(){
        this.loadFriends()
    },
    methods:{
        loadFriends(){
            this.axios.get('/api/loadfriends').then(resp=>{
                if (resp && resp.data.code === 200) {
                    this.friends = resp.data.result
                }
            })
        },
        deleteFriends(friend){
            this.axios.post('/api/admin/deletefriends',friend).then(resp=>{
                if (resp && resp.data.code === 200) {
                    this.loadFriends()
                }
            })
        },
        saveFriends(){
            this.axios.post('/api/admin/savefriends',this.newfriend).then(resp=>{
                if (resp && resp.data.code === 200) {
                    this.loadFriends()
                    this.newfriend={}
                }
            })
        },
    }
    
}
</script>

<style scoped>

</style>