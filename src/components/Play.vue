<template>
  <div class="wrapper">
    <div class="overlay-alert" id="overlay-alert">
      <div class="alert-body">
        <span>{{popupMsg}}</span>
        <button type="button" class="btn btn-primary" @click="hideAlert">Close</button>
      </div>
    </div>
    <!-- Select Create or Join -->
    <div class="share-room-url">
      <!-- Create New Room -->
      <span>Your Room ID</span>
      <input type="text" id="room-url" :value="id">
      <button type="button" class="btn btn-primary" @click="copyRoomURL">Copy Room URL</button>
      <button type="button" class="btn btn-primary" @click="createRoom" name="button" data-toggle="modal" data-target="#game-board">Play</button>
      <!-- Join Existed Room -->
      <span style="margin-top: 10px;">Or Join the Game</span>
      <input type="text" v-model="roomId">
      <button class="btn btn-primary" type="button" @click="joinRoom">Join</button>
      <input type="hidden" data-toggle="modal" id="trigger-board" data-target="#game-board">
    </div>
    <!-- Game Board Modal -->
    <div id="game-board" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Game Board</h4>
          </div>
          <div class="modal-body">
            <!-- Main Box -->
            <ul class="tictactoe-board">
              <li class="col-xs-4" v-for="(box,index) in board">
                <span class="box" @click="clickBoard(index)">
                  <button type="button" class="box-button">{{box}}</button>
                </span>
              </li>
            </ul>
            <!-- Main Box -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default{
  props:["id"],
  data(){
    return{
      type: "X",
      roomId: this.id,
      board: ["","","","","","","","",""],
      checkBoard: [],
      winner: "",
      popupMsg: ""
    }
  },
  created(){
    this.onChangeBoard();
    this.$database.ref(this.id).set({});
  },
  mounted(){
    // this.showAlert();
  },
  methods:{
    copyRoomURL(){ // Copy room URL
      const inputURL=document.getElementById("room-url");
      inputURL.select();
      document.execCommand("copy");
    },
    createRoom(){ // Create New Room
      this.$database.ref(this.id).set({
        board:this.board,
        users:[
          {player:"player-1",type:"X"}
        ],
        winner:this.winner
      });
    },
    joinRoom(){ // Join Existed Room
      this.$database.ref(this.roomId).once("value",function(snapshot){
        snapshot=snapshot.val();
        if(snapshot == null){ // Jika room tidak ditemukan
          alert("Room not found!");
        }else{ // Jika room ditemukan
          document.getElementById("trigger-board").click();
          this.$database.ref(this.roomId).set({
            board:this.board,
            users:[
              {player:"player-1",type:"X"},
              {player:"player-2",type:"O"}
            ],
            winner:this.winner
          });
          this.type="O";
          this.onChangeBoard();
        }
      }.bind(this));
    },
    clickBoard(index){ // Click on board box
      if(this.board[index] != ''){
        alert('Already Mark')
      }
      if(this.board[index] == "" || this.board[index] == null){
        this.board.splice(index,1,this.type);

        this.checkBoard = [`${this.board[0]+this.board[1]+this.board[2]},${this.board[0]+this.board[3]+this.board[6]},${this.board[0]+this.board[4]+this.board[8]},${this.board[2]+this.board[4]+this.board[6]},${this.board[2]+this.board[5]+this.board[8]},${this.board[3]+this.board[4]+this.board[5]},${this.board[6]+this.board[7]+this.board[8]},${this.board[1]+this.board[4]+this.board[7]}`]

        if(this.checkBoard[0].indexOf('XXX') != -1 ){
          this.board = ['','','','','','','','','']
          this.winner="X";
        }
        if(this.checkBoard[0].indexOf('OOO') != -1 ){
          this.board = ['','','','','','','','','']
          this.winner="O";
        }

        if(this.board.indexOf('') == -1 ){
          this.board = ['','','','','','','','','']
          // alert('DRAW')
        }

        this.$database.ref(this.roomId).set({
          board:this.board,
          users:[
            {player:"player-1",type:"X"},
            {player:"player-2",type:"O"}
          ],
          winner:this.winner
        });
        document.querySelectorAll(".box-button").forEach(function(element){
          element.disabled=true;
        });
        this.winner="";
      }
    },
    onChangeBoard(){ // Detect change on board
      this.$database.ref(this.roomId).on("value",function(snapshot){
        snapshot=snapshot.val();
        if(snapshot != null){ // Jika room ditemukan
          if(snapshot.winner != "" && snapshot.winner == this.type){
            this.showAlert("You Win!");
          }else if(snapshot.winner != "" && snapshot.winner != this.type){
            this.showAlert("You Lose!");
          }
          this.board=snapshot.board;
          document.querySelectorAll(".box-button").forEach(function(element){
            element.disabled=false;
          });
        }
      }.bind(this));
    },
    showAlert(text){
      const mainElement=document.getElementById("overlay-alert");
      mainElement.setAttribute("style","display:block");
      this.popupMsg=text;
    },
    hideAlert(){
      document.getElementById("overlay-alert").removeAttribute("style");
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  .share-room-url {
    top: 50%;
    width: 80%;
    max-width: 350px;
    padding: 15px;
    position: absolute;
    border-radius: 5px;
    display: inline-block;
    background-color: #FFF;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
    -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    span {
      color: #555;
      display: block;
      font-size: 24px;
      margin-bottom: 10px;
      font-family: "Roboto",sans-serif;
    }
    input {
      width: 100%;
      height: 35px;
      outline: none;
      font-size: 15px;
      text-align: center;
      border: 1px solid #999;
      font-family: "Roboto",sans-serif;
    }
    button {
      font-size: 15px;
      margin-top: 15px;
      font-family: "Roboto",sans-serif;
    }
  }
  .tictactoe-board {
    left: 0;
    right: 0;
    padding: 0;
    width: 80%;
    margin: auto;
    max-width: 450px;
    overflow: hidden;
    background-color: #FFF;
    border: 2px solid #555;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    li {
      list-style: none;
      position: relative;
      padding: 30% 0 0 0;
      border: 2px solid #555;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .box {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      display: block;
      position: absolute;
      text-align: center;
      button {
        padding: 0;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 35px;
        background-color: transparent;
        font-family: "Roboto",sans-serif;
      }
    }
  }
  .overlay-alert {
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1100;
    position: absolute;
    background-color: rgba(0,0,0,.5);
    .alert-body {
      top: 50%;
      padding: 20px;
      position: relative;
      border-radius: 5px;
      display: inline-block;
      background-color: #FFF;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
      box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      span {
        color: #555;
        display: block;
        font-size: 30px;
        min-width: 250px;
        font-family: "Roboto",sans-serif;
      }
      button {
        margin-top: 10px;
      }
    }
  }
}
</style>
