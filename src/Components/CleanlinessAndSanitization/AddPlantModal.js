import React, { Component } from 'react'
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { GenericApiService } from '../../Service/GenericApiService';
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';
import { UrlConstants } from '../../Service/UrlConstants';

class AddPlantModal extends Component {

   constructor(props) {
      super(props)

      this.state = {
         showModal: false,
         bcmUserId: '',
         bcmUserName: '',
         location: '',
         plant: '',
         plantAreas: [
            {
               areaName: '',
               clientPlanAreaDetailId: 0
            }
         ],
         isError: {
            bcmUserName: '',
            location: '',
            plant: ''
         },
         employeeCodeList: [],
         isLoading: false

      }
   }

   componentDidMount() {
      if(this.props.data){
         var updateObj = JSON.parse(this.props.data);

         this.getUserDetails(updateObj.bcmUserId);
         this.setState({
            location:updateObj.location,
            plant:updateObj.plant,
            plantAreas:updateObj.plantAreas,


         })

      }

   }

   showAddPlantModal = (e) => {
      this.setState({
         showModal: e
      })
   }



   plantValidator = (Param) => {
      var returnMsg = '';
      if (Param.length == 0) {
         returnMsg = 'Plant Name is required';
      } else {
         returnMsg = '';
      }
      return returnMsg;
   }

   locationValidator = (Param) => {
      var returnMsg = '';
      if (Param.length == 0) {
         returnMsg = 'Location Name is required';
      } else {
         returnMsg = '';
      }
      return returnMsg;
   }

   bcmUserValidator = (Param) => {
      var returnMsg = '';
      if (Param.length == 0) {
         returnMsg = 'Plant Manager is required';
      } else {
         returnMsg = '';
      }
      return returnMsg;
   }


   formValChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let isError = { ...this.state.isError };
      switch (name) {
         case "location":
            isError.location = this.locationValidator(value)
            break;
         case "plant":
            isError.plant = this.plantValidator(value)
            break;
         case "bcmUserName":
            isError.bcmUserName = this.bcmUserValidator(value)
            break;
         default:
            break;
      }

      this.setState({
         isError,
         [name]: value
      });
   };


   createAreasInput() {
      return this.state.plantAreas.map((el, i) =>

         <Row className="" key={i}>

            <Col md="2" xl="3" className="addPlantForm align-items-start pt-1">
               <Form.Label>Areas</Form.Label>
            </Col>
            <Col md="10" xl="9 pl-0 pl-2" className="addPlantForm">
               <div className="action">
                  <i className="icon addIcon" onClick={this.addClick.bind(this)}></i>
                  <i className="icon deleteIcon mr-1" onClick={this.removeClick.bind(this, i)}></i>
               </div>
               <Form.Group className="d-flex align-items-center add-field">
                  <p className="mb-0">{1+i}.</p>
                  <Form.Control type="text" value={el.areaName || ''} name={el.areaName} onChange={this.handleChange.bind(this, i)} placeholder="Area" />
               </Form.Group>

            </Col>
         </Row>

      )
   }


   handleChange(i, event) {
      // debugger
      let plantAreas = [...this.state.plantAreas];

      plantAreas[i].areaName = event.target.value;

      this.setState({ plantAreas });
   }

   addClick() {
      this.setState(prevState => ({ plantAreas: [...prevState.plantAreas, { areaName: '', clientPlanAreaDetailId: 0 }] }))
   }

   removeClick(i) {
      let plantAreas = [...this.state.plantAreas];
      if (plantAreas.length > 1) {
         plantAreas.splice(i, 1);
         this.setState({ plantAreas });
      }
   }


   handleSubmit = (event) => {

      event.preventDefault();

      if (this.plantValidator(this.state.plant) == '' &&
         this.bcmUserValidator(this.state.bcmUserName) == '' &&
         this.locationValidator(this.state.location) == '') {
         const object = {

            bcmUserId: this.state.bcmUserId,
            location: this.state.location,
            plant: this.state.plant,
            plantAreas: this.state.plantAreas

         }

         console.log(object);

         GenericApiService.post(UrlConstants.savePlantUrl,object).then(response=>{
            if(response.status.success=='SUCCESS'){
              this.props.reloadList();
              this.showAddPlantModal(false);

            }
         }).catch(error=>{

         })


      }
      else {
         let isError = { ...this.state.isError };
         console.log(isError);
         isError.location = this.locationValidator(this.state.location);
         isError.bcmUserName = this.bcmUserValidator(this.state.bcmUserName);
         isError.plant = this.plantValidator(this.state.plant);

         this.setState({ isError: isError });

      }
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
            bcmUserId: Response.data.bcmUserId,
            bcmUserName: Response.data.firstName
         })
      }).catch(error=>{
            
      })
   }


   render() {
      const { isError, isLoading } = this.state;

      return (
         <Modal id="addPlant"
            show={this.state.showModal}
            onHide={() => { this.showAddPlantModal(false) }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  Add Plant
         </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form noValidate>
                  <Row>
                     <Col md="8" xl="8">
                        <Row className="align-items-center">
                           <Col md="4" xl="5" className="addPlantForm">
                              <Form.Label>Plant Name</Form.Label>
                           </Col>
                           <Col md="8" xl="7 pl-0" className="addPlantForm">
                              <Form.Group>
                                 <Form.Control type="text" name="plant" onChange={this.formValChange.bind(this)} placeholder="Name" />
                                 {isError.plant.length > 0 && (
                                    <Form.Text className="error-msg"> {isError.plant} </Form.Text>
                                 )}
                              </Form.Group>
                           </Col>
                           <Col md="4" xl="5" className="addPlantForm">
                              <Form.Label>Address</Form.Label>
                           </Col>
                           <Col md="8" xl="7  pl-0" className="addPlantForm">
                              <Form.Group>
                                 <Form.Control type="text" name="location" onChange={this.formValChange.bind(this)} placeholder="Address" />
                                 <i className="mapIcon"></i>
                                 {isError.location.length > 0 && (
                                    <Form.Text className="error-msg"> {isError.location} </Form.Text>
                                 )}
                              </Form.Group>
                           </Col>

                           <Col md="4" xl="5" className="addPlantForm">
                              <Form.Label>Search Employee </Form.Label>
                           </Col>
                           <Col md="8" xl="7  pl-0" className="addPlantForm">
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


                           <Col md="4" xl="5" className="addPlantForm">
                              <Form.Label>Plant Manager</Form.Label>
                           </Col>
                           <Col md="8" xl="7  pl-0" className="addPlantForm">
                              <Form.Group>
                                 <Form.Control type="text" readOnly value={this.state.bcmUserName} name="bcmUserName" placeholder="Manager" />
                                 {isError.bcmUserName.length > 0 && (
                                    <Form.Text className="error-msg"> {isError.bcmUserName} </Form.Text>
                                 )}
                              </Form.Group>
                           </Col>
                        </Row>
                     </Col>
                     <Col md="4" xl="4">
                        <div className="mediaUpload">
                           <i className="icon icon-upload"></i>
                        </div>
                     </Col>
                     <Col xl="12 mt-2">
                        {this.createAreasInput()}
                     </Col>
                     <Col xl="12 text-center mt-4" className="modal-btn">
                        <Button variant="secondary" size="sm" onClick={() => this.showAddPlantModal(false)} >Cancel</Button>
                        <Button variant="secondary" type="submit" onClick={this.handleSubmit} size="sm">Verify</Button>
                     </Col>
                  </Row>
               </Form>
            </Modal.Body>
         </Modal>
      )
   }
}

export default AddPlantModal;
