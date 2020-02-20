// fetchHelper.url = 'http://157.122.54.189:9092'
fetchHelper.url = 'http://157.122.54.189:9092'

// 自定义请求参数请求
export default function fetchHelper(url,option){
    return fetch(fetchHelper.url + url,option);
}

// 封装get请求
fetchHelper.get = (url) => {
   return fetch(fetchHelper.url + url, {
    method: 'GET',
    credentials:"include"  //允许跨域带cookie到服务器
    })
    .then(response => {
        if(response.status == 200){
            return response.json();
        }else{
            throw new Error('get request error in fetchHelper：response.status not eq 200');
        }
    })
    //.then(res => res)
    .catch(error => {
        console.log('get request error in fetchHelper');
    });
}


// 封装post请求
fetchHelper.post = (url,body) => {
    return fetch(fetchHelper.url + url, {
     method: 'POST',
     headers: {  // 要求请求报文题以json格式传输
        'Content-Type': 'application/json;charset=UTF-8'  //application/x-www-form-urlencoded; charset=UTF-8        
    }, 
     credentials:"include",  //允许跨域带cookie到服务器
     body:JSON.stringify(body) //请求报文体数据，body:传入js对象即可
     })
     .then(response => {
         if(response.status == 200){
             return response.json();
         }else{
             throw new Error('get request error in fetchHelper：response.status not eq 200');
         }
     })
    //  .then(res => res)
     .catch(error => {
         console.log('get request error in fetchHelper');
     });
 }