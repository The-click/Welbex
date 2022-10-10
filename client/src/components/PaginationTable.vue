<template >
    <div class="pag" v-if="items > 1">
        <div class="pag__item"
              v-bind:class="{'active': i === page}"   
              v-for="i of items" 
              v-bind:key="i"
              v-on:click="changePage(i)"
              
              >{{i}}</div>

    </div>
</template>
<script>
export default {
    name: 'PaginationTable',
  props: {
    allRows:{
      type:Number
    },
    page:{
        type:Number,
    },
    limit:{
        type:Number,
    }

  },

  methods:{
    changePage(newPage){
        this.$emit('change-page', newPage)
    }

  },


  computed: {
    items: function() {
        return Math.ceil(this.allRows / this.limit)
    }
  }
    
}
</script>
<style >
.pag{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}
.pag__item{
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid black;
    cursor: pointer;
}
.pag__item.active{
    border: 3px solid blue;
}
    
</style>