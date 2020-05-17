import React, { Component } from 'react';

class NewAndUpdateCard extends Component {
    constructor(props) {
      super(props);
    }
    render(){
        return(
            <ul className="news-list list-unstyled">
                <li className="news read">										
                    <h6 className="news-title">Updates on COVID-19</h6>
                    <p>With 1,229 fresh cases in the last 24 hours, India's novel coronavirus count has increased to 21,700, according to the latest Ministry of Health...
                    </p>
                    <span className="news-timing">26 Apr, 9:36 pm</span>
                </li>
                <li className="news unread">										
                    <h6 className="news-title">COVID - 19 Precautions</h6>
                    <p>With 431 new coroanvirus positive cases in Maharashtra, the total number of confirmed Covid-19 count in the state increased to 5,652 today, ...
                    </p>
                    <span className="news-timing">26 Apr, 9:36 pm</span>
                </li>
                <li className="news unread">										
                    <h6 className="news-title">Compulsory Training on How to wear ...</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sLorem Ipsum ...
                    </p>
                    <span className="news-timing">26 Apr, 9:36 pm</span>
                </li>									
            </ul>	
        )
    }
}

export default NewAndUpdateCard;