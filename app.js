const express = require('express')
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
//電影畫面
app.get('/', (req, res) => {
  
  res.render('index', { movies: movieList.results})
})
//電影資訊
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.filter(function(movie) {
    return movie.id === Number(req.params.movie_id)
  })

  res.render('show', { movie: movie[0]})
})
//搜尋功能
app.get('/search', (req, res) => {
  const movies = movieList.results.filter((movie) => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })

  res.render('index', { movies: movies, keyword: req.query.keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})