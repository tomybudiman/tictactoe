<template>
   <div class="container">
     <label></label>
     <input type="text" v-model="name" />
     <button @click="submitName"> add </button>
      <ul>
        <li v-for="game in games" v-bind:key="game['.key']">
          {{ game }}       
       <div class="board"> 
          <div class="row kot">
            <div class="kotak col-md-4" @click="mark(0,game['.key'])" > <h1> {{ game.board[0] }} </h1> </div>
              
            <div class="kotak col-md-4" @click="mark(1,game['.key'])" > <h1> {{ game.board[1] }} </h1> </div>

            <div class="kotak col-md-4" @click="mark(2,game['.key'])" > <h1> {{ game.board[2] }} </h1> </div>
          </div>
          <div class="row kot">  
            <div class="kotak col-md-4" @click="mark(3,game['.key'])" > <h1> {{ game.board[3] }} </h1> </div>

            <div class="kotak col-md-4" @click="mark(4,game['.key'])" > <h1> {{ game.board[4] }} </h1> </div>

            <div class="kotak col-md-4" @click="mark(5,game['.key'])" > <h1> {{ game.board[5] }} </h1> </div>
          </div>
          <div class="row kot">  
            <div class="kotak col-md-4" @click="mark(6,game['.key'])" > <h1> {{ game.board[6] }} </h1> </div>

            <div class="kotak col-md-4" @click="mark(7,game['.key'])" > <h1> {{ game.board[7] }} </h1> </div>

            <div class="kotak col-md-4" @click="mark(8,game['.key'])" > <h1> {{ game.board[8] }} </h1> </div>
          </div> 
        </div>
        </li> 
      </ul>        
    </div>   
</template>    
<script>

import { createGame } from '../firebase'

export default {
  name: 'TicTacToe',
  data () {
    return {
      name : '',
      tic : 'X',
      tempBoard : ['','','','','','','','',''],
      checkBoard : [],
      Xchecker : false,
      Ochecker : false
    }
  },
  firebase: {
    games : createGame
  },
  methods : {
    submitName () {
      this.tempBoard = ['','','','','','','','','']
      createGame.push({ name: this.name, board : this.tempBoard })
      console.log(this.games.length);
      console.log(createGame)
    },

    mark : function(index,key) {
      if(this.tempBoard[index] != ''){
        alert('Already Mark')
      }else{
        this.tempBoard.splice(index,1,this.tic);
        console.log(this.tempBoard)
        this.checkBoard = [`${this.tempBoard[0]+this.tempBoard[1]+this.tempBoard[2]},${this.tempBoard[0]+this.tempBoard[3]+this.tempBoard[6]},${this.tempBoard[0]+this.tempBoard[4]+this.tempBoard[8]},${this.tempBoard[2]+this.tempBoard[4]+this.tempBoard[6]},${this.tempBoard[2]+this.tempBoard[5]+this.tempBoard[8]},${this.tempBoard[3]+this.tempBoard[4]+this.tempBoard[5]},${this.tempBoard[6]+this.tempBoard[7]+this.tempBoard[8]},${this.tempBoard[1]+this.tempBoard[4]+this.tempBoard[7]}`]

        console.log(this.checkBoard[0].indexOf('XXX'))
        if(this.checkBoard[0].indexOf('XXX') != -1 ){
          console.log(this.checkBoard) 
          this.Xchecker = true;
          this.tempBoard = ['','','','','','','','','']
          alert('X Win')
        }
        if(this.checkBoard[0].indexOf('OOO') != -1 ){
          this.Xchecker = true;
          console.log(this.checkBoard)
          this.tempBoard = ['','','','','','','','','']
          alert('O Win')
        }        


        if(this.tempBoard.indexOf('') == -1 ){
          this.tempBoard = ['','','','','','','','','']
          alert('DRAW')
        } 

        // this.tempBoard[index] = this.tic
        createGame.child(key).update({
          board : this.tempBoard
        }).then(response => {
          if(this.tic == 'X') {
            this.tic = 'O'
          }else{
            this.tic = 'X';
          }
        })
        .catch(err => {
          console.log(err);
        })
        this.tempBoard
        console.log(key)
      }
    }
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.kot {
  margin-bottom: 30px;
}
.kotak {
  margin-right: 30px;
  margin-left: 30px;
  width: 50px;
  height: 50px;
  background-color: red;
}
</style>
