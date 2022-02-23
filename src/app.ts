import  Express from  'express'
import { router } from './routes'

const app = Express()

app.use(Express.json())
app.use(router)

export { app }
