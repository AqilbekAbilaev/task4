import axios from 'axios';

const serverURL = 'https://intern-task4.herokuapp.com/';

export default axios.create({
    baseURL: serverURL
});
