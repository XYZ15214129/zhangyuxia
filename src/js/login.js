$(function(){
     $('.btn').click(async(e)=>{
      if(e.preventDefault()){
        e.preventDefault()
       }else{e.returnValue = false}
       const username=$('#login-email').val()
       const password=$('#login-password').val()
       if(!username||!password)return alert('请完整填写表单')
       if(!/^1[3-9]\d{9}$/.test(username)||!/^\w{6,12}$/i.test(password))return alert('表单不符合规则')
       const {code,nickname}=await $.post('./../server/login.php',{username,password},null,'json')
       // 解构赋值的用法
       console.log({code,nickname})
       if(!code)return alert('用户名密码错误')
       setCookie('nickname',nickname,60*60*24)
       window.location.href = `./index.html`
   
     })
     
     $('.zhuce').on('click',function(){
      window.location.href = `./register.html`

     })


   })