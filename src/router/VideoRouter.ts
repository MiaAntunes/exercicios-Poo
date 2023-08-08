import express from 'express'
import { VideoControllers } from '../controllers/VideoControllers'
import { VideoBusiness } from '../business/VideoBusiness'
import { VideoDatabase } from '../sql/VideoDatabase'

export const videoRouter = express.Router()

const videoControllers = new VideoControllers(
    new VideoBusiness(
        new VideoDatabase()
    )
)

videoRouter.get('/', videoControllers.getVideo)

videoRouter.post('/', videoControllers.postVideo)

videoRouter.delete('/:id', videoControllers.deleteVideo)

videoRouter.put('/:id', videoControllers.putVideo)