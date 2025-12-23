const z = require("zod");

const taskSchema = z.object({
  task: z.string({ required_error: "Task is required" }),
 
});
module.exports={taskSchema}
