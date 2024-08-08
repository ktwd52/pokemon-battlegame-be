// middleware/recalcScore.js
export const recalcScore = function (next) {
  console.log(`Recalculating score for user: ${this.username}`);
  this.score = Math.max(0, this.wins * 10 - this.losses * 5);
  console.log(`New score for ${this.username}: ${this.score}`);
  next();
};
