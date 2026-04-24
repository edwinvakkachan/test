const tasks=[]


export const getUser = (req,res)=>{
    res.render("index",{tasks});
}

export const addtask =(req,res)=>{
  const task = req.body.task;
  tasks.push({id:Date.now,task:task})
  console.log(tasks)
  res.redirect('/')
}