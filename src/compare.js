var imagediff = require('imagediff');
var canvas = require('canvas');
module.exports = {
  parseStringToPNG: function parseStringToPNG(src) {
    var image = new canvas.Image;
    image.src = src;
    var cnvs = new canvas(image.width, image.height);
    cnvs.getContext('2d').drawImage(image, 0, 0);
    return cnvs;
  },

  imageDiff: function imageDiff(baseImage, newImage) {
    var images = [baseImage,newImage];
    images.map(img => {
      if (typeof img === "string") {
        return this.parseStringToPNG(img);
      }
      return img;
    })
    return imagediff.equal.apply(this, images);
  }
};


