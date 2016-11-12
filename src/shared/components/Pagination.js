// Copyright 2016 David Lavieri.  All rights reserved.
// Use of this source code is governed by a MIT License
// License that can be found in the LICENSE file.

import React, {Component, PropTypes} from 'react';

const Pagination  = ({previous, next, pages}) => {
    return (
        <ul className='pagination' role='navigation' aria-label='Pagination'>
            {previous}
            {pages}
            {next}
        </ul>
    )
}

Pagination.propTypes = {
    previous: PropTypes.node,
    next: PropTypes.node,
    pages: PropTypes.node.isRequired
}

class PaginationContainer extends Component {
    getPrevious() {
        const {change, pagination} = this.props;
        const {
            current_page: currentPage,
            total_pages: totalPages,
            total_results: totalResults,
            links
        } = pagination

        const disabled = totalPages === 1 || currentPage === 1 || totalResults === 0;
        const cn = `pagination-previous ${disabled ? 'disabled' : ''}`;
        const text = 'Previous'
        const link = disabled ? text : <a href='#' onClick={() => change(links.previous.page)}>{text}</a>

        return <li className={cn}>{link}</li>
    }

    getNext() {
        const {change, pagination} = this.props;
        const {
            current_page: currentPage,
            total_pages: totalPages,
            total_results: totalResults,
            links
        } = pagination

        const disabled = totalPages === 1 || currentPage === totalPages || totalResults === 0;
        const cn = `pagination-next ${disabled ? 'disabled' : ''}`;
        const text = 'Next'
        const link = disabled ? text : <a href='#' onClick={() => change(links.next.page)}>{text}</a>

    return <li className={cn}>{link}</li>
    }

    getPages() {
        const {change, pagination} = this.props
        const {current_page: currentPage, pages} = pagination
        const isCurrent = (page) => {
            return currentPage === page ? 'current' : ''
        }
        const link = (page) => {
            if (!isCurrent(page)) {
                return <a href='#' onClick={() => change(page)}>{page}</a>
            }

            return page
        }

        return pages.map(elm => {
            return  <li key={elm.page} className={isCurrent(elm.page)}>
                        {link(elm.page)}
                    </li>
        })
    }

    render() {
        return (
            <Pagination
                previous={this.getPrevious()}
                next={this.getNext()}
                pages={this.getPages()} />
        )
    }
}

PaginationContainer.propTypes = {
    pagination: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired
}

export default PaginationContainer
