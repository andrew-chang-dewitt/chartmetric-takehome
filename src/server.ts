import express from 'express'
import morgan from 'morgan'

import load_data from './load_data'
import accountRouter from './account/router'
import accountLib from './account/lib'

const app = express()
const port = 4040 // FIXME: should get this from env instead

app.use(morgan('dev'))

app.get('/status', (_, res) => {
  res.send('API is running')
})

app.use(async (_, res, next) => {
  const data = await load_data()
  // parse the json string stored in each item's `content` field
  data.forEach((account) => {
    account.content = JSON.parse(account.content)
  })
  res.locals.data = data

  next()
})

app.get('/account/all', async (_, res) => {
  // loads the csv as-is & returns it as json
  res.json(res.locals.data)
})

app.use(
  '/account/:account_id',
  // first parse params & assign the matching account to
  // res.locals, or send 404 if no matching account is found
  async (req, res, next) => {
    const account = await accountLib.getAccount(
      res.locals.data,
      req.params['account_id']
    )

    if (!account) res.sendStatus(404)
    else {
      res.locals.account = account
      next()
    }
  },
  // then forward request to accountRouter
  accountRouter
)

app.get('/search_by_name/:query', (req, res) => {
  const query = req.params['query']
  let results: Array<any> = [] // FIXME: define an Account type

  // FIXME: define an Account type
  res.locals.data.forEach((account: any) => {
    if (
      account.content.user_profile.username.includes(query) ||
      account.content.user_profile.fullname.includes(query)
    )
      results.push(account)
  })

  res.json(results)
})

app.listen(port, () => {
  console.debug(`server started at localhost:${port}`)
})
