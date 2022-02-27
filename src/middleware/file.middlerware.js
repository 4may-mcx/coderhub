const Multer = require('koa-multer');
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
});
const pictureUpload = Multer({
  dest: PICTURE_PATH
});

// avatar 是上传的文件的名称
const avatarHandler = avatarUpload.single('avatar');
const pictureHandler = pictureUpload.array('picture', 9);

module.exports = {
  avatarHandler,
  pictureHandler
}