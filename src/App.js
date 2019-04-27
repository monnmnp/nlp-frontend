import React, { Component } from 'react';
import './App.css';
import { Button } from 'antd';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dialogID: '',
    }
  }

  handleHumanClick = (e) => {
    axios.get(`https://us-central1-nlp-web-e6fd1.cloudfunctions.net/api2/addResult?dialogID=` + this.state.dialogID + `&answer=Human`)
      .then(res => {
        console.log(this.state.dialogID)
      })
    this.getDialog();
  }

  handleBotClick = (e) => {
    axios.get(`https://us-central1-nlp-web-e6fd1.cloudfunctions.net/api2/addResult?dialogID=` + this.state.dialogID + `&answer=Bot`)
      .then(res => {
        console.log(this.state.dialogID)
      })
    this.getDialog();
  }

  componentDidMount() {
    this.getDialog();
  }

  getDialog() {
    axios.get(`https://us-central1-nlp-web-e6fd1.cloudfunctions.net/api2/getDialog`)
      .then(res => {
        const dialog = res.data.data.dialog;
        this.setState({
          text: dialog,
          dialogID: res.data.dialogID
        });
      })
  }

  render() {
    return (
      <div className="container">
        <div style={{ marginBottom: '20px' }}>คุณคิดว่าข้อความนี้เป็นข้อความจากใคร?</div>
        <div style={{ marginBottom: '30px', fontSize: '30px' }}>
          {this.state.text}
        </div>
        <Button style={{ marginRight: '20px' }} onClick={this.handleHumanClick}>คน</Button>
        <Button onClick={this.handleBotClick}>ShishBot</Button>
      </div>
    );
  }
}

export default App;
