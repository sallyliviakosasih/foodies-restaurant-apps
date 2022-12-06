/* eslint-disable arrow-parens */
/* eslint-disable function-paren-newline */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'src/public/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
    .forEach(image => {
        sharp(`${target}/${image}`)
            .resize(1200)
            .toFile(path.resolve(
                __dirname,
                `${destination}/${image.split('.').slice(0, -1).join('.')}-xtralarge.webp`),
        );

        sharp(`${target}/${image}`)
            .resize(900)
            .toFile(path.resolve(__dirname,
                `${destination}/${image.split('.').slice(0, -1).join('.')}-large.webp`),
        );

        sharp(`${target}/${image}`)
            .resize(650)
            .toFile(path.resolve(
                __dirname,
                `${destination}/${image.split('.').slice(0, -1).join('.')}-small.webp`),
        );
    });
