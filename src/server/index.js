// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import express from 'express';
import path from 'path';

import handle from './handle';

const app = express()
const root = path.join(__dirname, 'public')

app.use(express.static(root))

app.use(handle)

app.listen(3000);
