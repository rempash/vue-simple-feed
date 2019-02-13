<template>
   <div class="post" v-if="post">
            <div class="post-header">
                <span>{{ post.title }}</span>
                <div class="post-date">January 30, 2018</div>
            </div>
            <div class="post-body">
                <p> {{ newTitle }} </p>
            </div>
            <div class="post-footer">
                <span class="comments">Всего комментариев: {{ post.comments.length }}</span>
                <div class="rating"> 
                    Рейтинг: <b>{{ post.rating }}</b>
                    <button class="rating__plus" @click="changeRating(post.id, true)" ><i class="fa fa-thumbs-up"></i></button>
                    <button class="rating__minus" @click="changeRating(post.id, false)"><i class="fas fa-thumbs-down"></i></button>
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
import {PostInterface} from '@/interfaces/post.interface';
import {newTitleLength} from '@/filters/newTitleLength.filter';
import {Mutation} from 'vuex-class';

@Component({
    props: {
        post: Object,
        options: Object,
    },
})
export default class SinglePostItem extends Vue {

    @Mutation private changePostRating;

     private post: PostInterface;

     private options: {
         sliced: boolean,
     };

    private get newTitle() {
        return this.options.sliced ? newTitleLength(this.post.body) : this.post.body;
    }

    private changeRating(id: number, action: boolean) {
        this.changePostRating({
            id,
            action,
        });
    }

}
</script>

<style lang="scss">

</style>
