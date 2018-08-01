<template>
   <div class="post" v-if="singlePost">
            <a class="back" v-if="!options.sliced" @click="goBack()">
                <i class="fas fa-chevron-circle-left"></i>
            </a>
            <div class="post-header">
                <span>{{ singlePost.title }}</span>
            </div>
            <div class="post-body">
                <p> {{ newTitle }} </p>
            </div>
            <div class="post-footer">
                <span class="comments">Всего комментариев: {{ singlePost.comments.length }}</span>
                <div class="rating"> 
                    Рейтинг: {{ singlePost.rating }} 
                    <button @click="changePostRating(index, true)" >+</button><button @click="changePostRating(index, false)">-</button>
                </div>
                <router-link v-if="options.sliced" :to="{ name: 'post', params: {index: index} }">Подробнее</router-link>
            </div>
            <div class="post-comments" v-if="!options.sliced">
                <h4>Комментарии:</h4>
                <div class="comment" v-for="comment in singlePost.comments" :key="comment.id">
                    <div class="comment-header">
                        {{ comment.email }}
                    </div>
                    <div class="comment-body">
                        {{ comment.body }}
                    </div>
                </div>
            </div>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { PostInterface } from '@/interfaces/post.interface';

@Component({
    props: {
        index: Number,
        singlePost: Object,
        options: Object
    }
})
export default class SinglePostItem extends Vue {
     private index: number;
     private singlePost: PostInterface
     private options: {
         sliced: boolean
     }


    get newTitle(){
        return this.options.sliced ? this.$options.filters.newTitleLength(this.singlePost.body) : this.singlePost.body;
    }

    private changePostRating(index: number, action: boolean){
        this.$store.commit({
            type: 'changePostRating',
            index: index,
            action: action
        });
    }

    private goBack(){
        this.$router.go(-1);
    }
    
}
</script>

<style lang="scss">

</style>
