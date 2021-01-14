$(function () {
  const nickname = getCookie('nickname')
  if (nickname) {
    $('.on').addClass('active')
    $('.off').text(`${ nickname }`).removeClass('active')

  } else {
    $('.on').removeClass('active')
    $('.off').addClass('active')
    $('.user-menu').on('click',function(){
      window.location.href='./login.html'
    })
  }

// 渲染

l()
function l(){
  ajax({
      url: '/dm',
      data: {
          token: ' ',
          optimus_uuid: '555B0810547811EBB3F947DCC55CDF226693C39AC35D43F4B177670CD1FEBA93',
          optimus_risk_level: 71,
          optimus_code: 10
      },
      success (res) {
      // console.log(res)
      bindHTML(res.pageData)
      }
  })
  }             


function bindHTML(list){
  let str=``
  const ul =document.querySelector('.movie_list >ul')
  for(let i=0;i< list.resultData.length;i++){
    // console.log(list.resultData[0]);
   str +=`
            <li>
                <div>
                    <img src="${list.resultData[i].verticalPic}" alt="">
                    <p>${list.resultData[i].name}<span>${list.resultData[i].price}</span></p>
                </div>
                <a href="">购票</a>
            </li>
 `
  }
 ul.innerHTML=str
 }
$('ul').on('click','li',function(){window.location.href='./hot.html'})
})

  // 搜索框
  const suggest = document.querySelector('.suggest_list')
  const inp = document.querySelector('.text')
  inp.addEventListener('input', function () {
    const text = this.value.trim()
    const script = document.createElement('script')
    script.src = `https://api-gw.damai.cn/suggest.html?keyword=${text}&destCity=%E5%8C%97%E4%BA%AC&_ksTS=1610545900870_173&callback=jsonp174`
    document.body.appendChild(script)
    script.remove()
  })
  inp.addEventListener('blur',function(){
    suggest.style.display = 'none'
    this.value=''
  })
  function jsonp174(res) {
    // console.log(res);
    let mm = ''
    for(let i=0;i<res.length;i++){
      mm+=`<span>${ res[i].name }</span>`
    }
    suggest.innerHTML = mm
    suggest.style.display = 'block'
  }
  
 