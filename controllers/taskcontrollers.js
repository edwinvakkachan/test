let tasks = [];

export const  getTasks =  (req,res)=>{
res.render("index",{tasks});
}

export const addTask = (req,res)=>{
const task = req.body.task;
tasks.push({ id: Date.now(), task })
res.redirect("/");
}

export const deleteTask = (req,res)=>{
const id = Number(req.params.id);
tasks= tasks.filter(a=>a.id != id)

res.redirect('/')
}