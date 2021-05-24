import express from 'express'

const accountRouter = express.Router()
const contentRouter = express.Router()

accountRouter.use('/content', contentRouter)
accountRouter.get('/meta', (_, res) => {
  const acct = res.locals.account
  const meta = {
    created_at: acct.created_at,
    modified_at: acct.modified_at,
    timestp: acct.timestp,
  }

  res.json(meta)
})

contentRouter.get('/', (_, res) => {
  res.json(res.locals.account.content)
})
contentRouter.get('/report_info', (_, res) => {
  res.json(res.locals.account.content.report_info)
})
contentRouter.get('/user_profile', (_, res) => {
  res.json(res.locals.account.content.user_profile)
})
contentRouter.get('/extra', (_, res) => {
  res.json(res.locals.account.content.extra)
})
contentRouter.get('/audience/:section?', (req, res) => {
  const content = res.locals.account.content
  const audience = {
    likers: content.audience_likers,
    followers: content.audience_followers,
    commenters: content.audience_commenters,
  }

  const section = req.params['section']

  if (!section) res.json(audience)
  else
    switch (section) {
      case 'likers': {
        res.json(audience.likers)
        break
      }
      case 'followers': {
        res.json(audience.followers)
        break
      }
      case 'commenters': {
        res.json(audience.commenters)
        break
      }
      default:
        res.sendStatus(404)
    }
})

export default accountRouter
