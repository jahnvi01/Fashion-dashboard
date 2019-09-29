import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Navbar from './components/navbar';
import 'antd/dist/antd.css';
import { Steps } from 'antd';
import { CSVLink, CSVDownload } from "react-csv";
var csvData=[];
const { Step } = Steps;
class App extends Component {
  uploadfile(files){
    console.log(files[0].path);
  }
  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {

      console.log(fileObj);
      if(err){
        console.log(err);            
      }
      else{
        console.log(resp.rows);
        csvData=resp.rows;
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });               

  }
  render() {
    return (
    <div className="App">
 <Navbar  />
 <div className="row" >
     <div className="col-md-12">
       <div className="card">
<form>
<h4>Select file to convert into csv</h4>
<Steps current={3}>
    <Step  title="Choose file." />
    <Step  title="Select type." />
    <Step  title="download file" />
  </Steps>
<input type="file" onChange={(event)=>{this.fileHandler(event)}} style={{"padding":"10px"}} />
</form>
<CSVLink data={csvData}>Download me</CSVLink>
</div>

    </div>
    </div>
    </div>
    );
  }
}
export default App;
