#!/usr/bin/env node
import path from 'path'

import * as fs from 'fs-extra'

import { logger } from './logger'

const templateType = process.argv[2] || 'full'
const templateMap = {
  backend: path.join(__dirname, 'templates', 'backend'),
  frontend: path.join(__dirname, 'templates', 'frontend'),
  full: path.join(__dirname, 'templates'),
}

function copyTemplateFiles() {
  try {
    const templateDir = templateMap[templateType]
    const targetDir = process.cwd()

    if (!templateDir) {
      logger.error('Template inválido. Use: backend, frontend ou full')
      process.exit(1)
    }

    fs.copySync(templateDir, targetDir, {
      overwrite: true,
      dereference: true,
    })

    logger.success(`Template ${templateType} configurado com sucesso!`)
  } catch (error) {
    logger.error(`Ocorreu um erro ao configurar o template: ${error.message}`)
    process.exit(1)
  }
}

copyTemplateFiles()
