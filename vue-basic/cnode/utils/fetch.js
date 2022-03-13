var baseURL = 'https://cnodejs.org'
var version = '/api/v1'

function fetch(url,method='get',data={}){
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: baseURL+version+url,
      method,
      data,
      success(res){
        if(res.success) resolve(res.data)
      },
      fail(err){reject(err)}
    })
  })
}
