import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

import { Request, Response } from 'express';
import { utils } from 'umi';

import { IContext } from '../UmiUI';
import getScripts, { normalizeHtml } from '../utils/scripts';

const { got } = utils;

export default (ctx: Partial<IContext>) => async (req: Request, res: Response) => {
  const scripts = await getScripts();
  // Index Page
  let content = null;
  const localeDebug = !existsSync(join(__dirname, '../../web/dist/index.html'));
  if (localeDebug) {
    try {
      const { body } = await got(`http://localhost:8002${req.path}`);
      res.set('Content-Type', 'text/html');
      res.send(normalizeHtml(body, scripts));
    } catch (e) {
      console.error(e);
    }
  } else {
    if (!content) {
      content = readFileSync(join(__dirname, '../web/dist/index.html'), 'utf-8');
    }
    res.send(normalizeHtml(content, scripts));
  }
};
