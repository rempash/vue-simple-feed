<template>
   <div class="news-filter">
       <div class="search">
           <input type="text" v-model="query.title_like"  placeholder="Введите заголовк поста" @keyup.enter="setFilter()">
       </div>
       <div class="sort-by">
           <select v-model="query._sort" @change="setFilter()" >
               <option v-for="option in sortOptions" :key="option.value + Math.random()" :value="option.value">{{ option.title }}</option>
           </select>
       </div>
       <div class="sort-order">
           <select v-model="query._order" @change="setFilter()">
               <option v-for="option in orderOptions" :key="option.value" :value="option.value">{{ option.title }}</option>
           </select>
       </div>
   </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { QueryInterface } from '@/interfaces/query.interface';
import { SimpleOptionInterface } from '@/interfaces/simpleOption.interface';

@Component({
    
})
export default class NewsFilter extends Vue {

    private sortOptions: SimpleOptionInterface[] = [
        {
            title: 'Нет',
            value: ''
        },
        {
            title: 'Заголовки',
            value: 'title'
        },
        {
            title: 'Комментарии',
            value: 'comments'
        },
    ];
    
    private orderOptions: SimpleOptionInterface[] = [
         {
            title: 'Нет',
            value: ''
        },
        {
            title: 'Возрастанию',
            value: 'asc'
        },
        {
            title: 'Убыванию',
            value: 'desc'
        },
    ];

    private query: QueryInterface = {
        title_like: '',
        _sort: '',
        _order: ''
    };

    private setFilter(){
        this.$store.commit({
            type: 'makeStepStart',
            isFiltered: true
        });
        this.$store.commit({
            type: 'setProp',
            prop: 'query',
            value: Object.keys(this.query).reduce((prev, cur) => { 
                if (this.query[cur]) prev[cur] = this.query[cur];
                return prev;
             }, {})
        });
        this.$store.dispatch({
            type: 'getPosts',
            action: 'setProp'
        });
    };
    
}
</script>

<style lang="scss">
   
</style>
