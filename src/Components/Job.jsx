import React, { Component } from 'react'
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Card, Col, Row } from 'react-bootstrap'
import { day, morning, night } from '../Icons'
import Icon from './Icon';
import { applyJob, declineJob } from '../Redux/actions/job.actions';
export default class Job extends Component {
    state = {
        applyAlert: false,
        applySuccessAlert: false,
        errorApplyAlert: false,

        declineAlert: false,
        declineSuccessAlert: false,
        errorDeclineAlert: false,
        id: null,
        message: ''
    }

    /**
     * @desc handle the apply button action and show the apply confimation alert
     * @param {number} id 
     */
    handleApply = id => {
        this.setState({
            id,
            applyAlert: true,
            message: ' You wanna apply!'
        })
    }

    /**
     * @desc handle the decline button action and show the decline confimation alert
     * @param {number} id
     */
    handleDecline = id => {
        this.setState({
            id,
            declineAlert: true,
            message: ' You wanna decline!'
        })
    }

    /**
     * @desc  this function will call apply is confirmed and call the apply job api 
     * when api will success then close the confimation alert and show the success alert
     * when api will not success close the confimation alert and show the error alert
     */
    apply = () => {
        applyJob(this.state.id, data => {
            if (data.success) {
                this.setState({
                    id: null,
                    applyAlert: false,
                    applySuccessAlert: true,
                    message: ""
                })
            }
            else {
                this.setState({
                    id: null,
                    applyAlert: false,
                    errorApplyAlert: true,
                    message: data.error
                })
            }
        })
    }


    /**
     * @desc  this function will call decline is confirmed and call the decline job api
     * when api will success then close the confimation alert and show the success alert
     * when api will not success close the confimation alert and show the error alert
     */
    decline = () => {
        declineJob(this.state.id, data => {
            if (data.success) {
                this.setState({
                    id: null,
                    declineAlert: false,
                    declineSuccessAlert: true,
                    message: ""
                })
            }
            else {
                this.setState({
                    id: null,
                    declineAlert: false,
                    errorDeclineAlert: true,
                    message: data.error
                })
            }
        })
    }
    /**
     * @desc set initial state
     */
    onCancel = () => {
        this.setState({
            id: null,
            applyAlert: false,
            applySuccessAlert: false,
            errorApplyAlert: false,
            declineAlert: false,
            declineSuccessAlert: false,
            errorDeclineAlert: false,
            message: ""
        })
    }

    render() {
        /**
         * decentralize the props
         */
        const { id, job_type, date, invited, start_time, end_time, Company, rate, review } = this.props.job

        /**
        * decentralize the state
        */
        const { applyAlert, applySuccessAlert, message, errorApplyAlert, declineAlert, declineSuccessAlert, errorDeclineAlert } = this.state

        /**
         * set the icon according to job_type
         */
        const icon = job_type === 'day' ? day : job_type === 'night' ? night : morning;

        let title = moment(date).format('ddd D MMM')

        return (
            <Row className={`job ${invited ? 'invited-job' : ''}`}>

                {/* apply confirmation alert */}
                <SweetAlert
                    show={applyAlert}
                    warning
                    showCancel
                    confirmBtnText="Yes"
                    cancelBtnBsStyle="outline-decline"
                    confirmBtnBsStyle="apply"
                    title="Are you sure?"
                    onConfirm={this.apply}
                    onCancel={this.onCancel} >
                    {message}
                </SweetAlert>

                {/* apply success alert */}
                <SweetAlert
                    success
                    show={applySuccessAlert}
                    title="Successfully Applied!"
                    confirmBtnBsStyle="apply"
                    onConfirm={this.onCancel}
                    onCancel={this.onCancel}
                />

                {/* apply error alert */}
                <SweetAlert
                    danger
                    show={errorApplyAlert}
                    title={message}
                    confirmBtnBsStyle="outline-decline"
                    onConfirm={this.onCancel}
                    onCancel={this.onCancel}
                />
                {/* Decline confirmation alert */}
                <SweetAlert
                    show={declineAlert}
                    warning
                    showCancel
                    confirmBtnText="Yes"
                    cancelBtnBsStyle="outline-decline"
                    confirmBtnBsStyle="apply"
                    title="Are you sure?"
                    onConfirm={this.decline}
                    onCancel={this.onCancel} >
                    {message}
                </SweetAlert>

                {/* decline scuccess alert */}
                <SweetAlert
                    success
                    show={declineSuccessAlert}
                    title="Declined!"
                    confirmBtnBsStyle="apply"
                    onConfirm={this.onCancel}
                    onCancel={this.onCancel}
                />

                {/* decline error alert */}
                <SweetAlert
                    danger
                    show={errorDeclineAlert}
                    title={message}
                    confirmBtnBsStyle="outline-decline"
                    onConfirm={this.onCancel}
                    onCancel={this.onCancel}
                />
                <Col xs={4} sm={4} md={4} className="job-left">
                    <Card className="px-2">
                        <Card.Title as="p">{title} {!invited && <Icon icon={icon} />}  </Card.Title>
                        <p className="time text-muted">{start_time} - {end_time}</p>
                        <p className="company text-muted">{Company}</p>
                        <Card.Title as="p" className="rate">${rate}/hr</Card.Title>
                    </Card>
                </Col>
                <Col xs={8} sm={8} md={8} className="job-right">
                    <Card as={Row} className="px-2">
                        <Col xs={8} sm={8} md={8}>
                            <Card.Title as="p" className="mb-0">{review.title}</Card.Title>
                            <StarRatings
                                rating={review.rating}
                                numberOfStars={5}
                                starRatedColor="#e97625bd"
                                starDimension={'12px'}
                                starSpacing={'0px'}
                                name='rating'
                            />
                            <p className="address text-muted">{review.address1}</p>
                            <p className="address text-muted">{review.address2}</p>

                        </Col>
                        <Col xs={4} sm={4} md={4} className="d-flex m-auto">
                            {invited &&
                                <Button
                                    onClick={() => this.handleDecline(id)}
                                    className="ml-auto"
                                    size="sm"
                                    variant="outline-decline"
                                >
                                    DECLINE
                                    </Button>
                            }
                            <Button
                                onClick={() => this.handleApply(id)}
                                size="sm"
                                className={invited ? "ml-3" : "ml-auto"}
                                variant="apply"
                            >
                                APPLY
                            </Button>

                        </Col>
                    </Card>

                </Col>

            </Row>
        )
    }
}
