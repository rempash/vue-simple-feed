<template>
    <div class="container" v-if="$store.state.news">
        <div class="new" v-for="singleNew in $store.state.news" :key="singleNew.id">
            <p> {{ singleNew.body }} </p>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({

})
export default class NewsFeed extends Vue {

    public mounted() {
        this.getNews();
    }

    private getNews() {
        this.$store.dispatch('getNews');
    }

}
</script>

<style lang="scss">
    .container{
        max-width: 1100px;
        margin: 0 auto;
    }
</style>
