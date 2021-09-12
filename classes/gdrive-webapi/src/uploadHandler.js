import Busboy from 'busboy'
import { pipeline } from 'stream/promises'
import fs from 'fs'
import { logger } from './logger.js'

export default class UploadHandler {
  constructor({ io, socketId, downloadsFolder }) {
    this.io = io
    this.socketId = socketId
    this.downloadsFolder = downloadsFolder
  }

  handlerFileBytes() {}

  async onFile(fieldname, file, filename) {
    const saveTo = `${this.downloadsFolder}/${filename}`

    await pipeline(
      // 1o passo, pegar uma readable stream!
      file,
      // 2o passo, filtrar, converter, transformar dados!
      this.handlerFileBytes.apply(this, [filename]),
      //3o passo, é saida do processo, uma writable stream!
      fs.createWriteStream(saveTo)
    )

    logger.info(`File [${filename}] finished`)
  }

  registerEvents(headers, onFinish) {
    const busboy = new Busboy({ headers })
    busboy.on('file', this.onFile.bind(this))
    busboy.on('finish', onFinish)
    return busboy
  }
}
