const isLocal = true
const serverIp = '35.198.6.163'

export function getMakeUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/makes'
    }else{
        return 'http://'+serverIp+':3002/api/makes'
    }
}

export function getModelUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/models'
    }else{
        return 'http://'+serverIp+':3002/api/models'
    }
}

export function getYearUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/years'
    }else{
        return 'http://'+serverIp+':3002/api/years'
    }
}

export function getMileageUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/mileages'
    }else{
        return 'http://'+serverIp+':3002/api/mileages'
    }
}

export function getPriceUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/prices'
    }else{
        return 'http://'+serverIp+':3002/api/prices'
    }
}

export function getStateUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/states'
    }else{
        return 'http://'+serverIp+':3002/api/states'
    }
}

export function getRegionUrl(){
    if (isLocal){
        return 'http://localhost:3002/api/regions'
    }else{
        return 'http://'+serverIp+':3002/api/regions'
    }
}

export function getLoginServiceUrl(){
    if (isLocal){
        return 'http://localhost:3002/oapi'
    }else{
        return 'http://'+serverIp+':3002/oapi'
    }
}

