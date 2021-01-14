$(function(){

    $('.eig').click(async(e)=>{
        if(e.preventDefault()){
            e.preventDefault()
           }else{e.returnValue = false}
        const username = $('.mobile').val()
        const password = $('.psw').val()
        const password2 = $('.psw2').val()
        const nickname = $('.name').val()
        console.log(username)
        console.log(password)
        console.log(password2)
        console.log(nickname)
        if(!username || !password||!password2 ||!nickname) return alert('请完整填写')
        if(!/^1[3-9]\d{9}$/.test(username) || !/^\w{6,12}$/i.test(password)||!/^\w{6,12}$/i.test(password2)||!/^\w{6,12}$/i.test(nickname)) {
            $('.mobile').val(' ')
            $('.psw').val(' ')
            $('.psw').val(' ')
            $('.name').val(' ')
            return alert('信息填写不正确')
        }
        if(!(password===password2)) {
            $('.mobile').val(' ')
            $('.psw').val(' ')
            $('.psw').val(' ')
            $('.name').val(' ')
            return alert('两次密码不一致，请重新输入')
        }
        const {code} =  await $.post('./../server/register.php',{username , password, nickname},null,'json')
        console.log({code})
        if(!code){
            alert('注册失败')
            return
        }else{
            alert('注册成功 ,去登录！')
        }
        window.location.href = './login.html'

    })
})
