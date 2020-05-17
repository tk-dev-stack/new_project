import React, { Component } from 'react';
import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class CleaninessAndSanitization extends Component {
    constructor(props) {
      super(props);
      this.state = {
        plantStatusList: []
    }
    localStorage.clear();
    }

    componentDidMount() {
        this.getPlantStatusCount();
    }


    getPlantStatusCount = () => {

        GenericApiService.getAll(UrlConstants.getDashbordPlantCountUrl)
            .then(response => {


                const plantArr = response.data.filter((elem, index) => {
                    elem.plant = (index + 1).toString();
                    elem.plantName = index == 0 ? 'I' : index == 1 ? 'II' : index == 2 ? 'III' : 'IV';
                    return elem;
                })

                // console.log(plantArr);

                this.setState({
                    plantStatusList: plantArr
                })

            }).catch(error => {

            })

    }

    gotPlantPage(plant,index) {
        // localStorage.setItem('plant',plant.clientPlantMasterId);
        // localStorage.setItem('activePlant',index);
        return this.props.history.push('/home/cleansanitization');
    }

    render(){
        const responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
              slidesToSlide: 1 // optional, default to 1.
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1 // optional, default to 1.
            }
          };
        return(
            <>
            <Carousel responsive={responsive}>
            {this.state.plantStatusList.map((plant, index) =>
                    <div key={index} className={`plants plant-` + plant.plant} onClick={()=>this.gotPlantPage(plant,index)}>
                        <div className="plant-circle">
                            <div className="plant-number">
                                Plant <br /> {plant.plantName}
                            </div>
                        </div>
                        <div className="plant-data">
                            <ul className="list-unstyled plant-data-list">
                                <li>
                                    <span className="label">Overdue</span>
                                    <span className="value text-danger">{plant.overdueCount}</span>
                                </li>
                                <li>
                                    <span className="label">In-Progress</span>
                                    <span className="value text-warning">{plant.ipCount}</span>
                                </li>
                                <li>
                                    <span className="label">Done</span>
                                    <span className="value text-success">{plant.doneCount}</span>
                                </li>
                            </ul>
                        </div>
                    </div>)}
</Carousel>
            </>            
        )
    }
}
export default withRouter(CleaninessAndSanitization);