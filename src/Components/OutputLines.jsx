export default function OutputLines({task, taskId, deleteTheTask, toggleTaskStatus}){
  console.log(task.taskName)
  return (
    <div className="flex gap-[2rem] items-center">
      <div className="flex gap-[1rem] items-center">
        <input checked={task.checkBoxChecked} className="w-[2rem] h-[2rem] color-yellow-300" type='checkbox' id={taskId} taskid={taskId} onChange={
          (e)=>{toggleTaskStatus(e.target.getAttribute('taskid'))}
        }/> 
        <label className={task.textStyle}  htmlFor={taskId}>{task.taskName}</label>
      </div>
      
      <button  taskid={taskId} className="font-semibold  outline outline-2 outline-amber-50 bg-red-500 hover:bg-red-300 transition cursor-pointer pt-[.5rem] rounded-full pb-[.4rem] p-[.8rem]  hover:text-slate-900 text-slate-50 text-[1rem]" onClick={(e)=>{
        // now deleting the task 
        deleteTheTask(e.target.getAttribute('taskid'));
        }
      }>
        <i className="fa-solid fa-trash" taskid={taskId}></i>
      </button>

    </div>
  );
}