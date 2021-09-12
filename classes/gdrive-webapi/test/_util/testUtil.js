import { Readable, Writable, Transform } from 'stream'

export default class TestUtil {
  static generateReadableStream(data) {
    return new Readable({
      // objectMode: true,
      read() {
        for (const item of data) {
          this.push(item)
        }

        this.push(null)
      }
    })
  }

  static generateWritableStream(onData) {
    return new Writable({
      // objectMode: true,
      write(chunk, encoding, cb) {
        onData(chunk)
        cb(null, chunk)
      }
    })
  }

  static generateTransformStream(onData) {
    // async function* handle(source) {
    //   for await(const chunk of data){
    //     yield chunk
    //   }
    // }
    return new Transform({
      transform(chunk, encoding, cb) {
        onData(chunk)
        cb(null, chunk)
      }
    })
  }
}
