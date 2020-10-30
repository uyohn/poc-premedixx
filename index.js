const express = require('express')

const app = express()

app.use(express.static('./public'))
app.use(express.static('./assets'))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`app is listening on localhost:${PORT}`)
})