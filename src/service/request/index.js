import axios from "axios";
import {BASE_URL,TIMEOUT} from './config'

class XRequest {
  constructor(baseURL,timeout){
    this.instance = axios.create({
      baseURL,
      timeout
    })
    console.log(baseURL);
    this.instance.interceptors.response.use((res)=>{
      return res.data;
    },err =>{
      return err;
    })
  }

  request(config){
    return this.instance.request(config);
  }
  get(config){
    return this.request({...config,method:'get'})
  }
  post(config){
    return this.request({...config,method:'post'})
  }
} 

export default new XRequest(BASE_URL,TIMEOUT);