'use strict'
const pack = require('../package.json')

const bannerTxt = `/*! Gowue v${pack.version} | MIT License | github.com/gowue/gowue */\n`

process.stdout.write(bannerTxt)
process.stdin.pipe(process.stdout)
