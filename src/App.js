import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import Dropzone from 'react-dropzone';
import { CSVLink, CSVDownload } from "react-csv";
var csvData=[];
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
 
 <div className="row" >
     <div className="col-md-12">
<form>
<Dropzone onDrop={acceptedFiles => this.uploadfile(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>
<br  />
<input type="file" onChange={(event)=>{this.fileHandler(event)}} style={{"padding":"10px"}} />
</form>
<CSVLink data={csvData}>Download me</CSVLink>;
    </div>
    </div>
    </div>
    );
  }
}
export default App;
