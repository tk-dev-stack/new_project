import React, { Component } from 'react'
import { Modal, Table, Row, Col } from 'react-bootstrap';
import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';
import videoFile from '../../assets/images/upload.svg';
import doneImg from '../../assets/images/deatils-done@2x.png';
import mediaImg from '../../assets/images/powder-coat-plant.jpg';

class PlantAreaModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            plantId: '',
            areaTaskList: [],
        }
    }

    setModalShow = (e) => {
        this.setState({
            modalShow: e
        })
    }

    plantAreaObject = (object) => {
        this.setModalShow(true);
        const plantMasterId = object.clientPlantMasterId;
        GenericApiService.getAll(UrlConstants.getplantAreaByIdUrl + plantMasterId)
            .then(response => {
                this.setState({
                    areaTaskList: response.data
                })
            })
            .catch(error => {

            })
    }

    render() {
        return (
            <Modal id="powderCoating"
                show={this.state.modalShow}
                onHide={() => { this.setModalShow(false) }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Powder Coating Plant Plant I
                   </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mediaImage">
                        <Col sm="6" xl="6" className="mediaItem">
                            <img src={mediaImg} alt="MediaImg" /></Col>
                        <Col sm="6" xl="6" className="mediaItem">
                            <img src={mediaImg} alt="MediaImg" /></Col>
                    </Row>
                    <div className="statusTableContainer mt-3 p-4">
                        <Table responsive className="scroll-table statusDetailsTable modalTable">
                            <thead>
                                <tr>
                                    <th>Task <span className="fillterArrow"><i className="topArrow"></i><i className="bottomArrow"></i></span></th>
                                    <th>Assigned To </th>
                                    <th>Last Cleaned Date <span className="fillterArrow"><i className="topArrow"></i><i className="bottomArrow"></i></span></th>
                                    <th> Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody className="scroll">
                                {this.state.areaTaskList.map((plant, index) =>
                                    <tr key={index}>
                                        <td>{plant.task}</td>
                                        <td>{plant.assignedTo}</td>
                                        <td>{plant.lastCleanedDate?plant.lastCleanedDate:'--'}</td>
                                        <td className="action">
                                            <span className={`${plant.taskStatus == 'Overdue' ? 'error' :
                                                plant.taskStatus == 'Done' ? 'success' : 'warning'}`}>
                                                {plant.taskStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="videoFile">
                                                <i className="icon icon-upload"></i>
                                            </div>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default PlantAreaModal;
