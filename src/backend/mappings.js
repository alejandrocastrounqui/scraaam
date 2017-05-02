import express from 'express'

import MongoCon     from './jshttpc/mongocon'
import Project      from './jshttpc/model/Project'
import Milestone    from './jshttpc/model/Milestone'
import Epic         from './jshttpc/model/Epic'
import EpicTask     from './jshttpc/model/EpicTask'
import EpicComment  from './jshttpc/model/EpicComment'

let router = express.Router()

const mappings = {router}

const mongoCon = new MongoCon()

mongoCon.load(Project)
mongoCon.load(Milestone)
mongoCon.load(Epic)
mongoCon.load(EpicTask)
mongoCon.load(EpicComment)

mongoCon.makeRoutes(router)

export default mappings
