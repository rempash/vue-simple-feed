<template>
  <div id="app">
    <div class="container" :class="{ 'blockUi': blockUi }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { setTimeout } from 'timers';
import { PostInterface } from '@/interfaces/post.interface';

@Component({

})
export default class App extends Vue {

    private blockUi: boolean = false;

    public created(){
        this.$store.dispatch('getPosts');
        setTimeout(() => console.log('news', this.$store.state), 10000);
    }

    
    
}
</script>

<style lang="scss">
#app {

}
    .container{
        max-width: 1100px;
        margin: 0 auto;

        .new{
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 1px 1px rgba(0,0,0,.05);
            max-width: 700px;
            margin: 0 auto 20px;

            &:hover{
                box-shadow: 0 1px 1px rgba(0,0,0,.65);
            }

            .new-header{
                    padding: 10px 10px 0 10px;

                span{
                    font-size: 16px;
                    padding: 5px;
                    font-weight: bold;
                }
            }

            .new-body{
                padding: 0 15px;
                margin: 5px 0;

                p{
                    margin: 0;
                }
            }

            .new-footer{
                display: flex;
                justify-content: space-between;
                padding: 0 15px 10px;

                & > span{
                    flex-basis: 60%;
                    font-size: 14px;
                }
                .rating{
                    flex-basis: 20%;

                    button{
                        padding: 0px 4px 9px 4px;
                        color: #fff;
                        border-radius: 50%;
                        font-weight: bold;
                        display: inline-block;
                        height: 22px;
                        text-align: center;
                        font-size: 16px;
                        outline: none;
                        cursor: pointer;

                        &:nth-of-type(1){
                            background: #0c5460;
                        }      
                        &:nth-of-type(2){
                            background: #721c24;
                            margin-left: 3px;
                        }      
                     }
                }
            }

        }
    }
</style>
