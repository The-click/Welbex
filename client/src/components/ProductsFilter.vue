<template >
    <div>
        <select v-on:selectCol="selectCol" @change="changeColumn">
            <option disabled value="">Колонка</option>
            <option v-for="column in filterCol"
                    v-bind:value="column.value"
                    v-bind:key="column.value"
                    >
                    {{column.name}}          
                </option>
        </select>
        <select v-on:selectBy="selectBy" @change="changeBy">
            <option disabled value="">Фильтр</option>
            <option v-for="option in filterBy"
                    v-bind:value="option.value"
                    v-bind:key="option.value"
                    >
                    {{option.name}}          
            </option>
        </select>
        <input v-bind:type="selectBy === 'equals' ? 'number' : 'text'"
               v-if="selectBy === 'contains' || selectBy === 'equals'"
               v-on:textQuery="textQuery"
               v-on:input="changeQuery"
               >
        <button v-on:click="changeIsFilter">
        {{isFilter ? "Сбросить фильтр": "Применить фильтр"}}
        </button>
        
        
    </div>
</template>
<script>
export default {
    name:"ProductFilter",
    props:{
        selectBy:{
            type:String
        },
        selectCol:{
            type:String
        },
        filterBy:{
            type:Array,
            default: ()=>[]
        },
        filterCol:{
            type:Array,
            default: ()=>[]
        },
        textQuery:{
            type:String
        },
        isFilter:{
            type:Boolean
        }
    },


    methods:{
        changeColumn(event){
            this.$emit('update:selectCol', event.target.value)
        },
        changeQuery(event){
            this.$emit('update:textQuery', event.target.value)
        },
        changeBy(event){
            this.$emit('update:selectBy', event.target.value)
        },
        changeIsFilter(){
            this.$emit('update:isFilter', !this.isFilter)
        }
    },
    

    
}
</script>
<style >
    
</style>