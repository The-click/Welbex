<template>
  <ProductsFilter v-bind:filterCol="filterCol"
                  v-bind:filterBy="filterBy"
                  v-model:selectCol="selectCol"
                  v-model:selectBy="selectBy"
                  v-model:textQuery="textQuery"
                  v-model:isFilter="isFilter"/>

  <ProductsTable v-bind:dataTable="dataTable"/>

  <PaginationTable v-bind:allRows="allRows" 
                   v-bind:page="page" 
                   v-bind:limit="limit"
                   v-on:change-page="changePage"/>

</template>

<script>
import ProductsTable from './components/ProductsTable.vue'
import { getAllData, getFilterData } from './http/tableAPI';
import PaginationTable from './components/PaginationTable.vue';
import ProductsFilter from './components/ProductsFilter.vue';

export default {
  name: 'App',
  components: {
    ProductsTable,
    PaginationTable,
    ProductsFilter
},
  data(){
    return{
      dataTable:[],
      page:1,
      limit:5,
      allRows:0,
      filterCol: [
        {value:'name', name:"По названию"},
        {value:"amount", name:"По количеству"},
        {value:"distance", name:"По расстоянию"}
      ],
      filterBy:[
        {value:'up', name:"По возрастанию"},
        {value:'down', name:"По убыванию"},
        {value:'contains', name:"По содержимому"},
        {value:'equals', name:"Точное совпадение"},
      ],
      selectCol:'name',
      selectBy:'up',
      textQuery:'',
      isFilter: false,
    }
  },
  methods:{
    async fetchData(){
      try {
        let data; 
        if (this.isFilter){
          data = await getFilterData(this.selectCol, this.selectBy, this.textQuery, this.page, this.limit);
        }else{
          data = await getAllData(this.page, this.limit);
        }
        this.dataTable = data; 
        this.allRows = +data[0]?.all_count;
      } catch (e) {
        console.log(e);
        alert('Ошибка'); 
      }
    },
    changePage(newPage){
      this.page = newPage;
    }
  },
  mounted(){
    this.fetchData();
  },
  watch:{
    page(){
      this.fetchData();
    },
    isFilter(){      
      this.fetchData();
    }
  }
 
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display:flex;
  flex-direction: column;
  align-items: center;
}

</style>
