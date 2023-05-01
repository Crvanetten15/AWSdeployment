Check out Current Deployment at : 
[AWS AMPLIFY LINK](https://main.d1whdzdpw64965.amplifyapp.com/)

Run needed commands for our project

```bash
npm install d3 --save
npm install framer-motion --save
npm install axios --save
npm install chart.js react-chartjs-2 --save
```


Setup for AWS Lambda Query API
*keep in mind all data must be present for your post request to not crash*
```javascript
const data = {
  query_data: {
    table:null,
    disease:null,
    week:null,
    year:null,
    state:null
  },
  function: {
    number:1
  }
};
```