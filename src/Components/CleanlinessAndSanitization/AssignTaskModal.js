import React, { Component } from 'react'
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class AssignTaskModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            taskList: [],
            areaList: [],
            plantList: [],
            isLoading: false,
            employeeCodeList: [],
            plantTaskId: '',
            taskAssignedTo: '',
            taskDateString: '',
            taskMasterId: '',
            taskStatus: '',
            timeFrom: '',
            timeTo: '',
            area: '',
            task: '',
            clientPlanAreaDetailId: '',
            taskAssigneeName: '',


            isError: {
                taskDateString: '',
                taskStatus: '',
                timeFrom: '',
                timeTo: '',
                taskAssignedTo: '',
                taskMasterId: '',
                clientPlanAreaDetailId: '',





            },

        }
    }

    componentDidMount() {
        this.getAreasAndTaskList();
        // this.getPlantCountList();


    }


    getPlantCountList = () => {
        GenericApiService.getAll(UrlConstants.getDashbordPlantCountUrl)
            .then(response => {
                this.setState({ plantList: response.data });
            })
            .catch(error => {

            })
    }

    getAreasAndTaskList() {
        GenericApiService.getAll(UrlConstants.getAreasAndTaskUrl)
            .then(response => {

                this.setState({
                    taskList: response.data.tasks,
                    areaList: response.data.areas
                });
                // console.log(response);

            }).catch(error => {

            })
    }

    showAssignTaskModal = (e) => {
        this.setState({
            modalShow: e
        })
    }


    getEmployeeCodeList = (empCode) => {
        const url = '/user/' + empCode;
        this.setState({ isLoading: true });
        GenericApiService.getAll(url).then(Response => {
            this.setState({
                employeeCodeList: Response.data,
                isLoading: false
            });
        }).catch(error => {

        })
    }

    employeeCode = (e) => {

        if (e.length === 0) {
            return false;
        } else {
            const selectUserId = e[0].bcmUserId;
            this.getUserDetails(selectUserId);
        }
    }
    getUserDetails = (userId) => {
        const url = '/user/getbyId/' + userId;
        GenericApiService.getAll(url).then(Response => {
            this.setState({
                taskAssignedTo: Response.data.bcmUserId,
                taskAssigneeName: Response.data.firstName
            })
            this.formValChange({ target: { name: "taskAssignedTo", value: Response.data.bcmUserId } })
        }).catch(error => {

        })
    }

    submitAssignTask = (event) => {


        event.preventDefault();
        // console.log(this.validForm());

        if (this.validForm()) {
            var date = new Date(this.state.taskDateString);
            // const statusDate = date.toDateString().split(' ')[1]+' '+ date.toDateString().split(' ')[2]; 

            const object = {
                clientPlanAreaDetailId: this.state.clientPlanAreaDetailId,
                plantTaskId: 0,
                taskAssignedTo: this.state.taskAssignedTo,
                taskDateString: date.toLocaleString().split(',')[0].replace(/[/]/g,'-'),
                taskMasterId: this.state.taskMasterId,
                taskStatus: this.state.taskStatus,
                timeFrom: this.state.timeFrom,
                timeTo: this.state.timeTo,

            }


            console.log(object);

             GenericApiService.post(UrlConstants.saveAssignTaskUrl,object).then(response=>{
                if(response.status.success=='SUCCESS'){
                //   this.props.reloadList();
                  this.showAssignTaskModal(false);

                }
             }).catch(error=>{

             })


        }
        else {
            let isError = { ...this.state.isError };
            // console.log(isError);
            isError.taskDateString = this.taskStatusValidator(this.state.taskDateString);
            isError.taskStatus = this.taskStatusValidator(this.state.taskStatus);
            isError.timeTo = this.toTimeValidator(this.state.timeTo);
            isError.timeFrom = this.fromTimeValidator(this.state.timeFrom);
            isError.taskAssignedTo = this.taskAssignedToValidator(this.state.taskAssignedTo);
            isError.taskMasterId = this.taskMasterIdValidator(this.state.taskMasterId);
            isError.clientPlanAreaDetailId = this.taskAreaValidator(this.state.clientPlanAreaDetailId);


            this.setState({ isError: isError });

        }

    }

    validForm = () => {
        if (this.toTimeValidator(this.state.timeTo) == '' &&
            this.taskStatusValidator(this.state.taskStatus) == '' &&
            this.fromTimeValidator(this.state.timeFrom) == '' &&
            this.taskDateValidator(this.state.taskDateString) == '' &&
            this.taskAreaValidator(this.state.clientPlanAreaDetailId) ==''&&
            this.taskMasterIdValidator(this.state.taskMasterId) == '' &&
            this.taskAssignedToValidator(this.state.taskAssignedTo) == '') {
            return true;
        }else{
            return false;
        }
    }

    formatAM_PM = () => {
        var  date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
     }

    taskDateValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'Task Date is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }

    toTimeValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'End time is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }

    fromTimeValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'Start is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }

    taskStatusValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'Task status is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }

    taskAreaValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'Task area is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }

    taskMasterIdValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'Task name is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }

    taskAssignedToValidator = (Param) => {
        var returnMsg = '';
        if (Param.length == 0) {
            returnMsg = 'Task assignee name is required';
        } else {
            returnMsg = '';
        }
        return returnMsg;
    }





    formValChange = e => {

        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        switch (name) {
            case "timeTo":
                isError.timeTo = this.toTimeValidator(value)
                break;
            case "timeFrom":
                isError.timeFrom = this.fromTimeValidator(value)
                break;
            case "taskDateString":
                isError.taskDateString = this.taskDateValidator(value)
                break;
            case "taskStatus":
                isError.taskStatus = this.taskStatusValidator(value)
                break;
            case "taskAssignedTo":
                isError.taskAssignedTo = this.taskAssignedToValidator(value)
                break;
            case "taskMasterId":
                isError.taskMasterId = this.taskMasterIdValidator(value)
                break;
            case "clientPlanAreaDetailId":
                isError.clientPlanAreaDetailId = this.taskAreaValidator(value)
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
        });
    };




    render() {
        const { isLoading, isError } = this.state;
        return (
            <Modal id="assignTask"
                show={this.state.modalShow}
                onHide={() => { this.showAssignTaskModal(false) }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Assign Task
                   </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xl="12">
                            <Row className="align-items-center">
                                {/* <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Plant</Form.Label>
                                </Col>
                                <Col md="9" xl="8 pl-0" className="addPlantForm">
                                    <Form.Group>
                                        <Form.Control type="text" readOnly defaultValue="" name="clientPlantMasterId" />
                                    </Form.Group>
                                </Col> */}
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Area Name</Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Form.Group>
                                        <Form.Control as="select" name="clientPlanAreaDetailId" onChange={this.formValChange.bind(this)} >
                                            <option value={''} >Select Area Name</option>
                                            {this.state.areaList.map((area, index) => <option key={index} value={area.clientPlanAreaDetailId}>
                                                {area.areaName}
                                            </option>)}

                                        </Form.Control>
                                        {isError.clientPlanAreaDetailId.length > 0 && (
                                            <Form.Text className="error-msg"> {isError.clientPlanAreaDetailId} </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Task Name</Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Form.Group>
                                        <Form.Control as="select" onChange={this.formValChange.bind(this)} name="taskMasterId" >
                                            <option value={''} >Select Task Name</option>
                                            {this.state.taskList.map((task, index) => <option key={index} value={task.taskMasterId}>
                                                {task.task}
                                            </option>)}

                                        </Form.Control>
                                        {isError.taskMasterId.length > 0 && (
                                            <Form.Text className="error-msg"> {isError.taskMasterId} </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Search Employee </Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Form.Group controlId="empId">
                                        <AsyncTypeahead
                                            id="basic-typeahead-example" labelKey="userCode"
                                            isLoading={isLoading}
                                            // minLength={}
                                            onChange={this.employeeCode}
                                            options={this.state.employeeCodeList}
                                            onSearch={this.getEmployeeCodeList} placeholder="Choose employee code"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Employee</Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Form.Group>
                                        <Form.Control type="text" readOnly defaultValue={this.state.taskAssigneeName} name="taskAssignedTo" placeholder="Name" />
                                        {isError.taskAssignedTo.length > 0 && (
                                            <Form.Text className="error-msg"> {isError.taskAssignedTo} </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Date</Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Form.Group>
                                        <Form.Control type="date" name="taskDateString" onChange={this.formValChange.bind(this)} placeholder="Task Date" />
                                        <i className="calIcon"></i>
                                        {isError.taskDateString.length > 0 && (
                                            <Form.Text className="error-msg"> {isError.taskDateString} </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Time</Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Row>
                                        <Col md="6" xl="6"><Form.Group>
                                            <Form.Control type="text" name="timeFrom" onChange={this.formValChange.bind(this)} placeholder="From Time" />
                                            <i className="timeIcon"></i>
                                            {isError.timeFrom.length > 0 && (
                                                <Form.Text className="error-msg"> {isError.timeFrom} </Form.Text>
                                            )}
                                        </Form.Group></Col>
                                        <Col md="6" xl="6"><Form.Group>
                                            <Form.Control type="text" name="timeTo" onChange={this.formValChange.bind(this)} placeholder="To Time" />
                                            <i className="timeIcon"></i>
                                            {isError.timeTo.length > 0 && (
                                                <Form.Text className="error-msg"> {isError.timeTo} </Form.Text>
                                            )}
                                        </Form.Group>
                                        </Col>
                                    </Row>

                                </Col>
                                <Col md="3" xl="4" className="addPlantForm">
                                    <Form.Label>Status</Form.Label>
                                </Col>
                                <Col md="9" xl="8  pl-0" className="addPlantForm">
                                    <Form.Group>
                                        {/* className="inprogress" */}
                                        <Form.Control className="inprogress" name="taskStatus" as="select" onChange={this.formValChange.bind(this)} placeholder="Select Status">
                                            <option value={''} >Select Status</option>
                                            <option value='In Progress'>In Progress</option>
                                            <option value='OverDue'>OverDue</option>
                                            <option value='Done' >Done</option>

                                        </Form.Control>
                                        {isError.taskStatus.length > 0 && (
                                            <Form.Text className="error-msg"> {isError.taskStatus} </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl="12 mt-4">
                            <div className="mediaUpload">
                                <i className="icon icon-upload"></i>
                            </div>
                        </Col>

                        <Col xl="12 text-center mt-4" className="modal-btn">
                            <Button variant="secondary" className="verify-btn" onClick={this.submitAssignTask} size="sm">Verify</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AssignTaskModal
