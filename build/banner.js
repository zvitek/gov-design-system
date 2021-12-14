'use strict'
const pack = require('../package.json')

const bannerTxt = `/*! Gov v${pack.version} | MIT License | github.com/gov/gov */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)
