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
  return movies.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  const avg = movies.reduce((avg, movie) => {
    if (movie.score) {
      avg += movie.score / movies.length;
    }
    return avg;
  }, 0);

  return parseFloat(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  return movies.filter(movie => movie.genre.includes('Drama'))
    .reduce((avg, movie, i, dramaMovies) => {
      if (movie.score) {
        avg += movie.score / dramaMovies.length;
      }

      /*
      if (i === dramaMovies.length - 1) {
        return parseFloat(avg.toFixed(2));
      } else {
        return avg;
      }
      return [condition] ? if : else
      */
      return (i === dramaMovies.length - 1) ? parseFloat(avg.toFixed(2)) : avg;
    }, 0);  
}


// const numbers = [1, 2, 3, 4]
// ...numbers => 1, 2, 3, 4
// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  return [...movies].sort((m1, m2) => {
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
    .sort((t1, t2) => t1.localeCompare(t2))
    .slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

/*
{
  "title":"The Shawshank Redemption",
  "year":1994,
  "director":"Frank Darabont",
  "duration":"2h 22min",
  "genre":["Crime","Drama"],
  "score":9.3
}

// "duration":"2h 22min",
// split => ["2h", "22min"]
// reduce => 0, "2h"
// "2h" => "2" => parseInt("2") => 0 + 2 * 60
//
// "22min" => 120, "22min" => parseInt("22") => 120 + 22
*/ 
function turnHoursToMinutes(movies) {
  movies = JSON.parse(JSON.stringify(movies));
  return movies.map(movie => {
    const duration = movie.duration.split(' ')
      .reduce((duration, time) => {
        if (time.includes('min')) {
          time = time.replaceAll('min', '') // "22min" => "22"
          duration += parseInt(time) 
        } else {
          time = time.replaceAll('h', '') // "2h" => "2"
          duration += parseInt(time) * 60
        }
        return duration;
      }, 0)
    
    movie.duration = duration;
    return movie;
  })
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
/**
 * 
 * 

 {
  "title":"The Shawshank Redemption",
  "year":1994,
  "director":"Frank Darabont",
  "duration":142,
  "genre":["Crime","Drama"],
  "score":9.3
}

 */
function bestYearAvg(movies) {
  if (movies.length === 0) {
    return null;
  }

  const moviesByYear = movies.reduce((moviesByYear, movie) => {
    if (moviesByYear[movie.year]) {
      moviesByYear[movie.year].push(movie)
    } else {
      moviesByYear[movie.year] = [movie]
    }
    return moviesByYear;
  }, {})

  const best = Object.keys(moviesByYear)
    .reduce((best, year) => {
      const avg = scoresAverage(moviesByYear[year])
      if (best.avg < avg) {
        best = {
          year: year,
          avg: avg
        }
      }
      return best;
    }, { year: 0, avg: 0 });
    
  return `The best year was ${best.year} with an average score of ${best.avg}`;
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
