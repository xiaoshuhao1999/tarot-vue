import XRequest from './index';

export const selectCard = (type,is_have='')=>{
  return XRequest.get({ url: `/selectCard?type=${type}&is_have=${is_have}` })
}

