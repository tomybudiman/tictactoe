import { initializeApp } from 'firebase';

	  // Initialize Firebase
  	const app = initializeApp ({
	    databaseURL: "https://tiktakto-6657a.firebaseio.com",
	    projectId: "tiktakto-6657a",
  	});

export const db = app.database();
export const createGame = db.ref('TicTacToe')	