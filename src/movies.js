// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  const directors = movies.reduce((directors, movie) => {
    if (!directors[movie.director]) {
      directors[movie.director] = true
    }
    return directors;
  }, {});
  return Object.keys(directors);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter(movie => movie.genre.includes('Drama') && movie.director === 'Steven Spielberg').length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  const avg = movies.reduce((avg, movie) => {
    if (movie.score) {
      avg += movie.score / movies.length
    }
    return avg;
  }, 0)
  return parseFloat(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  const avg = movies.filter(movie => movie.genre.includes('Drama'))
    .reduce((avg, movie, i, movies) => {
      if (movie.score && movie.genre.includes('Drama')) {
        avg += movie.score / movies.length
      }
      return avg;
    }, 0)
  return parseFloat(avg.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  movies = [...movies];
  return movies.sort((m1, m2) => {
    if (m1.year > m2.year) {
      return 1;
    } else if (m1.year < m2.year) {
      return -1;
    } else {
      return m1.title.localeCompare(m2.title);
    }
  })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  return movies.map(movie => movie.title)
    .sort((m1, m2) => m1.localeCompare(m2))
    .slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  movies = JSON.parse(JSON.stringify(movies));
  return movies.map(movie => {
    const duration = movie.duration.split(' ')
      .reduce((duration, time) => {
        if (time.includes('min')) {
          time = time.replaceAll('min', '')
          return duration + parseInt(time);
        } else {
          time = time.replaceAll('h', '')
          return duration + parseInt(time) * 60;
        }
      }, 0)
    movie.duration = duration;
    return movie;
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (movies.length === 0) {
    return null;
  }

  const scoresByYear = movies.reduce((scoresByYear, movie) => {
    if (scoresByYear[movie.year]) {
      scoresByYear[movie.year].push(movie.score)
    } else {
      scoresByYear[movie.year] = [movie.score]
    }
    return scoresByYear;
  }, {});

  const best = Object.keys(scoresByYear).reduce((best, year) => {
    const avg = scoresByYear[year].reduce((s1, s2) => s1 + s2, 0) / scoresByYear[year].length;
    if (best.avg < avg || (best.avg === avg && best.year > year)) {
      return { year, avg }
    } else {
      return best;
    }
  }, { year: 0, avg: 0 });

  return `The best year was ${best.year} with an average score of ${best.avg}`
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
