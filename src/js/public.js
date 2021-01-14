

// 设置 cookie 的操作
function setCookie(key, value, expires) {
    if (!expires) {
      document.cookie = key + '=' + value
      return
    }
  
    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
    document.cookie = `${ key }=${ value };expires=${ time }`
  }
  
  // 获取 cookie 的操作
  function getCookie(key) {
    const obj = {}
  
    document.cookie.split('; ').forEach(item => {
      const t = item.split('=')
      obj[t[0]] = t[1]
    })
  
    return key ? obj[key] : obj
  }
  

  function queryStringify(obj) {
    let str = ''
    for (let key in obj) {
      str += key + '=' + obj[key] + '&'
    }
    return str.slice(0, -1)
  }
  
  
  function ajax(options = {}) {
      if (!options.url) {
        throw new Error('url 为必填选项')
      }
    
      if (!(options.method === undefined || /^(get|post)$/i.test(options.method))) {
        throw new Error('目前只接受 GET 和 POST 请求, 请期待更新 ^_^')
      }
    
      if (!(options.async === undefined || typeof(options.async) === 'boolean')) {
        throw new Error('async 只能传递一个布尔值')
      }
    
      if (!(options.data === undefined || Object.prototype.toString.call(options.data) === '[object Object]' || /^(.+=.+&?)*[^&]$/.test(options.data))) {
        throw new Error('data 需要传递一个查询字符串 或者 对象数据类型2')
      }
    
      if (!(options.success === undefined || typeof options.success === 'function')) {
        throw new Error('success 需要传递一个 function 数据类型')
      }
    
      if (!(options.error === undefined || typeof options.error === 'function')) {
        throw new Error('error 需要传递一个 function 数据类型')
      }
    
      if (!(options.dataType === undefined || typeof(options.dataType) === 'boolean')) {
        throw new Error('dataType 只能传递一个布尔值')
      }
    
      const _default = {
        url: options.url,
        method: options.method || 'GET',
        async: typeof options.async === 'boolean' ? options.async : true,
        data: options.data || '',
        success: options.success || function () {},
        error: options.error || function () {},
        dataType: typeof options.dataType === 'boolean' ? options.dataType : true,
      }
      if (typeof _default.data === 'object') {
        _default.data = queryStringify(_default.data)
      }
      if (_default.method.toUpperCase() === 'GET' && _default.data) {
        _default.url += '?' + _default.data
      }
      const xhr = new XMLHttpRequest()
      xhr.open(_default.method, _default.url, _default.async)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
          _default.success(_default.dataType ? JSON.parse(xhr.responseText) : xhr.responseText)
        }
        if (xhr.readyState === 4 && xhr.status === 404) {
          _default.error(xhr.statusText)
        }
      }
      if (_default.method.toUpperCase() === 'GET') {
        xhr.send()
      } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(_default.data)
      }
    }


