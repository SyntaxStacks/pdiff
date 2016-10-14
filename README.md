# pDiff - Visual Regression Tool

#NOTE: this project is work in progress.
## Install
`npm install`

## Configuration
Set the following environment variables to configure pDiff
```
export CDN_USERNAME=CDN_USERNAME_HERE
export CDN_PASSWORD=CDN_PASSWORD_HERE
```

## CLI
```sh
# Pull baseline images
pdiff pull <www|signup>

# Push new baseline images
pdiff pull <www|signup>

```

## API
```
var compare = require('compare');

// Convert encoded string to image
var png = "...";
var image = compare.parseStringToPNG(png);

// Compare to image strings for visual differences
var diff = compare.imageDiff(png, "...");
```

## Troubleshooting

When running npm install I received
```
Package xcb-shm was not found in the pkg-config search path.
Perhaps you should add the directory containing `xcb-shm.pc'
to the PKG_CONFIG_PATH environment variable
Package 'xcb-shm', required by 'cairo', not found
gyp: Call to './util/has_cairo_freetype.sh' returned exit status 0. while trying to load binding.gyp
```

I had to export the following environment variable
```
export PKG_CONFIG_PATH=/opt/X11/lib/pkgconfig
```


