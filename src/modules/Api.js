class Score {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }

    scoreData = [];

    url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/:id';

    getScore = () => {
      const recentScore = document.querySelector('.recent-score-group');
      recentScore.innerHTML = this.scoreData.map((element, index) => `<li class=${index % 2 !== 0 ? 'list-gray' : 'list-white'}>${element.user} : ${element.score}</li>`).join('');
    }

    fetchScore = async () => {
      try {
        const data = await fetch(this.baseUrl);
        const res = await data.json();
        const displayData = res.result.map((item) => item);
        this.scoreData = displayData;
        return this.getScore();
      } catch (err) { return err; }
    };

    addScore = async ({ user, scoreNumber }) => {
      try {
        const newgame = { user, score: scoreNumber };
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newgame),
        };
        const data = await fetch(this.url, config);
        this.scoreData.push(newgame);
        this.getScore();
        return data;
      } catch (err) { return err; }
    }
}

export default Score;