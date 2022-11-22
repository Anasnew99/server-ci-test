const { app, initDB } = require("./server");
initDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
