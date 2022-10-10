<template>
  <table>
    <thead>
      <tr>
        <th>Дата</th>
        <th>Название</th>
        <th>Количество</th>
        <th>Расстояние</th>
      </tr>
    </thead>
    <tbody>
      <tr class="hello" v-for="row in dataTable" v-bind:key="row.id">
        <td>{{row.date.split('T')[0]}}</td>
        <td>{{row.name}}</td>
        <td>{{row.amount}}</td>
        <td>{{row.distance}}</td>
      </tr>
      <tr v-if="dataTable.length === 0" rowspan="3">
        <td colspan="4"><strong>По заданным фильтрам данных не найдено</strong></td>
      </tr>
    </tbody>
  </table>

</template>

<script>
export default {
  name: 'ProductsTable',
  props: {
    dataTable:{
      type:Array
    }
  
  },
  mounted(){
    console.log(this.dataTable);

  }
}
</script>

<style>
th, td{
  padding: 5px 5px ;
  /* min-width: 40px; */

}
tr{
  vertical-align: baseline;
}
table{
  margin-top: 20px;
  min-height: 200px;
  display: block;
}

</style>
