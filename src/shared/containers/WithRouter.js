// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React from 'react'

export default (Comp) => {
  const RouteContainer = (props) => <Comp {...props} />

  return RouteContainer
}
