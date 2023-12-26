import axios from "axios";
import chalk from "chalk";
const api_url = process.env.API_URL;
export default(url=`${api_url}`) => {
    let instance = axios.create({
        baseURL: url,
    })
    instance.interceptors.request.use(async(config)=>{
        console.log(`${config.method.toUpperCase()} ${chalk.green('Request')} ${chalk.blue.underline(api_url + config.url)}`);
        if(config.data){
          console.log(config.data);
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    });
    instance.interceptors.response.use(
        response => {
          console.log(`${chalk.cyan('Response')} ${chalk.blue.underline(api_url + response.config.url)}`);
          if(response.data)
            console.log(response.data);
          return response;
        },
        error => {
            console.log("Threre is response error", error);
            return Promise.reject(error);
        }
    );
    return instance
}
