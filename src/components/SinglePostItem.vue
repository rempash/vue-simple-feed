<template>
   <div class="post" v-if="post">
            <div class="post-header">
                <span>{{ post.title }}</span>
            </div>
            <div class="post-body">
                <p> {{ newTitle }} </p>
            </div>
            <div class="post-footer">
                <span class="comments">Всего комментариев: {{ post.comments.length }}</span>
                <div class="rating"> 
                    Рейтинг: {{ post.rating }} 
                    <button @click="changePostRating(post.id, true)" >+</button><button @click="changePostRating(post.id, false)">-</button>
                </div>
                <router-link v-if="options.sliced" :to="{ name: 'post', params: {id: post.id} }">Подробнее</router-link>
            </div>
            <div class="post-comments" v-if="!options.sliced">
                <h4>Комментарии:</h4>
                <div class="comment" v-for="comment in post.comments" :key="comment.id">
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
        post: Object,
        options: Object
    }
})
export default class SinglePostItem extends Vue {

     private post: PostInterface
     private options: {
         sliced: boolean
     }

    get newTitle(){
        return this.options.sliced ? this.$options.filters.newTitleLength(this.post.body) : this.post.body;
    }

    private changePostRating(id: number, action: boolean){
        this.$store.commit({
            type: 'changePostRating',
            id: id,
            action: action
        });
    }

}
</script>

<style lang="scss">

</style>
