import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Tab, Nav, Modal } from 'react-bootstrap';
import searchIcon from '../../assets/images/search.svg';
import compImg from '../../assets/images/companys-logo.png';
import govetImg from '../../assets/images/govet.png';
import deleteImg from '../../assets/images/delete.svg';
import starImg from '../../assets/images/star.svg';
import printImg from '../../assets/images/print.svg';
import Button from 'react-bootstrap/Button'


import Rectangle1 from '../../assets/images/Rectangle1@2x.png';
import Rectangle2 from '../../assets/images/Rectangle2@2x.png';
import Rectangle3 from '../../assets/images/Rectangle3@2x.png';
import Rectangle4 from '../../assets/images/Rectangle4@2x.png';
import Rectangle5 from '../../assets/images/Rectangle5@2x.png';
import Rectangle6 from '../../assets/images/Rectangle6@2x.png';
import Rectangle7 from '../../assets/images/Rectangle7@2x.png';
import NewsForward from './NewsForward';
import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';


class NewsAndUpdates extends Component {
   constructor(props) {
      super(props);
      this.state = {
         newsList: [],
         forwardingNews: [],
         isForward: false,
         openSelectedMessage: '',
         includedColumns: ["description", "title", "createdOn", "updatedOn"],
         filterList: [],
         updateObject: '',
         previewNews: '',
         govNewsList: [
            {
               description:
                  `           Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
    
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including 
               versions of Lorem Ipsum.
    
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting,
                 remaining essentially unchanged.
    
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of
                 Lorem Ipsum.`,
               title: "Updates on COVID-19", date: '26 Apr, 9:00 am'
            },
            {
               description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
               title: "Updates on COVID-19 ", date: '27 Apr, 10:00 am'
            },
            {
               description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
               title: "Updates on COVID-19 ", date: '28 Apr, 11:00 am'
            },
            {
               description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
               title: "Updates on COVID-19 ", date: '29 Apr, 12:00 pm'
            }
         ],
         modalShow: false,



      }
   }
   componentDidMount() {
      this.getNewsList();
   }

   // to get notification list api 
   getNewsList = () => {
      GenericApiService.getAll(UrlConstants.getNewsListUrl).then(response => {
         if (response.data) {
            this.setState({
               newsList: response.data,
               filterList: response.data,
               forwardingNews: JSON.stringify(response.data[0]),
               updateObject: response.data[0],
               previewNews: response.data[0].description,
               openSelectedMessage: 'pvt_news0',
            })
            // console.log(response.data);


         }
      }).catch(error => {

      })
   }


   forwardEmail = () => {
      this.setState({
         isForward: true
      });
   }

   selectedNews = (news, ind) => {
      this.setState({
         forwardingNews: JSON.stringify(news),
         isForward: false,
         openSelectedMessage: ind,
         updateObject: news,
         previewNews: news.description

      })

   }


   goBack = () => {

      this.getNewsList();

      this.setState({
         isForward: false,
         openSelectedMessage: ''
      })
   }

   closeModal = (e) => {
      this.getNewsList();
      this.setState({
         modalShow: e
      })

   }

   handleChange = value => {
      this.filterData(value);
   };

   // filter records by search text
   filterData = (value) => {
      const lowercasedValue = value.toLowerCase().trim();
      if (lowercasedValue === "") {
         this.setState({ newsList: this.state.filterList })
      }
      else {
         const filteredData = this.state.filterList.filter(item => {

            return Object.keys(item).some(key => {
               return this.state.includedColumns.includes(key) ? item[key].toString().toLowerCase().includes(lowercasedValue) : false;

            });
         });


         this.setState({ newsList: filteredData })

      }
   }

   deleteNews = () => {
      var data = this.state.updateObject;
      console.log(data);
      var user = JSON.parse(sessionStorage.getItem('LoginUserObject'));
      var date = new Date();
      var obj = {

         title: this.state.updateObject.title,
         description: this.state.updateObject.description,
         smsNotification: this.state.updateObject.smsNotification,
         emailNotification: this.state.updateObject.emailNotification,
         mobileAppNotification: this.state.updateObject.mobileAppNotification,
         voiceNotification: this.state.updateObject.voiceNotification,
         notifyAll: this.state.updateObject.notifyAll,
         isActive: false,
         createdBy: this.state.updateObject.createdBy,
         createdOn: new Date(this.state.updateObject.createdOn).getTime(),
         updatedOn: date.getTime(),
         updatedBy: user.bcmUserId,
         bcmNotificationId: this.state.updateObject.bcmNotificationId

      }

      console.log(obj);
      var formData = new FormData();
      formData.append('bcmNotification', JSON.stringify(obj));
      // formData.append('fileAttachment', null);
      const payload = formData;

      GenericApiService.saveFormData(UrlConstants.saveNewsUrl, payload).then(response => {

         console.log(response);
         if (response.status.success === 'SUCCESS') {
            this.goBack();
         }
      }).catch(error => {
         console.log(error);

      })
   }

   convertTime(dateObj) {
      if (dateObj) {
         var timestamp = new Date(dateObj);
         var monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
         ];
         var date = new Date(timestamp.getTime() * 1000);

         var tempday = (date.getDate()).toString();

         const day = tempday.length !== 1 ? tempday : '0' + tempday;
         
         const obj = timestamp.toDateString().split(' ')[2] +' '+ timestamp.toDateString().split(' ')[1]
         //  timestamp.getDate() + ' ' + monthNames[date.getMonth()+1] + ' ' + this.formatAM_PM(date);
         return obj;
      }
   }

   formatAM_PM = (date) => {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
   }


   setModalShow = (e) => {
      this.setState({
         modalShow: e
      })
   }
   onHide = () => {
      this.setState({
         modalShow: false
      })
   }

   openCompanyNewsAndUpdate = (type) => {
      if (type == 'pvt') {
         this.setState({
            forwardingNews: JSON.stringify(this.state.newsList[0]),
            isForward: false,
            openSelectedMessage: 'pvt_news0',
            updateObject: this.state.newsList[0],
            previewNews: this.state.newsList[0].description

         })
      } else if (type == 'govt') {
         this.setState({
            forwardingNews: JSON.stringify(this.state.govNewsList[0]),
            isForward: false,
            openSelectedMessage: 'govt_news0',
            previewNews: this.state.govNewsList[0].description

         })
      }

   }

   render() {
      return (
         <div className="dashboard-container news-and-updates">
            <div className="dashboard-section">
               <div className="welcome-text">
                  <div className=" pageTitle">
                     <h2>News & Updates</h2>
                     <div className="news-option" onClick={() => this.setModalShow(true)}>
                     </div>
                  </div>
               </div>
               <Row className="row-1 row-full-height">

                  <Col xl="12">
                     <Card className="emp">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="pvt_news0">
                           <Nav variant="pills" className="tab-1 newsTitle">
                              <Nav.Item className="item-1">
                                 <Nav.Link eventKey="pvt_news0" onClick={() => this.openCompanyNewsAndUpdate('pvt')}>Company</Nav.Link>
                              </Nav.Item>
                              <Nav.Item className="item-2">
                                 <Nav.Link eventKey="govt_news0" onClick={() => this.openCompanyNewsAndUpdate('govt')}>Government</Nav.Link>
                              </Nav.Item>
                           </Nav>

                           <Tab.Content>

                              <Tab.Pane eventKey="pvt_news0">
                                 <Tab.Container id="left-tabs" defaultActiveKey="pvt_news0">
                                    <Row className="mx-0">
                                       <Col md={12} lg={4}  className="tab-item-list">
                                          <form className="tab-search">
                                             <input className="form-control" type="text" onChange={(e) => this.handleChange(e.target.value)} placeholder=" Search Your Input " aria-label="Search" />
                                             <span className="search-icon"><img src={searchIcon} /></span>
                                          </form>
                                          <Nav variant="pills" className="flex-column">

                                             {this.state.newsList.map((news, index) =>
                                                <Nav.Item key={'pvt_news' + index} className="tab-details" onClick={() => this.selectedNews(news, 'pvt_news' + index)}>
                                                   <Nav.Link eventKey={'pvt_news' + index} className="tab-details-a  ">

                                                      <Row className="row-1">
                                                         <Col sm="3" className="tab-images">
                                                            <img src={compImg} />
                                                         </Col>
                                                         <Col sm="9" className="tab-contents">
                                                            <p className="header-blue">{news.title}</p>
                                                            <p dangerouslySetInnerHTML={{ __html: news.description }}></p>
                                                            <span>{this.convertTime(news.createdOn)}</span>
                                                         </Col>
                                                      </Row>

                                                   </Nav.Link>
                                                </Nav.Item>
                                             )}


                                          </Nav>
                                       </Col>
                                       <Col md={12} lg={8} className="tabs__container">
                                          <Tab.Content className="pl-3">
                                             <Tab.Pane eventKey={this.state.openSelectedMessage}>
                                                <Card className="emp-health news-tab-right">
                                                   <Card.Title>
                                                      <div>{this.state.updateObject.title}</div>
                                                      <div className="action-icons">
                                                         <span>
                                                            <img src={starImg} />
                                                         </span>
                                                         <span>
                                                            <img src={printImg} />
                                                         </span>
                                                         <span onClick={this.deleteNews}>
                                                            <img src={deleteImg} />
                                                         </span>
                                                      </div>
                                                   </Card.Title>
                                                   <Card.Body>
                                                      <Row className="m-0 w-100 tab-details-main">
                                                         <Col className="img-column mt-4">
                                                            <img src={compImg} />
                                                         </Col>
                                                         <Col className="content-column mt-4">
                                                            <div className="mail-id">
                                                               <p className="blue">admin@company.com</p>
                                                               <span>{this.convertTime(this.state.updateObject.updatedOn)}</span>
                                                            </div>
                                                            {!this.state.isForward ?
                                                               <div itemID="tab-p">
                                                                  <p dangerouslySetInnerHTML={{ __html: this.state.previewNews }}></p>
                                                                  <div className="forward-btn">
                                                                     <Button variant="secondary" onClick={this.forwardEmail}>Forward</Button>
                                                                  </div>
                                                               </div>
                                                               : <div>
                                                                  <NewsForward goBack={this.goBack} feeds={this.state.forwardingNews} />
                                                               </div>
                                                            }
                                                         </Col>

                                                      </Row>
                                                   </Card.Body>
                                                </Card>
                                             </Tab.Pane>

                                          </Tab.Content>
                                       </Col>
                                    </Row>
                                 </Tab.Container>
                              </Tab.Pane>

                              <Tab.Pane eventKey="govt_news0">
                                 <Tab.Container id="left-tabs" defaultActiveKey="govt_news0">
                                    <Row className="mx-0">
                                       <Col md={12} lg={4} className="tab-item-list">
                                          <form className="tab-search">
                                             <input className="form-control" type="text" onChange={(e) => this.handleChange(e.target.value)} placeholder=" Search Your Input " aria-label="Search" />
                                             <span className="search-icon"><img src={searchIcon} /></span>
                                          </form>
                                          <Nav variant="pills" className="flex-column">

                                             {this.state.govNewsList.map((news, index) =>
                                                <Nav.Item key={'govt_news' + index} className="tab-details" onClick={() => this.selectedNews(news, 'govt_news' + index)}>
                                                   <Nav.Link eventKey={'govt_news' + index} className="tab-details-a error">
                                                      {/* success */}
                                                      <Row className="row-1">
                                                         <Col sm="3" className="tab-images">
                                                            <img src={govetImg} />
                                                         </Col>
                                                         <Col sm="9" className="tab-contents">
                                                            <p className="header-blue">{news.title}</p>
                                                            <p>{news.description}</p>
                                                            <span>26 Apr, 9:00 am</span>
                                                         </Col>
                                                      </Row>
                                                   </Nav.Link>
                                                </Nav.Item>)}

                                          </Nav>
                                       </Col>
                                       <Col md={12} lg={8} className="tabs__container">
                                          <Tab.Content className="pl-3">
                                             <Tab.Pane eventKey={this.state.openSelectedMessage}>
                                                <Card className="emp-health news-tab-right">
                                                   <Card.Title>
                                                      <div>COVID - 19 Precautions</div>
                                                      <div className="action-icons">
                                                         <span>
                                                            <img src={starImg} />
                                                         </span>
                                                         <span>
                                                            <img src={printImg} />
                                                         </span>
                                                         <span>
                                                            <img src={deleteImg} />
                                                         </span>
                                                      </div>
                                                   </Card.Title>
                                                   <Card.Body>
                                                      <Row className="m-0 w-100 tab-details-main">
                                                         <Col className="img-column mt-4">
                                                            <img src={govetImg} />
                                                         </Col>
                                                         <Col className="content-column mt-4">
                                                            <div className="mail-id">
                                                               <p className="blue">admin@company.com</p>
                                                               <span>26 APR, 5:13PM</span>
                                                            </div>
                                                            {!this.state.isForward ?
                                                               <div itemID="tab-p">
                                                                  <p>{this.state.previewNews}</p>
                                                                  <div className="forward-btn">
                                                                     {/* onClick={this.forwardEmail} */}
                                                                     <Button variant="secondary " className="mr-4">Publish</Button>
                                                                     <Button variant="secondary" >Forward</Button>
                                                                  </div>
                                                               </div>
                                                               : <div>
                                                                  <NewsForward goBack={this.goBack} feeds={this.state.forwardingNews} />
                                                               </div>
                                                            }
                                                         </Col>
                                                      </Row>
                                                   </Card.Body>
                                                </Card>
                                             </Tab.Pane>

                                          </Tab.Content>
                                       </Col>
                                    </Row>
                                 </Tab.Container>
                              </Tab.Pane>

                           </Tab.Content>

                        </Tab.Container>
                     </Card>


                  </Col>
               </Row>

               <Modal id="addNews"
                  show={this.state.modalShow}
                  onHide={() => { this.setModalShow(false) }}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
               >
                  <Modal.Header closeButton>
                     <Modal.Title id="contained-modal-title-vcenter">
                        Add News
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <div>
                        <NewsForward newRecord={true} goBack={() => this.closeModal(false)} />
                     </div>
                  </Modal.Body>
               </Modal>

            </div>
         </div>
      );
   }
}

export default NewsAndUpdates;