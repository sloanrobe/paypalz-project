import express, { Request, Response } from 'express'
import cors from 'cors'
import MemberAndGroupService from './services/MemberAndGroupService'

const memberAndGroupService = new MemberAndGroupService()

const port = 3000
const app = express()

app.use(cors())

app.get('/groups', async (req: Request, res: Response) => {
  const username = req.query.username

  const groups = await memberAndGroupService.getGroupsForUser(
    username as string
  )

  res.status(200).json(groups)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})