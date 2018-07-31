<template>
   <div class="new" v-if="singlePost">
            <div class="new-header">
                <span>{{ singlePost.title }}</span>
            </div>
            <div class="new-body">
                <p> {{ newTitle }} </p>
            </div>
            <div class="new-footer">
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
    
}
</script>

<style lang="scss">
   .post-comments{
        padding: 0 10px 10px;

        h4{
            margin: 0 0 10px 0;
        }

        .comment{
            margin-bottom: 20px;
            background-color: #fff;
            border: 1px solid transparent;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
            box-shadow: 0 1px 1px rgba(0,0,0,.05);
            border-color: #ddd;

            .comment-header{
                    padding: 10px 15px;
                    border-bottom: 1px solid transparent;
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                    color: #333;
                    background-color: #f5f5f5;
                    border-color: #ddd;
            }

            .comment-body{
                padding: 15px;
            }
        }
   }
</style>
