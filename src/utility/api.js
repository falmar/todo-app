// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

// return the full url by appending the path
export const getAPIUrl = (url) => `${process.env.API_URL}${url}`;
