import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper'

describe('#FileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 16777231,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 4682717,
        size: 39,
        blocks: 8,
        atimeMs: 1631054866715.0854,
        mtimeMs: 1631054865096.2922,
        ctimeMs: 1631054865096.2922,
        birthtimeMs: 1631054850250.1763,
        mtime: '2021-09-07T22:47:45.096Z',
        atime: '2021-09-07T22:47:46.715Z',
        ctime: '2021-09-07T22:47:45.096Z',
        birthtime: '2021-09-07T22:47:30.250Z'
      }
      const mockUser = 'lymreynaldo'
      process.env.USER = mockUser
      const filename = 'file-for-testing.txt'
      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])
      jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock)

      const result = await FileHelper.getFilesStatus('/tmp')

      const expectedResult = [
        {
          size: '39 B',
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})
