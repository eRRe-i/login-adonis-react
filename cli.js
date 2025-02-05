#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')

const templateType = process.argv[2] || 'full'

const templateMap = {
    backend: path.join(__dirname, 'templates', 'backend'),
    frontend: path.join(__dirname, 'templates', 'frontend'),
    full: path.join(__dirname, 'templates')
};

function copyTemplateFiles() {
  const templateDir = templateMap[templateType]
  const targetDir = process.cwd()

  if (!templateDir) {
    console.error('Template inválido. Use: backend, frontend ou full')
    process.exit(1)
  }

  fs.copySync(templateDir, targetDir, {
    overwrite: true,
    filter: (src) => !src.includes('node_modules')
  })

  console.log(`✅ Template ${templateType} configurado com sucesso!`)
}

copyTemplateFiles()