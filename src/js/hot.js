$(function(){
    const nickname = getCookie('nickname')
  if (nickname) {
    $('.on').addClass('active')
    $('.off').text(`${ nickname }`).removeClass('active')

  } else {
    $('.on').removeClass('active')
    $('.off').addClass('active')
  }

  const btns=document.querySelectorAll('.subnav>a')
const tabs=document.querySelectorAll('.box>li')
for(let i=0;i<btns.length;i++){
    btns[i].onclick=function(){
        for(let j=0;j<btns.length;j++){
            btns[j].classList.remove('active')
            tabs[j].classList.remove('active')
        }
        btns[i].classList.add('active')
        tabs[i].classList.add('active')
    } 
 } 
 
// 渲染

m()
function m(){
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
    // console.log(list)
    let str=``
    const ul =document.querySelector('.box >.two')
    for(let i=0;i< list.resultData.length;i++){
      console.log(list.resultData[i]);
     str +=`
  
          <div class="video_container">
              <img src="${list.resultData[i].verticalPic}" alt="">
              <p><a href="">${list.resultData[i].name}</a></p>
          </div>
   `
    }
   ul.innerHTML=str
   }


})

 








