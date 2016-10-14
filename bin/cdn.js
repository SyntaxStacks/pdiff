var fs = require('fs');
var path = require('path');
var pkgcloud = require('pkgcloud');
var archiver = require('archiver');
var unzip = require('unzip');

module.exports = {
  client: pkgcloud.storage.createClient({
    provider: 'rackspace',
    username: process.env.CDN_USERNAME,
    apiKey: process.env.CDN_PASSWORD,
    authUrl: 'https://identity.api.rackspacecloud.com',
    region: 'DFW',
  }),
  push: function push(app) {
    return new Promise((resolve, reject) => {
      var dir = path.resolve(process.cwd(), 'my-shots');
      var opts = {
        container: 'www_images',
        remote: `visual_regression/${app}/${app}.zip`,
        contentType: 'application/zip, application/octet-stream',
      };

      var archive = archiver.create('zip')
        .on('error', (e) => {
          console.log(`Error building archive: ${e}`);
        })
        .on('end', () => {
          console.log(`Finished building archive`);
        });

      var cloudFilesStream = this.client.upload(opts)
        .on('error', err => {
          console.log(`Error uploading images: ${e}`)
          reject(err);
        })
        .on('success', file => {
          // success, file will be a File model
          console.log(`Successfully uploaded file: ${file.name}`);
          resolve(file);
        });

      archive.pipe(cloudFilesStream);
      archive
        .directory(dir, '/')
        .finalize();
    });
  },
  pull: function pull(app) {
    return new Promise((resolve, reject) => {
      var dir = path.resolve(process.cwd(), 'my-shots');
      var extract = unzip.Extract({ path: dir })
        .on('close', () => {
          console.log('Files Pulled Successfully');
          resolve();
        });

      var opts = {
        container: 'www_images',
        remote: `visual_regression/${app}/${app}.zip`,
        stream: extract
      };

      this.client.download(opts, (err, res) => {
        if (err) {
          console.log(`Error downloading images: ${err}`)
          return reject(err);
        }
      });
    });
  }
};
