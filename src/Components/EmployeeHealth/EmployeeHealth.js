import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Button, Modal, Table, Form,Spinner } from 'react-bootstrap';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import userImg from '../../assets/images/Mask-Group-user.png';
import searchIcon from '../../assets/images/search.svg';
import expandIcon from '../../assets/images/expand.svg';
import callIcon from '../../assets/images/phone.svg';
import videoIcon from '../../assets/images/video-call.svg';
import mailIcon from '../../assets/images/mail.svg';
import surveyIcon from '../../assets/images/survey.svg';
import fever from '../../assets/images/fever.png';
import cough from '../../assets/images/dry-cough.png';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ModelCaseHistory from './ModelCaseHistory';
import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';
import * as EmployeeHealthService from './EmployeeHealthService';

class EmployeeHealth extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Data: [],
         modalShow: false,
         empHealthStatusList: [],
         statuscode: '',
         filterEmpList:[],        
         rendomData: parseInt(Math.random() * (999999 - 111111) + 111111),
         covidConfirmedCount:'',
         covidSuspectedCount:'',
         covidStayAtHomeCount:'',
         covidRecoveredCount:'',
         covidOnSiteCount:'',
         covidOnLeaveCount:'',
         empConfirmedList:[],
         empConfirmedfilterList:[],
         empSuspectedList:[],
         empSuspectedConfirmedList:[],
         empStayAtHomeList:[],
         empStayAtHomeConfirmedList:[],
         empRecoveredList:[],
         empRecoveredConfirmedList:[],
         empOnSiteList:[],
         empOnSiteConfirmedList:[],
         empOnLeaveList:[],
         empOnLeaveConfirmedList:[],
         currentActiveCategoryEmpList:[],
         selectedRowEmpData:[],
         carouselLoder:false
      };
      // this.onRowSelect = this.onRowSelect.bind(this);
   }
   componentDidMount() {
      if (this.props.history.location.search.split('?statuscode=')[1]) {
         const statuscode = this.props.history.location.search.split('?statuscode=')[1];
         this.setState({ statuscode: statuscode });                 
      }else{
         this.setState({ statuscode: 1 });
      }
      this.ConfirmedList();
      this.SuspectedList();
      this.StayatHomeList();
      this.RecoveredList();
      this.OnSiteList();
      this.setState({carouselLoder:true});     
   }
   ConfirmedList=()=>{
      // var urlwithOrderBy = `/range?start=${0}&limit=${1000}&orderBy=${'asc'}&healthStatusId=1`;
      const urlwithoutOrderBy = `start=${0}&limit=${1000}&healthStatusId=1`;
      EmployeeHealthService.empHealthDirectoryList(urlwithoutOrderBy).then(response => {
         if (response.data) {
            this.setState({
               empConfirmedList: response.data,
               empConfirmedfilterList:response.data,
               covidConfirmedCount:response.totalResults
            });
            if(this.state.statuscode == '1'){
               this.setState({currentActiveCategoryEmpList:response.data});
            }              
         }
      });
   }   
   SuspectedList=()=>{
      // var urlwithOrderBy = `/range?start=${0}&limit=${1000}&orderBy=${'asc'}&healthStatusId=2`;
      const urlwithoutOrderBy = `start=${0}&limit=${1000}&healthStatusId=2`;
      EmployeeHealthService.empHealthDirectoryList(urlwithoutOrderBy).then(response => {
         if (response.data) {
            this.setState({
               empSuspectedList: response.data,
               empSuspectedConfirmedList:response.data,
               covidSuspectedCount:response.totalResults
            });              
         }
         if(this.state.statuscode == '2'){
            this.setState({currentActiveCategoryEmpList:response.data});
         }
      });      
   }
   StayatHomeList=()=>{
      // var urlwithOrderBy = `/range?start=${0}&limit=${1000}&orderBy=${'asc'}&healthStatusId=3`;
      const urlwithoutOrderBy = `start=${0}&limit=${1000}&healthStatusId=3`;
      EmployeeHealthService.empHealthDirectoryList(urlwithoutOrderBy).then(response => {
         if (response.data) {
            this.setState({
               empStayAtHomeList: response.data,
               empStayAtHomeConfirmedList:response.data,
               covidStayAtHomeCount:response.totalResults
            });              
         }
         if(this.state.statuscode == '3'){
            this.setState({currentActiveCategoryEmpList:response.data});
         }
      });      
   }
   RecoveredList=()=>{
      // var urlwithOrderBy = `/range?start=${0}&limit=${1000}&orderBy=${'asc'}&healthStatusId=4`;
      const urlwithoutOrderBy = `start=${0}&limit=${1000}&healthStatusId=4`;
      EmployeeHealthService.empHealthDirectoryList(urlwithoutOrderBy).then(response => {
         if (response.data) {
            this.setState({
               empRecoveredList: response.data,
               empRecoveredConfirmedList:response.data,
               covidRecoveredCount:response.totalResults
            });              
         }
         if(this.state.statuscode == '4'){
            this.setState({currentActiveCategoryEmpList:response.data});
         }
      });      
   }
   OnSiteList=()=>{
      // var urlwithOrderBy = `/range?start=${0}&limit=${1000}&orderBy=${'asc'}&healthStatusId=5`;
      const urlwithoutOrderBy = `start=${0}&limit=${1000}&healthStatusId=5`;
      EmployeeHealthService.empHealthDirectoryList(urlwithoutOrderBy).then(response => {
         if (response.data) {
            this.setState({
               empOnSiteList: response.data,
               empOnSiteConfirmedList:response.data,
               covidOnSiteCount:response.totalResults
            });              
         }
         if(this.state.statuscode == '5'){
            this.setState({currentActiveCategoryEmpList:response.data});
         }
      });      
   }
   setModalShow = (e) => {
      this.setState({ modalShow: true });
   }
   onHide = (e) => {
      this.setState({ modalShow: false });
   }
   changeHealthStatus = (e) => {
      this.setState({statuscode:e.target.value});
      if(e.target.value == '1'){
         this.ConfirmedList();
      }
      if(e.target.value == '2'){
         this.SuspectedList();
      }
      if(e.target.value == '3'){
         this.StayatHomeList();
      }
      if(e.target.value == '4'){
         this.RecoveredList();
      }
      if(e.target.value == '5'){
         this.OnSiteList();
      }             
   }
   selectCategory=(Object,name)=>{
      this.setState({currentActiveCategoryEmpList:[]});
      if(Object == 'Confirmed'){
         this.setState({currentActiveCategoryEmpList:this.state.empConfirmedList});
         this.setState({statuscode:1});  
      }
      if(Object == 'Suspected'){
         this.setState({currentActiveCategoryEmpList:this.state.empSuspectedConfirmedList});
         this.setState({statuscode:2});    
      }
      if(Object == 'StayAtHome'){
         this.setState({currentActiveCategoryEmpList:this.state.empStayAtHomeConfirmedList});  
         this.setState({statuscode:3});  
      }
      if(Object == 'Recovered'){
         this.setState({currentActiveCategoryEmpList:this.state.empRecoveredConfirmedList});
         this.setState({statuscode:4});    
      }
      if(Object == 'OnSite'){
         this.setState({currentActiveCategoryEmpList:this.state.empOnSiteConfirmedList});
         this.setState({statuscode:5});  
      }
      if(Object == 'OnLeave'){
         this.setState({currentActiveCategoryEmpList:this.state.empOnLeaveConfirmedList});
         this.setState({statuscode:6});  
      }          
   }
   onClickRow=(e)=> {     
      this.setState({selectedRowEmpData:e,modalShow:true});
   }
   onClickRowClone=(obj,event)=> {     
      this.setState({selectedRowEmpData:obj,modalShow:true});
   }
   onRowClick = (state, rowInfo) => {
      return {
          onClick: e => {
              console.log('A Tr Element was clicked!');
              console.log(rowInfo.original);
              this.setState({
                  data: rowInfo.original,
                  showModal: true
              });
          }
      }
  }
   render() {
      const responsive = {
         desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
            slidesToSlide: 1
         },
         tablet: {
            breakpoint: { max: 1200, min: 464 },
            items: 2,
            partialVisibilityGutter: 80,
            slidesToSlide: 2
         },
         mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
         }
      };
      const newPaginationOptions = {
         pageStartIndex: 1,
         sizePerPage: 5,
         hideSizePerPage: true,
         hidePageListOnlyOnePage: true
      }; 
      const selectRowProp = {
         onSelect: this.onRowSelect         
       };     
      const columns = [
         {
            dataField: 'employeeName',
            text: 'Name',
            Cell: row => (
               <div>
                  <span title={row.value}>{row.value}</span>
               </div>
            ),
            sort: true
         },
         {
            dataField: 'department',
            text: 'Department',
            sort: true
         },
         {
            dataField: 'designation',
            text: 'Designation',
            sort: true
         },
         {
            dataField: 'currentDaySubmitStatus',
            text: 'Daily Self Survey'
         },
         {
            dataField: 'lastUpdatedStatus',
            text: 'Daily Status',
            sort: true
         }
      ];

 // filter records by search text
 const confirmedListfilter = (value) => {
   const lowercasedValue = value.toLowerCase().trim();
   if (lowercasedValue === "") {
      this.setState({ empConfirmedList: this.state.empConfirmedfilterList })
   }
   else {
      const filteredItems = this.state.empConfirmedfilterList.filter(item => {
         return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(lowercasedValue);
         });
      });
      this.setState({ empConfirmedList: filteredItems })
   }
}
const suspectedListfilter = (value) => {
   const lowercasedValue = value.toLowerCase().trim();
   if (lowercasedValue === "") {
      this.setState({ empSuspectedList: this.state.empSuspectedConfirmedList })
   }
   else {
      const filteredItems = this.state.empSuspectedConfirmedList.filter(item => {
         return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(lowercasedValue);
         });
      });
      this.setState({ empSuspectedList: filteredItems })
   }
}
const stayAtHomeListfilter = (value) => {
   const lowercasedValue = value.toLowerCase().trim();
   if (lowercasedValue === "") {
      this.setState({ empStayAtHomeList: this.state.empStayAtHomeConfirmedList })
   }
   else {
      const filteredItems = this.state.empStayAtHomeConfirmedList.filter(item => {
         return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(lowercasedValue);
         });
      });
      this.setState({ empStayAtHomeList: filteredItems })
   }
}
const recoveredListfilter = (value) => {
   const lowercasedValue = value.toLowerCase().trim();
   if (lowercasedValue === "") {
      this.setState({ empRecoveredList: this.state.empRecoveredConfirmedList })
   }
   else {
      const filteredItems = this.state.empRecoveredConfirmedList.filter(item => {
         return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(lowercasedValue);
         });
      });
      this.setState({ empRecoveredList: filteredItems })
   }
}
const onSiteListfilter = (value) => {
   const lowercasedValue = value.toLowerCase().trim();
   if (lowercasedValue === "") {
      this.setState({ empOnSiteList: this.state.empOnSiteConfirmedList })
   }
   else {
      const filteredItems = this.state.empOnSiteConfirmedList.filter(item => {
         return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(lowercasedValue);
         });
      });
      this.setState({ empOnSiteList: filteredItems })
   }
}
const onLeaveListfilter = (value) => {
   const lowercasedValue = value.toLowerCase().trim();
   if (lowercasedValue === "") {
      this.setState({ empOnLeaveList: this.state.empOnLeaveConfirmedList })
   }
   else {
      const filteredItems = this.state.empOnLeaveConfirmedList.filter(item => {
         return Object.keys(item).some(key => {
            return item[key].toString().toLowerCase().includes(lowercasedValue);
         });
      });
      this.setState({ empOnLeaveList: filteredItems })
   }
}

      return (
         <div className="dashboard-container employee-health">       
            <div className="dashboard-section employeeDirectory">
               {
                  this.state.modalShow ? (
                     <ModelCaseHistory onHide={this.onHide} empData={this.state.selectedRowEmpData} modalShow={this.state.modalShow} />
                  ) : null
               }
               <div className="welcome-text">
                  <div className="employee-header">
                     <h2>Employee Health</h2>
                     <div className="employee-option">
                        <Form.Group controlId="exampleForm.ControlSelect1" className="employee-option-form">
                           <Form.Control as="select" onChange={(e)=>this.changeHealthStatus(e)} 
                           value={this.state.statuscode} >
                              <option >Employee Directory</option>
                              <option value={1}>COVID Confirmed</option>
                              <option value={2}>Suspected</option>
                              <option value={3}>Stay at Home</option>
                              <option value={4}>Recovered</option>
                              <option value={5}>OnSite</option>                                                            
                           </Form.Control>
                        </Form.Group>
                     </div>
                  </div>
               </div>
               <Row className="userCard mx-0">
                  <Col xl="12 h-100 pb-0">
                  {
                     this.state.carouselLoder == false ? (
                        <div className="loader">
                           <Spinner animation="grow" variant="dark" />
                        </div>
                     ):(
                        <Carousel partialVisible={true} responsive={responsive}>
                        {this.state.currentActiveCategoryEmpList.map((emp,index)=>
                        <div className="item" key={index}>
                           <Card onClick={this.onClickRowClone.bind(this,emp)}>
                              <Card.Body>
                                 <Row className="scrollHeader ">
                                    <Col xl="12" className="userDetails text-center">
                                       <h5 className="name">{emp.employeeName}</h5>
                                       <h5 className="dept">{emp.department}</h5>
                                       <h6 className="desination">{emp.designation}</h6>
                                    </Col>
                                 </Row>
                                 <div className="scrollBody">
                                    <div className="suspected-btn">
                                       <Button variant="primary">{emp.lastUpdatedStatus.toUpperCase()}</Button>
                                    </div>
                                    <div className="emp-tableContainer">
                                       <Table striped bordered hover className="emp-table">
                                          <tbody>
                                             <tr>
                                                <td>Health Condition</td>
                                                <td>
                                                   <div className="result">{emp.lastUpdatedCondition}</div>
                                                </td>
                                             </tr>
                                             {
                                                // <tr>
                                                //    <td>Contact Trace</td>
                                                //    <td>
                                                //       <div className="text-right">6 People Traced</div>
                                                //    </td>
                                                // </tr>
                                             }                                             
                                          </tbody>
                                       </Table>
                                    </div>
                                 </div>
                              </Card.Body>
                           </Card>
                        </div>)}                        
                     </Carousel>
                     )
                  }                                    
                  </Col>
               </Row>
               <Row className="row-height userCardBottom">
                  <Col xl="12 h-100 bottomCardScroll pl-0">
                     <Accordion allowZeroExpanded className="Suspected">
                        <AccordionItem id="Confirmed" onClick={this.selectCategory.bind(this,'Confirmed')}>
                           <AccordionItemHeading className="SuspectedAccordion">
                              <AccordionItemButton>
                                 <div className="accordionHeader">
                                    <h5>COVID Confirmed  - <span className="chartValue">{this.state.covidConfirmedCount}</span></h5>
                                 </div>
                                 <div className="accordionProgress">
                                    <div className="filterSearch ml-auto">
                                       <Row className="align-items-center">
                                          <Col xl="10" className="mb-0">
                                             <form className="serach-form">
                                                <input className="form-control" type="text" 
                                                onChange={(e) => confirmedListfilter(e.target.value) }
                                                placeholder="Search" aria-label="Search" />
                                                <span className="search-icon"></span>
                                             </form>
                                          </Col>
                                          <Col xl="2" className="mb-0">
                                             <span className="expandIcon ">
                                                <img src={expandIcon} alt="icon" />
                                             </span>
                                          </Col>
                                       </Row>
                                    </div>
                                 </div>                                 
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              <div className="accordionTable">
                                 <BootstrapTable className="acc-table" bordered={false}
                                    keyField="healthTrackerHeaderId"
                                    data={this.state.empConfirmedList}
                                    columns={columns}
                                    pagination={paginationFactory(newPaginationOptions)}
                                    rowEvents={{ onClick: (e, row) => this.onClickRow(row) }}                                                               
                                 />                                 
                              </div>
                           </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem id="Suspected" onClick={this.selectCategory.bind(this,'Suspected')}>
                           <AccordionItemHeading className="SuspectedAccordion">
                              <AccordionItemButton>
                                 <div className="accordionHeader">
                                    <h5>Suspected - <span className="chartValue">{this.state.covidSuspectedCount}</span></h5>
                                 </div>
                                 <div className="accordionProgress">
                                    <div className="filterSearch ml-auto">
                                       <Row className="align-items-center">
                                          <Col xl="10" className="mb-0">
                                             <form className="serach-form">
                                                <input className="form-control" type="text" 
                                                placeholder="Search" aria-label="Search"
                                                onChange={(e) => suspectedListfilter(e.target.value) } />
                                                <span className="search-icon"></span>
                                             </form>
                                          </Col>
                                          <Col xl="2" className="mb-0">
                                             <span className="expandIcon ">
                                                <img src={expandIcon} alt="icon" />
                                             </span>
                                          </Col>
                                       </Row>
                                    </div>
                                 </div>
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              <div className="accordionTable">
                                 <BootstrapTable className="acc-table" bordered={false}
                                    keyField="healthTrackerHeaderId"
                                    data={this.state.empSuspectedList}
                                    columns={columns}
                                    pagination={paginationFactory(newPaginationOptions)}
                                    rowEvents={{ onClick: (e, row) => this.onClickRow(row) }} 
                                 />                                 
                              </div>
                           </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem id="StayAtHome" onClick={this.selectCategory.bind(this,'StayAtHome')}>
                           <AccordionItemHeading className="SuspectedAccordion">
                              <AccordionItemButton>
                                 <div className="accordionHeader">
                                    <h5>Stay at Home - <span className='chartValue'>{this.state.covidStayAtHomeCount}</span></h5>
                                 </div>
                                 <div className="accordionProgress">
                                    <div className="filterSearch ml-auto">
                                       <Row className="align-items-center">
                                          <Col xl="10" className="mb-0">
                                             <form className="serach-form">
                                                <input className="form-control" type="text"
                                                placeholder="Search" aria-label="Search"
                                                onChange={(e) => stayAtHomeListfilter(e.target.value) } />
                                                <span className="search-icon"></span>
                                             </form>
                                          </Col>
                                          <Col xl="2" className="mb-0">
                                             <span className="expandIcon ">
                                                <img src={expandIcon} alt="icon" />
                                             </span>
                                          </Col>
                                       </Row>
                                    </div>
                                 </div>
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              <div className="accordionTable">
                                 <BootstrapTable className="acc-table" bordered={false}
                                    keyField="healthTrackerHeaderId"
                                    data={this.state.empStayAtHomeList}
                                    columns={columns}
                                    pagination={paginationFactory(newPaginationOptions)}
                                    rowEvents={{ onClick: (e, row) => this.onClickRow(row) }} 
                                 />                                 
                              </div>
                           </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem id="Recovered" onClick={this.selectCategory.bind(this,'Recovered')}>
                           <AccordionItemHeading className="SuspectedAccordion">
                              <AccordionItemButton>
                                 <div className="accordionHeader">
                                    <h5>Recovered - <span className="chartValue">{this.state.covidRecoveredCount}</span></h5>
                                 </div>
                                 <div className="accordionProgress">
                                    <div className="filterSearch ml-auto">
                                       <Row className="align-items-center">
                                          <Col xl="10" className="mb-0">
                                             <form className="serach-form">
                                                <input className="form-control" type="text" 
                                                placeholder="Search" aria-label="Search"
                                                onChange={(e) => recoveredListfilter(e.target.value) }/>
                                                <span className="search-icon"></span>
                                             </form>
                                          </Col>
                                          <Col xl="2" className="mb-0">
                                             <span className="expandIcon ">
                                                <img src={expandIcon} alt="icon" />
                                             </span>
                                          </Col>
                                       </Row>
                                    </div>
                                 </div>
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              <div className="accordionTable">
                                 <BootstrapTable className="acc-table" bordered={false}
                                    keyField="healthTrackerHeaderId"
                                    data={this.state.empRecoveredList}
                                    columns={columns}
                                    pagination={paginationFactory(newPaginationOptions)}
                                    rowEvents={{ onClick: (e, row) => this.onClickRow(row) }} 
                                 />                                 
                              </div>
                           </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem id="OnSite" onClick={this.selectCategory.bind(this,'OnSite')}>
                           <AccordionItemHeading className="SuspectedAccordion">
                              <AccordionItemButton>
                                 <div className="accordionHeader">
                                    <h5>On Site - <span className="chartValue">{this.state.covidOnSiteCount}</span></h5>
                                 </div>
                                 <div className="accordionProgress">
                                    <div className="filterSearch ml-auto">
                                       <Row className="align-items-center">
                                          <Col xl="10" className="mb-0">
                                             <form className="serach-form">
                                                <input className="form-control" type="text" 
                                                placeholder="Search" aria-label="Search"
                                                onChange={(e) => onSiteListfilter(e.target.value) } />
                                                <span className="search-icon"></span>
                                             </form>
                                          </Col>
                                          <Col xl="2" className="mb-0">
                                             <span className="expandIcon ">
                                                <img src={expandIcon} alt="icon" />
                                             </span>
                                          </Col>
                                       </Row>
                                    </div>
                                 </div>
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              <div className="accordionTable">
                                 <BootstrapTable className="acc-table" bordered={false}
                                    keyField="healthTrackerHeaderId"
                                    data={this.state.empOnSiteList}
                                    columns={columns}
                                    pagination={paginationFactory(newPaginationOptions)}
                                    rowEvents={{ onClick: (e, row) => this.onClickRow(row) }} 
                                 />                                 
                              </div>
                           </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem id="OnLeave" onClick={this.selectCategory.bind(this,'OnLeave')}>
                           <AccordionItemHeading className="SuspectedAccordion">
                              <AccordionItemButton>
                                 <div className="accordionHeader">
                                    <h5>On Leave - <span className="chartValue">{this.state.covidOnLeaveCount}</span></h5>
                                 </div>
                                 <div className="accordionProgress">
                                    <div className="filterSearch ml-auto">
                                       <Row className="align-items-center">
                                          <Col xl="10" className="mb-0">
                                             <form className="serach-form">
                                                <input className="form-control" type="text" 
                                                placeholder="Search" aria-label="Search"
                                                onChange={(e) => onLeaveListfilter(e.target.value) } />
                                                <span className="search-icon"></span>
                                             </form>
                                          </Col>
                                          <Col xl="2" className="mb-0">
                                             <span className="expandIcon ">
                                                <img src={expandIcon} alt="icon" />
                                             </span>
                                          </Col>
                                       </Row>
                                    </div>
                                 </div>
                              </AccordionItemButton>
                           </AccordionItemHeading>
                           <AccordionItemPanel>
                              <div className="accordionTable">
                                 <BootstrapTable className="acc-table" bordered={false}
                                    keyField="healthTrackerHeaderId"
                                    data={this.state.empOnLeaveList}
                                    columns={columns}
                                    pagination={paginationFactory(newPaginationOptions)}
                                    rowEvents={{ onClick: (e, row) => this.onClickRow(row) }} 
                                 />                                 
                              </div>
                           </AccordionItemPanel>
                        </AccordionItem>
                     </Accordion>
                  </Col>
               </Row>
            </div>
         </div>
      );
   }
}
export default EmployeeHealth;