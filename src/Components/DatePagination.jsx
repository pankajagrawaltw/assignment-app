import { Button } from 'react-bootstrap'
import React from 'react'
import moment from 'moment';

import { leftArrow, rightArrow } from '../Icons'
import Icon from './Icon'

/**
 * @desc Date pagination by week
 * @param {Object} {dates,index,onChange}
 * @returns {JSX.Element} JSX.Element
 */
export default function DatePagination({ dates, index, onChange }) {

    /**
     * get from and to from dates array by index
     */
    var { from, to } = dates[index]
    return (
        <div className="w-25 m-auto p-3 d-flex justify-content-between">

            {/* 
             * disabled- for 0 index
             * onClick- decrease index by 1
             */}
            <Button
                disabled={index === 0}
                onClick={() => onChange(index - 1)}
                variant="light"
            >
                <Icon icon={leftArrow} />
            </Button>

            <div className="mt-2">
                <span><b>{moment(from).format('DD')}</b></span> -
                <span><b>{moment(to).format('DD MMM YYYY')}</b></span>
            </div>

            {/* 
             * disabled- for last index
             * onClick- decrease index by 1
             */}
            <Button
                onClick={() => onChange(index + 1)}
                disabled={index + 1 === dates.length}
                variant="light"><Icon icon={rightArrow} /></Button>

        </div>
    )
}
