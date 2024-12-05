const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')

app.get('/organizations',async (req, res) => {
  try{
    const organizations = await pool.query("SELECT * FROM in22labs.organizations")
    res.json(organizations.rows)
  }catch(err){
    console.log(err)
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})