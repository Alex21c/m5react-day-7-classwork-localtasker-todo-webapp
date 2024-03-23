import { Component } from "react";
export default class SuccessAndErrorMsg extends Component{
  constructor(props){
    super(props);
    console.log(props);



  }

  render(){
    let { style, msgType, msg } = this.props.state;

    return (
      <h2 className={style}>
        <span className="font-semibold">{msgType}: </span>
        <span>{msg}</span>
      </h2>
    );
  }
}