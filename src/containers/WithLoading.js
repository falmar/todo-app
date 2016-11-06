// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {PropTypes} from 'react';

const Loading = ({header}) => {
    const Head = () => <h3>Loading...</h3>

    if(header) {
        return Head
    }

    return (
        <div className='row align-center'>
            <div className='small-12 medium-6 large-4 column'>
                <div className='box'>
                    <Head />
                </div>
            </div>
        </div>
    )
}

Loading.propTypes = {
    header: PropTypes.bool.isRequired
}

const WithLoading = (Comp, loading = true, header = false) => {
    const Container = (props) => {
        return loading ? <Loading header={header} /> : <Comp {...props} />
    }

    return <Container />
}

export default WithLoading
