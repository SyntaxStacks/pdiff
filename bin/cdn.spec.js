var Stream = require('stream');
var archiver = require('archiver');
var pkgcloud = require('pkgcloud');
var CDN = require('./cdn');
var sandbox;

describe('CDN Module', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should pull images from the CDN', done => {
    sandbox.stub(pkgcloud.storage, 'createClient');
    sandbox.stub(CDN.client, 'download', function (opts, fn) {
      opts.stream.emit('close');
    });
    CDN.pull('www')
      .then(() => {
        expect(CDN.client.download.calledOnce).to.be.true;
        done();
      });
  });

  it('should push images from the CDN', done => {
    var mockedCloudFilesStream = new Stream.Writable();
    var mockedArchiverStream = new Stream.Readable();
    mockedArchiverStream.directory = sinon.stub().returns(mockedArchiverStream),
    mockedArchiverStream.finalize = function () {
      mockedArchiverStream.emit('end');
    };
    mockedArchiverStream.pipe = function () {
      mockedCloudFilesStream.emit('success', {name: 'test.file.txt' });
    };
    sandbox.stub(pkgcloud.storage, 'createClient');

    sandbox.stub(archiver, 'create').returns(mockedArchiverStream);
    sandbox.stub(CDN.client, 'upload').returns(mockedCloudFilesStream);
    CDN.push('www')
      .then((file) => {
        expect(archiver.create.calledOnce).to.be.true;
        expect(CDN.client.upload.calledOnce).to.be.true;
        done();
      });
  });
});

