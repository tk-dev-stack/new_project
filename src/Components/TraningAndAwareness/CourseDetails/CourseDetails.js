import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Form, Table,Tab,Nav} from 'react-bootstrap';
import {Doughnut,Chart} from 'react-chartjs-2';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import socialDistancing from '../../../assets/images/social-distancing.png';
class CourseDetails extends Component {
constructor(props) {
super(props);
this.state = {
Data: []				
};
}
componentDidMount(){
this.initChart();  		
}
initChart=(e)=>{
var getDummyData = {"Yet To Start":5,"In Progress":13,"Completed":82};
var backgroundColor = ['#FB0033','#F47700', '#00D225'];
var hoverBackgroundColor = [];
var lablesName = [];
var lablesData = [];
for(var i=0;i<Object.keys(getDummyData).length;i++){
lablesName.push(Object.keys(getDummyData)[i]);
}
for(var i=0;i<Object.values(getDummyData).length;i++){
lablesData.push(Object.values(getDummyData)[i]);
}           
var ObjMapping = {
labels: lablesName,
datasets: [
{
data:lablesData,
backgroundColor: backgroundColor,
hoverBackgroundColor: hoverBackgroundColor
}
],
text: '82%'	
};
console.log(ObjMapping);
this.setState({chartManipulationObject:ObjMapping});
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
items: 1
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
<div className="dashboard-container course-details">
  <div className="dashboard-section">
  <div className="welcome-text">
						<div className="pageTitle training-header">
							<h2>Courses Details</h2>
						</div>
					</div>

{/* 
               <Carousel responsive={responsive}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>; */}
{/* 
<Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
    <Carousel responsive={responsive}>
  

        <Nav.Item>
          <Nav.Link eventKey="first">Tab 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
        </Carousel>;
    </Col>
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
          eeeeeeeeeeeeee
        </Tab.Pane>
        <Tab.Pane eventKey="second">
         ffffffffffffffffffff
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
   */}
   <Row className="h-100">
      <Col md={12} xl="6 pb-0">
      <Row className="row-1 h-50 mx-0">
         <Col xl="12 px-0">
         <Card className="emp-health">
            <Card.Title>
               <div>Course Statistics</div>
            </Card.Title>
            <Card.Body>
               <div className="doughnut-chart">
                  <Row className="align-items-center">
                     <Col  md={6} xl="6 pb-0 circleChart">
                     <Doughnut data={this.state.chartManipulationObject} width={250} height={250} options={{legend:{display:false}}}/>
                     <span className="complete-text">Completed</span>
                     </Col>
                     <Col  md={6} xl="6  showResultContainer pb-0">
                     <div className="showResult">
                        <h4 className="resutl error"><i className="cricle"></i> Yet To Start <span className="percentage">5%</span></h4>
                     </div>
                     <div className="showResult">
                        <h4 className="resutl warning border-0"><i className="cricle"></i> In Progress <span className="percentage">13%</span></h4>
                     </div>
                     <div className="showResult">
                        <h4 className="resutl success"><i className="cricle"></i> Completed <span className="percentage">82%</span></h4>
                     </div>
                     </Col>
                  </Row>
               </div>
            </Card.Body>
         </Card>
         </Col>							
      </Row>
      <Row className="row-2 h-50 mx-0">
         <Col xl="12 px-0">
         <Card className="emp-health">
            <Card.Title className="descriptionTitle">
               <div>Course Description</div>
               <Form className="mb-0 distancing">
                  <Form.Group controlId="exampleForm.ControlSelect1" className="mb-0 w-100">
                     <Form.Control as="select" className="courseDescription w-100">
                        <option>Social Distancing</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                     </Form.Control>
                  </Form.Group>
               </Form>
            </Card.Title>
			<Carousel responsive={responsive} className="react__carousel">
               <div>
            <Card.Body className="px-0 courseCarouselBody pt-0">
               <Row className="courseCarousel align-items-center">
                  <Col xl="6 carouselList px-0"  className="pb-0">
                  <Card className="item">
                     <Card.Img variant="top" src={socialDistancing} />
                     <Card.Body className="row p-0 social-body">
                        <Card.Title className="col-12 pl-0"><h4>Social Distancing</h4></Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up.
                        </Card.Text>
                     </Card.Body>
                  </Card>
                  </Col>
                  <Col xl="6" className="pb-0 course__des">
					  <p>Lorem ipsum dolor sit amet, vivamus at et commodo consequat, eget dolor, aliquam sodales dui neque egestas lacus amet, nunc ac porta gravida scelerisque nunc a. </p>
					  <p>Lorem ipsum dolor sit amet, vivamus at et commodo consequat, eget dolor, aliquam sodales dui neque egestas lacus amet, nunc ac porta gravida scelerisque nunc a. Leo ullamcorper pellentesque nulla odio vestibulum, </p>
					  
					  
					  
                  </Col>
               </Row>
           
		    </Card.Body>
         </div>
               <div>
            <Card.Body className="px-0 courseCarouselBody pt-0">
               <Row className="courseCarousel align-items-center">
                  <Col xl="6 carouselList px-0"  className="pb-0">
                  <Card className="item">
                     <Card.Img variant="top" src={socialDistancing} />
                     <Card.Body className="row p-0 social-body">
                        <Card.Title className="col-12 pl-0"><h4>Social Distancing</h4></Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up.
                        </Card.Text>
                     </Card.Body>
                  </Card>
                  </Col>
                  <Col xl="6" className="pb-0 course__des">
					  <p>Lorem ipsum dolor sit amet, vivamus at et commodo consequat, eget dolor, aliquam sodales dui neque egestas lacus amet, nunc ac porta gravida scelerisque nunc a. </p>
					  <p>Lorem ipsum dolor sit amet, vivamus at et commodo consequat, eget dolor, aliquam sodales dui neque egestas lacus amet, nunc ac porta gravida scelerisque nunc a. Leo ullamcorper pellentesque nulla odio vestibulum, </p> 
                  </Col>
               </Row>
           
		    </Card.Body>
         </div>
               
            </Carousel>
			
		 </Card>
         </Col>							
      </Row>
      </Col>
      <Col md={12} xl="6 h-100">
      <Card className="news-update">
         <Card.Title>
            <div>Employee Course Consumption</div>
         </Card.Title>
         <Card.Body>
		 <Table striped className="consumptionTable">
			<thead>
				<tr>
				<th>Name</th>
				<th>Status</th>
				<th>Total Time Spent</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>
				<tr>
				<td>Priya Sampath</td>
				<td> <div className="ProgressConatiner"><span className="ProgressBarResult">100%</span> <ProgressBar now={100} /></div></td>
				<td>01:03:34</td>
				</tr>

				
			</tbody>
</Table>
         </Card.Body>
      </Card>
      </Col>
   </Row>
   </div>
</div> 
);
}
}
export default CourseDetails;