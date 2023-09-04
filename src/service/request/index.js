/*
 * @Author: xiaoshuhao1999
 * @Date: 2023-09-04 15:20:13
 * @LastEditors: xiaoshuhao1999 247695042@qq.com
 * @LastEditTime: 2023-09-04 16:40:53
 * @FilePath: /tarot/src/service/request/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by 247695042@qq.com, All Rights Reserved. 
 */

import axios from "axios";
import {BASE_URL,TIMEOUT} from './config'

class XRequest {
  constructor(baseURL,timeout){
    this.instance = axios.create({
      baseURL,
      timeout
    })
    // console.log(baseURL);
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