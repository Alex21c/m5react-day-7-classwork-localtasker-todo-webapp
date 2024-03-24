import { Component } from "react";
import SuccessAndErrorMsg from "./SuccessAndErrorMsg";
import OutputLines from "./OutputLines";

export default class LocalTasker extends Component {
  componentDidUpdate(prevProps, prevState) {
    // Check if the state has been updated
    if (prevState !== this.state) {
      
      // now i want to save this state into the local storage
      localStorage.setItem ('alex21cLocalTasker', JSON.stringify(this.state));
    }
  }
  toggleTaskStatus=(taskId)=>{
    // //console.log(this.state['mlcToDoTasks'][taskId].taskStatus)

    this.setState({
      mlcToDoTasks:{
        ...this.state.mlcToDoTasks,
        [taskId]:{    
          ...this.state.mlcToDoTasks[taskId],      
          taskStatus: this.state.mlcToDoTasks[taskId].taskStatus === 'pending' ? 'completed' : 'pending',
          textStyle: this.state.mlcToDoTasks[taskId].textStyle === 'line-through' ? '' : 'line-through',
          checkBoxChecked: this.state.mlcToDoTasks[taskId].checkBoxChecked === 'checked' ? '' : 'checked',
          
        }
      }
    });
  }
  deleteTheTask=(taskId)=>{
    let newState = {...this.state};    
    // //console.log(`okay wait, deleting task haivng id: ${taskId}`);
    delete newState.mlcToDoTasks[taskId];
    this.setState(newState);
  }
  addNewTask(){
    // //console.log(this.state.inputFieldData);
    if(this.state.inputFieldData.length === 0 ){
      // show error message and return
      this.setState({
        SuccessAndErrorMsg : {
          msgType: 'Error',
          msg : `Kindly provide yours task name inside the textbox above!`,
          style : 'text-red-300 text-[1.5rem]'        
        }        
      });
      return;
    }
    // otherwise remove the error if it is shown
      this.setState({
        SuccessAndErrorMsg : {
          style : 'displayNone'        
        }      
      });
    // now add the task name into the state
      let bkInputFieldData = this.state.inputFieldData;

      this.setState({
        inputFieldData: '',
        mlcToDoTasks:{
          ...this.state.mlcToDoTasks,          
          [this.generateUniqueId()]: {
            taskName: bkInputFieldData,
            taskStatus: 'pending',
            textStyle : '',
            checkBoxChecked: ''
          }
        }

      });




      


  }
  generateUniqueId (){
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000); // Adjust as needed
    return `${timestamp}-${random}`;
  }
  handleInputChange=(e)=>{
    this.setState({
      inputFieldData : e.target.value
    });
  }
  constructor(params){
    super(params);
    // //console.log(params, this.generateUniqueId());
    let initialState = localStorage.getItem ('alex21cLocalTasker');
    if(initialState){
      initialState = JSON.parse(initialState);
    }else{
      initialState = {
        inputFieldData : "",
        SuccessAndErrorMsg : {
          msgType: 'SuccessOrError',
          msg : `i'm the class S&E Msg.`,
          style : 'displayNone'        
        },
        mlcToDoTasks: {

        }       
      };
    }    
    // //console.log(initialState)
    this.state = {
      ...initialState


    };
    // this.state = {
    //   inputFieldData : "",
    //   SuccessAndErrorMsg : {
    //     msgType: 'SuccessOrError',
    //     msg : `i'm the class S&E Msg.`,
    //     style : 'displayNone'        
    //   },
    //   mlcToDoTasks:{

    //   }  
    // };

  }

  render(){
    return (
      

        
      


      <div className="wrapperLocalTaskerApp border-2 border-slate-200 p-[2rem] w-[50rem] mt-[2rem] m-auto rounded-md flex flex-col gap-[2rem] text-[1.2rem] text-slate-200">
        <header className="flex flex-col gap-[1rem]">
          <h1 className="smallCaps text-center font-semibold text-[3rem]  text-slate-50">LocalTasker (ToDo WebApp)</h1>
          <form className="flex flex-col gap-[1rem]  w-[100%]">
            <input 
              value={this.state.inputFieldData}
             onChange = {this.handleInputChange}
              required="" className="text-slate-900 transition focus:outline focus:outline-2 focus:outline-yellow-500 p-[.5rem]   rounded-md" type="text" placeholder="Yours ToDo Task Name" 
            />
            <SuccessAndErrorMsg state={this.state.SuccessAndErrorMsg}/>
            <button 
            onClick = {(e)=>{e.preventDefault(); this.addNewTask()}}
            className="font-semibold flex gap-[1rem] items-center justify-center outline outline-2 outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer p-[1rem] rounded-md hover:text-slate-50 text-slate-900 text-[1.5rem]" type="submit"><i className="fa-solid fa-database"></i><span>Add Task</span></button>
          </form>
        </header>

        {Object.entries(this.state.mlcToDoTasks).length >0 &&  Object.entries(this.state.mlcToDoTasks).map(([key,task])=>{
          //console.log(task, key);
          return <OutputLines task={task} key={key} taskId={key} deleteTheTask={this.deleteTheTask} toggleTaskStatus={this.toggleTaskStatus}/>

        }
        )}
        
      </div>
    );
  }
}