import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import { Col, Row, Button } from 'react-bootstrap';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GenericApiService } from '../../Service/GenericApiService';
import { UrlConstants } from '../../Service/UrlConstants';
class NewsForward extends React.Component {

   constructor(props) {
      super(props)

      this.state = {
         newsObject: this.props.feeds ? JSON.parse(this.props.feeds) : '',
         message: this.props.feeds ? JSON.parse(this.props.feeds).description : '',
         emails: [],
         subjectName: this.props.feeds ? JSON.parse(this.props.feeds).title : '',
         isError: {
            subjectName: "",
            emails: "",
            message:''

         },

      }
      this.handleChange = this.handleChange.bind(this);

   }

   componentDidMount() {

      console.log(this.state.newsObject);

   }

   handleChange(value) {
      this.setState({ text: value });
      console.log(this.state.message);

   }


   subjectNameValidator = (Param) => {

      var returnMsg = '';
      if (Param.length == 0 || Param == '') {
         returnMsg = 'Subject name is required';
      } else {
         returnMsg = '';
      }
      return returnMsg;
   }

   emailsValidator = (Param) => {

      var returnMsg = '';
      if (Param.length == 0) {
         returnMsg = 'Please specify at least one recipient.';
      } else {
         returnMsg = '';
      }
      return returnMsg;
   }

   MessageValidator  = (Param) => {

      var returnMsg = '';
      if (Param.length == 0 || Param=='<p><br></p>') {
         returnMsg = 'Message is required.';
      } else {
         returnMsg = '';
      }
      return returnMsg;
   }

   formValChange = e => {
      // e.preventDefault();
      const { name, value } = e.target;
      let isError = { ...this.state.isError };
      switch (name) {
         case "subjectName":
            isError.subjectName = this.subjectNameValidator(value)
            break;
         case "emails":
            isError.emails = this.emailsValidator(value)
            break;
            case "message":
            isError.message = this.MessageValidator(value)
            break;
         default:
            break;
      }

      this.setState({
         isError,
         [name]: value
      });
   };

   onchangeSubject = (e) => {
      this.setState({ subjectName: e.target.value });
      console.log(this.state.subjectName);

   };

   saveNotification = (e) => {

      // e.preventDefault();
      if (this.subjectNameValidator(this.state.subjectName) == '' && 
         this.emailsValidator(this.state.emails) == '' && this.MessageValidator(this.state.message) == '') {
         var obj = this.getPayload();

         console.log(obj);
         var formData = new FormData();
         formData.append('bcmNotification', JSON.stringify(obj));
         // formData.append('fileAttachment', null);
         const payload = formData;

         GenericApiService.saveFormData(UrlConstants.saveNewsUrl, payload).then(response => {

            console.log(response);
            if (response.status.success === 'SUCCESS') {
               if (this.props.newRecord) {
                  this.props.goBack();
               }
               this.props.goBack();
            }
         }).catch(error => {
            console.log(error);

         })
      } else {
         let isError = { ...this.state.isError };
         console.log(isError);
         isError.subjectName = this.subjectNameValidator(this.state.subjectName);
         isError.emails = this.emailsValidator(this.state.emails);
         isError.message = this.MessageValidator(this.state.message);


         this.setState({ isError: isError });
      }
   }





   getPayload() {
      var user = JSON.parse(sessionStorage.getItem('LoginUserObject'));
      var updateOn = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
      var obj;
      if (this.props.newRecord) {
         obj = {
            title: this.state.subjectName,
            description: this.state.message,
            smsNotification: 0,
            emailNotification: 0,
            mobileAppNotification: 0,
            voiceNotification: 0,
            notifyAll: 0,
            isActive: true,
            createdBy: user.bcmUserId,
            createdOn: updateOn,
            updatedOn: updateOn,
            updatedBy: user.bcmUserId,
         };
      }
      else {
         obj = {
            title: this.state.subjectName,
            description: this.state.message,
            smsNotification: this.state.newsObject.smsNotification,
            emailNotification: this.state.newsObject.emailNotification,
            mobileAppNotification: this.state.newsObject.mobileAppNotification,
            voiceNotification: this.state.newsObject.voiceNotification,
            notifyAll: this.state.newsObject.notifyAll,
            isActive: true,
            createdBy: this.state.newsObject.createdBy,
            createdOn: new Date(this.state.newsObject.createdOn + ' UTC').toISOString().split('.')[0],
            updatedOn: updateOn,
            updatedBy: user.bcmUserId,
            bcmNotificationId: this.state.newsObject.bcmNotificationId
         };
      }
      return obj;
   }

   render() {
      const { emails, isError } = this.state
      return (
         <Form className="send-mail-form" noValidate>
            <Form.Row>
               <Form.Group as={Col} controlId="formGridEmail" className="email">
                  <Form.Label>To :</Form.Label>
                  <ReactMultiEmail
                     placeholder="To :"
                     emails={emails}
                     onChange={(e) => this.formValChange({ target: { name: "emails", value: e } })}
                     validateEmail={email => {
                        return isEmail(email); // return boolean
                     }}
                     getLabel={(
                        email,
                        index,
                        removeEmail
                     ) => {
                        return (
                           <div data-tag key={index}>
                              {email}
                              <span data-tag-handle onClick={() => removeEmail(index)}>
                                 ×
                                  </span>
                           </div>
                        );
                     }}
                  />
                  {isError.emails.length > 0 && (
                     <Form.Text className="error-msg">{isError.emails}</Form.Text>
                  )}
               </Form.Group>
            </Form.Row>
            <Form.Row>
               <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Control type="text" name="subjectName"
                     placeholder="Subject :" onChange={this.formValChange.bind(this)}
                     defaultValue={this.state.subjectName} className="mail-subject" />
                  {isError.subjectName.length > 0 && (
                     <Form.Text className="error-msg">{isError.subjectName}</Form.Text>
                  )}
               </Form.Group>
            </Form.Row>

            <Row className="mx-0 editor-row">
               <ReactQuill defaultValue={this.state.message} onChange={(e) => this.formValChange({ target: { name: "message", value: e } })} />
               <div className="forward-btn">
                  <Button variant="secondary" onClick={this.saveNotification}>{this.props.newRecord ? 'Publish' : 'Send'}</Button>
               </div>
               {isError.message.length > 0 && (
                  <Form.Text className="error-msg">{isError.message}</Form.Text>
               )}
            </Row>
         </Form>
      );
   }
}
export default NewsForward;
