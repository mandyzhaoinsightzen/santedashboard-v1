<template>
    <div class="container">
        <div class="user"> 
           <v-row>
                <v-col span="8">
                   <v-input placeholder="name" v-model="value"  @blur="blur('blur')"></v-input>
                </v-col>
                 <!-- <v-col span="8">
                    <v-input placeholder="name" v-model="value"  @blur="blur('blur')"></v-input>
                </v-col> -->
                <v-col span="8">
                     <v-button type="primary" size="large">Search</v-button>
                </v-col>
          </v-row>
        </div>
         <v-data-table :data='loadData' :columns='columns' class="dataTable"></v-data-table>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data: function () {
            return {
                value:'',
                loadData(pramas) {
                    return axios.get("static/datatable.json",pramas).then(res =>{
                        return res.data;
                    });
                },
                columns:[
                    {title:"Code",field:'album'},
                    {title:"Account",field:'name'},
                    {title:"Organization",field:'time'},
                    {title:"Role Type",field:'singer'},
                    {title:"Create Data",field:'time'},
                ]
            }
        },
        methods:{
            
        }
    }
</script>
<style>
.container{
    text-align: center;
    overflow: hidden;
    margin: 0 auto;
    width: 80%;
    display: block;
  
}
.user{
    position: inherit;
    padding-top: 15%;
}
.dataTable{margin:30px auto;width: 80%;height: 300px;}
</style>