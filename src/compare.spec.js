var compare = require('./compare');

describe('Compare Module', () => {
  var pngString = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTklEQVQ4T5XSXUhTYRgH8P',
    '/ZOZk7ibYwoQ/qQryIILqzDyQzZ80VDZrkjvNr1vq0skACkQoRwjJbBIWKczmOX2mTMlPLUq80oiiii/IiL4JK09Z2zr',
    'Z2zhsbLETPufCFh/eB93l/8LzvQ0FljdqYHBDoQWF4T0t4SK2OUjsYsTH1e6v4iy9ruVtZLeFLywaGS5iGfVXuCy9qrb',
    'f1reGKZQODRfSd7Kq28sfXCpu1DHpnfJK/oBdji6ElLTyz0kZCwfBTIClcjSuPry7uTt9v2jwx6Pm6lqV+UAQDB9xSfw',
    'xaAjyx0vczzzZwHdfPjxTVOA8/qC7ti+35lx1Zr+5W8Afd0klVwMPRTYbKxmO+uTkk6HSY/vT+16Yt29ZM9Hd+TjceTR',
    'uoszebeOm4IsBbkKzTbbiXWXbFrPZo/TdOtZo7pFJFoCuPtm83llQmrktNJYQgFArhbzCISK7RaBDPshh3XW3L75SKFA',
    'G3WcMbztRZgqIIWZYh+P3w+3zRnGEYaFkWk903260PZU4RcB3RdOWUVhslQrGRS6IgQBCEKEAzDFbGrQhP9ji6invlAk',
    'WgyURb2KTksgyTbRcBrRVFEZGIAjSNkH9+9t3zdt7eJ59T/QVHLgoTV6ecyLGc3u31ehEIBP4DU2/HPn6b+lBf/hROVe',
    'DQerAZW6lHenPJjlVJyYmRFiRJgnf2++/XI57JL7OEa3yDGSVAAyAeQEJuGrJ3boSdoqCNFRICcXwazqEpjAKYB/AHgL',
    'RwEiM5AyBuQdCL5kECEAQQABACIP8DnRn2EaRXc3MAAAAASUVORK5CYII='].join('');

  var anotherPng = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4T7WTMUtCYRSGn3',
    'sDr14sbEmKCLGGIFCoCMJZMByC1hpaGqItRPoJEdEWDS0NtbYW+AOCSFBcNKgriUUmGZrmp/LdqKHykkFYB77xPN973v',
    'MehS5L6bKfvwccQp8NFk0IAoPAnQKxBhwtQdmquE3BW7MK216fL+j1+92a06nVKxVxnUzeG6lUTELECmkDHMDq2MREdM',
    'Tv91Sr1Y/P7HY7RiKRvclktpZh76uKNsA+HAfC4VCxVHJIKRFCvD/TNOnV9ZerePx0BRY6AnbhLBAKzeQMQ62USrSazU',
    '8Vui4f8vnzNZjtCNiB40mfL1TO5RxWs1qK8pJ9fDxd/0nBJqwOu1zRUU3zyEbjg2ECl7VatiDE1sZPHsxB39TbFhyO4L',
    'jN5naqqlaRUqTr9XtDiFgcIieWVVqDZOuH8RmYH4JpFQYkFG7hIg4nRUgDzx09AHoAF6B9E/EW8AR8zgb/EOXfHlfXx/',
    'QKQrt/EaXk3vAAAAAASUVORK5CYII='
  ].join('');

  describe('parseStringToPNG', function () {
    it('should create an image from an image string', () => {
      var img = compare.parseStringToPNG(pngString);
      expect(img.toString()).to.equal('[object Canvas]');
    });
  });

  describe('imageDiff', function () {
    it('should not find visual differences with same image', function () {
      var diff = compare.imageDiff(pngString, pngString);
      expect(diff.isSame).to.be.true;
    });

    it('should find visual differences with different images', function () {
      var diff = compare.imageDiff(pngString, anotherPng);
      expect(diff.isSame).to.be.false;
    });
  });
});

