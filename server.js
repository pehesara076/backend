const expressServer = require('express')
const employeeApi = require('./employee-api')

const port = 3000;
const app = expressServer();

app.use(expressServer.urlencoded({extended: true}));
app.use(expressServer.json());

app.use('/employee-api',employeeApi)




app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
})
