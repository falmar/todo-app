// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {PropTypes} from 'react'

const Loading = ({header}) => {
  const head = <h3>Loading...</h3>

  if (header) {
    return head
  }

  return (
    <div className='row align-center'>
      <div className='small-12 medium-6 large-4 column'>
        <div className='box'>
          {head}
        </div>
      </div>
    </div>
  )
}

Loading.propTypes = {
  header: PropTypes.bool.isRequired
}

const WithLoading = (Comp, loading = true, header = false) => {
  if (loading) {
    return <Loading header={header} />
  }

  return Comp
}

export default WithLoading
