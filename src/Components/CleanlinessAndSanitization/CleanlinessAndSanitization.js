import React, { Component } from 'react';
import { Row, Col, Card, Tab, Nav, Table, Modal, Button, Form } from 'react-bootstrap';
import expandIcon from '../../assets/images/expand.svg';
import searchIcon from '../../assets/images/search.svg';
import uploaded from '../../assets/images/uploaded-img.png';
import list from '../../assets/images/list.svg';

import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';
import AddPlantModal from './AddPlantModal';
import AssignTaskModal from './AssignTaskModal';
import { Link } from 'react-router-dom';
import PlantAreaModal from './PlantAreaModal';
import { Doughnut, Chart } from 'react-chartjs-2';
import Carousel from "react-multi-carousel";
class CleanlinessAndSanitization extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Data: [],
         modalShow: false,
         modalShow_one: false,
         modalShow_two: false,
         modalShow_third: false,
         plantCardList: [],
         plantTaskList: [],
         filterList: [],
         tableId: 'plant_0',
         updatePlantObject: '',
         currentId: '',
         plantObject: '',
         showChildren: true
      }

   }
   componentDidMount() {
      // debugger
      if (localStorage.getItem('plant')) {
         // const urlParam = this.props.history.location.search.split('&');
         // const plantId = urlParam[0].split('?plant=')[1];
         // const activePlantIndex = urlParam[1].split('index=')[1];

         GenericApiService.getAll(UrlConstants.getAllPlantUrl)
            .then(response => {
               this.setState({
                  plantCardList: response.data.plantsCardList,
                  filterList: response.data.plantTaskList,

               })

               const plantId = localStorage.getItem('plant');
               const activePlantIndex = localStorage.getItem('activePlant');
               this.openSelectedPlantTable(plantId, 'plant_' + activePlantIndex);
            }).catch(error => {

            })

      } else {
         this.getAllPlant();

      }
   }

   componentWillUnmount() {
      localStorage.clear();
      this.getAllPlant();

   }

   getAllPlant = () => {
      this.setState({
         showChildren: false
      })
      GenericApiService.getAll(UrlConstants.getAllPlantUrl)
         .then(response => {
            this.setState({
               plantCardList: response.data.plantsCardList,
               plantTaskList: response.data.plantTaskList,
               filterList: response.data.plantTaskList,
               showChildren: true
            })

         }).catch(error => {

         })
   }


   filterPlant = (searchText) => {

      const lowercasedValue = searchText.toLowerCase().trim();
      if (lowercasedValue === "") {
         this.setState({ plantTaskList: this.state.filterList })
      }
      else {
         const filteredItems = this.state.filterList.filter(item => {

            return Object.keys(item).some(key => {

               return item[key] ? item[key].toString().toLowerCase().includes(lowercasedValue) : false;

            });
         });

         this.setState({ plantTaskList: filteredItems })

      }
   }

   openSelectedPlantTable = (plantId, activePlant) => {

      if (this.state.currentId == '' || this.state.currentId != plantId) {
         this.setState({
            tableId: activePlant,
            currentId: plantId,

         })
         const url = UrlConstants.getPlantTaskByIdUrl + plantId;
         GenericApiService.getAll(url)
            .then(response => {
               this.setState({
                  plantTaskList: response.data,
                  filterList: response.data,
               })
            }).catch(error => {

            })
      } else {

         return false;

      }
   }

   openPlantAreaModal = (e) => {

      this.plantArea.plantAreaObject(e);

   }

   setModalShowOne = (e) => {
      this.setState({
         modalShow_one: e
      })
   }




   onHide = () => {
      this.setState({
         modalShow: false
      })
   }

   updatePlant = (plant) => {
      this.setState({
         updatePlantObject: JSON.stringify(plant)
      })
      this.addplant.showAddPlantModal();
   }

   assignTask = (event) => {

      const plant = this.state.plantTaskList[this.state.currentId];

      this.setState({
         plantObject: JSON.stringify(plant)
      })
      this.assignModal.showAssignTaskModal(true);
   }
   render() {

      const responsive = {
         superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
         },
         desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 2
         },
         tablet: {
            breakpoint: { max: 1199, min: 681 },
            items: 2,
            partialVisibilityGutter: 60,
            slidesToSlide: 2
         },
         mobile: {
            breakpoint: { max: 680, min: 0 },
            items: 1,
            slidesToSlide: 1
         },
      };

      return (
         <>


            {this.state.showChildren ?
               <>
                  <AddPlantModal ref={instance => this.addplant = instance} reloadList={this.getAllPlant} data={this.state.updatePlantObject} />
                  <AssignTaskModal ref={instance => this.assignModal = instance} plantData={this.state.plantObject} />
                  <PlantAreaModal ref={intance => this.plantArea = intance} reloadList={this.getAllPlant} />
               </> : null}



            <div className="dashboard-container cleanliness-sanitization">
               <div className="dashboard-section">
                  <div className="welcome-text">
                     <div className="pageTitle">
                        <h2>Cleanliness & Sanitization</h2>

                     </div>
                  </div>

                  <Tab.Container id="left-tabs-example" defaultActiveKey="plant_0">
                     <Row className=" plant-tabs">
                        <Carousel responsive={responsive} className="col-8">
                           {this.state.plantCardList.map((pcard, index) =>
                              <Nav.Item key={index}>
                                 <Nav.Link eventKey={`plant_` + index} >
                                    <Card className="emp-health card-alignment" onClick={(e) => this.openSelectedPlantTable(pcard.clientPlantMasterId, "plant_" + index)}>
                                       <Card.Title className="topCard">
                                          <div className="cardItem" onClick={() => this.updatePlant(pcard)}>
                                             <h2>
                                                {pcard.plant}
                                                {/* Plant {index == 0 ? 'I' : index == 1 ? 'II' : index == 2 ? 'III' : 'IV'} */}
                                             </h2>
                                             <div className="action-icons">
                                                <i className="editon" ></i>
                                             </div>
                                          </div>
                                       </Card.Title>
                                       <Card.Body className="h-100">
                                          <Row className="customRow align-items-center pr-0 mx-0 h-100">
                                             <Col md="4" xl="5" className="totalTasks text-center">
                                                <h4>{pcard.overdueCount + pcard.ipCount + pcard.doneCount}</h4>
                                                <h4 className="mb">Total Tasks</h4>
                                             </Col>
                                             <Col md="8" xl="7" className="pr-0 h-100">
                                                <div className="emp-tableContainer h-100">
                                                   <Table striped className="taskTable h-100">
                                                      <tbody>
                                                         <tr>
                                                            <td>Overdue</td>
                                                            <td>
                                                               <div className="option error-color">{pcard.overdueCount}</div>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>In-Progress</td>
                                                            <td>
                                                               <div className="option warning-color">{pcard.ipCount}</div>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>Done</td>
                                                            <td>
                                                               <div className="option success-color">{pcard.doneCount}</div>
                                                            </td>
                                                         </tr>
                                                      </tbody>
                                                   </Table>
                                                </div>
                                             </Col>
                                          </Row>
                                       </Card.Body>
                                    </Card>
                                 </Nav.Link>
                              </Nav.Item>)}
                        </Carousel>
                        <div className="col-4">
                           <Card className="emp-health addNew-card" onClick={() => this.addplant.showAddPlantModal(true)}>
                              <Card.Title className="topCard">
                                 {/* <div className="cardItem"> 
                                    <h2>Plant III</h2>
                                    <div className="action-icons">
                                       <i className="editon" onClick={() => this.setModalShowOne(true)}></i>
                                    </div>
                                 </div> */}
                              </Card.Title>
                              <Card.Body>
                                 <Row className="justify-content-center w-100 verification-container">
                                    <Col xl="12 align-self-center text-center verification-content pb-0">
                                       <h6>Plant II</h6>
                                       <p>Awaiting Verification...</p>
                                    </Col>
                                 </Row>
                                 <Row className="justify-content-center w-100 addNew-container">
                                    <Col xl="12 align-self-center text-center addNew-content pb-0">
                                       <span className="addBtn" ><i className="addIcon"></i></span>
                                    </Col>
                                 </Row>
                                 <Row className="customRow align-items-center pr-0 mx-0">
                                    <Col xl="5" className="totalTasks text-center">
                                       <h4>32</h4>
                                       <h4 className="mb">Total Tasks</h4>
                                    </Col>
                                    <Col xl="7" className="pr-0">
                                       <div className="emp-tableContainer">
                                          <Table striped className="taskTable">
                                             <tbody>
                                                <tr>
                                                   <td>Overdue</td>
                                                   <td>
                                                      <div className="option error-color">21</div>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>In-Progress</td>
                                                   <td>
                                                      <div className="option warning-color">18</div>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>Done</td>
                                                   <td>
                                                      <div className="option success-color">03</div>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </Table>
                                       </div>
                                    </Col>
                                 </Row>
                              </Card.Body>
                           </Card>
                        </div>
                     </Row>
                     <Tab.Content className="row-1 row">
                        <Tab.Pane eventKey={this.state.tableId} className="col-xl-12">
                           <Card className="statusTable">
                              <Card.Title className="bottomCard">
                                 <div className="cardTitle">
                                    <h4>Status</h4>
                                    <div className="tableSearch">
                                       <div className="filterSearch ml-auto">
                                          <Row className="align-items-center">
                                             <Col md="4" xl="4" className="pb-0">
                                                <form className="serach-form">
                                                   <select className="form-control" id="exampleFormControlSelect1">
                                                      <option>All Areas</option>
                                                      <option>2</option>
                                                      <option>3</option>
                                                      <option>4</option>
                                                      <option>5</option>
                                                   </select>
                                                </form>
                                             </Col>
                                             <Col md="4" xl="4" className="pb-0">
                                                <form className="serach-form">
                                                   <input className="form-control" type="text" onChange={(e) => this.filterPlant(e.target.value)} placeholder="Search" aria-label="Search" />
                                                   <span className="search-icon"></span>
                                                </form>
                                             </Col>
                                             <Col md="1" xl="1" className="text-right pb-0 pr-0">
                                                <span className="expandIcon ">
                                                   <img src={expandIcon} alt="icon" />
                                                </span></Col>
                                             <Col md="3" xl="3" className="text-right  pb-0">
                                                <button type="button" className="btn btn-primary  assign-btn btn-sm" onClick={(e) => this.assignTask(e)}>Assign Task</button></Col>
                                          </Row>
                                       </div>
                                    </div>
                                 </div>
                              </Card.Title>
                              <Card.Body className="px-0 pt-0">

                                 <div className="statusTableContainer">


                                    <Table responsive className="scroll-table statusDetailsTable">
                                       <thead>
                                          <tr>
                                             <th>Areas <span className="fillterArrow">
                                                <i className="topArrow"></i>
                                                <i className="bottomArrow"></i>
                                             </span>
                                             </th>
                                             <th>Task <span className="fillterArrow">
                                                <i className="topArrow"></i>
                                                <i className="bottomArrow"></i>
                                             </span>
                                             </th>
                                             <th>Assigned To </th>
                                             <th>Last Cleaned Date</th>
                                             <th>Status </th>
                                             <th>Details</th>
                                          </tr>
                                       </thead>
                                       <tbody className="scroll">
                                          {this.state.plantTaskList.map((plant, index) =>
                                             <tr key={index}
                                                className={`${plant.taskStatus == 'Overdue' ? 'error' :
                                                   plant.taskStatus == 'Done' ? 'success' : 'warning'}-status`}>
                                                <td onClick={() => this.openPlantAreaModal(plant)}>{plant.area}</td>
                                                <td>{plant.task}</td>
                                                <td>{plant.assignedTo}</td>
                                                <td>{plant.lastCleanedDate ? plant.lastCleanedDate : '--'}</td>
                                                <td className="action">{plant.taskStatus}</td>
                                                <td>
                                                   <div className="videoFile" onClick={() => this.openPlantAreaModal(plant)}>
                                                      <i className="icon icon-upload"></i>
                                                   </div>
                                                </td>
                                             </tr>)}
                                       </tbody>
                                    </Table>

                                 </div>
                              </Card.Body>
                           </Card>
                        </Tab.Pane>
                     </Tab.Content>

                  </Tab.Container>




                  {/* 
                  <Tab.Container id="left-tab" defaultActiveKey="first">
                     
                     <Nav variant="pills" className="row plant-tabs d-none">

                        <Nav.Item className="col-12 col-md-6 col-lg-4">
                           <Link >
                             
                             
                           </Link>
                        </Nav.Item>
                     </Nav>
                    
                     <Tab.Content className="row-1 row">

                      
                        <Tab.Pane eventKey="third" className="col-xl-12">
                           <Card className="statusTable">
                              <Card.Title className="bottomCard">
                                 <div className="cardTitle">
                                    <h4>Status</h4>
                                    <div className="tableSearch">
                                       <img src={searchIcon} alt="searchIcon" />
                                    </div>
                                 </div>
                              </Card.Title>
                              <Card.Body className="px-0 pt-0">
                                 <div className="statusTableContainer">

                                    <Table responsive className="scroll-table statusDetailsTable assignTable">
                                       <thead>
                                          <tr>
                                             <th>Areas <span className="fillterArrow"><i className="topArrow"></i><i className="bottomArrow"></i></span></th>
                                             <th>Task <span className="fillterArrow"><i className="topArrow"></i><i className="bottomArrow"></i></span></th>
                                             <th>Assigned To </th>
                                             <th>Last Cleaned Date</th>
                                             <th>Status </th>
                                             <th>Details</th>
                                          </tr>
                                       </thead>
                                       <tbody className="scroll">
                                          <div className="tableAssignBtn text-center" onClick={() => this.assignModal.showAssignTaskModal(true)}>
                                             <img src={list} alt="img" />
                                             <div className="assign-btn-container">
                                                <button type="button" className="btn btn-primary  assign-btn btn-sm">Assign Task</button>
                                             </div>
                                          </div>
                                          <tr className="">
                                             <td>Powder Coating Plant</td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td className="action"></td>
                                             <td></td>
                                          </tr>
                                          <tr className="">
                                             <td>Powder Coating Plant</td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td className="action"></td>
                                             <td></td>
                                          </tr>
                                          <tr className="">
                                             <td>Powder Coating Plant</td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td className="action"></td>
                                             <td></td>
                                          </tr>
                                          <tr className="">
                                             <td>Powder Coating Plant</td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td className="action"></td>
                                             <td></td>
                                          </tr>
                                          <tr className="">
                                             <td>Powder Coating Plant</td>
                                             <td></td>
                                             <td></td>
                                             <td></td>
                                             <td className="action"></td>
                                             <td></td>
                                          </tr>
                                       </tbody>
                                    </Table>
                                 </div>
                              </Card.Body>
                           </Card>
                        </Tab.Pane>
                     </Tab.Content>
                  </Tab.Container>
               */}
               </div>



               {/*  Edit Plant*/}
               <Modal id="editPlant"
                  show={this.state.modalShow_one}
                  onHide={() => { this.setModalShowOne(false) }}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
               >
                  <Modal.Header closeButton>
                     <Modal.Title id="contained-modal-title-vcenter">
                        Edit Plant
               </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Row>
                        <Col md="8" xl="8">
                           <Row className="align-items-center">
                              <Col md="4" xl="5" className="addPlantForm">
                                 <Form.Label>Plant Name</Form.Label>
                              </Col>
                              <Col md="8" xl="7 pl-0" className="addPlantForm">
                                 <Form.Group>
                                    <Form.Control type="text" defaultValue="Plant II" placeholder="Name" />
                                 </Form.Group>
                              </Col>
                              <Col md="4" xl="5" className="addPlantForm">
                                 <Form.Label>Address</Form.Label>
                              </Col>
                              <Col md="8" xl="7  pl-0" className="addPlantForm">
                                 <Form.Group>
                                    <Form.Control type="text" defaultValue="Ennore, Chennai" placeholder="Address" />
                                    <i className="mapIcon"></i>
                                 </Form.Group>
                              </Col>
                              <Col md="4" xl="5" className="addPlantForm">
                                 <Form.Label>Plant Manager</Form.Label>
                              </Col>
                              <Col md="8" xl="7  pl-0" className="addPlantForm">
                                 <Form.Group>
                                    <Form.Control type="text" placeholder="Manager" defaultValue="Raja Murugan" />
                                 </Form.Group>
                              </Col>
                           </Row>
                        </Col>
                        <Col md="4" xl="4">
                           <div className="mediaUpload">
                              {/* <i className="icon icon-upload"></i> */}
                              <img src={uploaded} alt="img" />
                           </div>
                        </Col>
                        <Col xl="12 mt-2">
                           <Row className="">
                              <Col md="2" xl="3" className="addPlantForm align-items-start pt-1">
                                 <Form.Label>Plant Name</Form.Label>
                              </Col>
                              <Col md="10" xl="9 pl-0 pl-2" className="addPlantForm">
                                 <div className="action">
                                    <i className="icon deleteIcon mr-1"></i>
                                    <i className="icon addIcon"></i>
                                 </div>
                                 <Form.Group className="d-flex align-items-center add-field">
                                    <p className="mb-0">1.</p>
                                    <Form.Control type="text" defaultValue="Meeting Room" placeholder="Name" />
                                 </Form.Group>
                                 <Form.Group className="d-flex align-items-center add-field">
                                    <p className="mb-0">2.</p>
                                    <Form.Control type="text" defaultValue="Powder Coating Plant" placeholder="Name" />
                                 </Form.Group>
                                 <Form.Group className="d-flex align-items-center add-field">
                                    <p className="mb-0">3.</p>
                                    <Form.Control type="text" defaultValue="Meeting Room II" placeholder="Name" />
                                 </Form.Group>

                              </Col>
                           </Row>
                        </Col>
                        <Col xl="12 text-center mt-4" className="modal-btn">
                           <Button variant="secondary" className="cancel-btn" size="sm">Cancel</Button>
                           <Button variant="secondary" className="verify-btn" size="sm">Verify</Button>
                        </Col>
                     </Row>
                  </Modal.Body>
               </Modal>

            </div>
         </>
      );
   }
}
export default CleanlinessAndSanitization;