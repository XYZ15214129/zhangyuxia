$(function () {
  const nickname = getCookie('nickname')
  if (nickname) {
    $('.on').addClass('active')
    $('.off').text(`${ nickname }`).removeClass('active')

  } else {
    $('.on').removeClass('active')
    $('.off').addClass('active')
  }


  list()
  function list(){
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
      const main=document.querySelector('.main')
      for(let i=0;i< 10;i++){
        // console.log(list.resultData[0]);
       str +=`
       <div class="main_a">
          <div class="main_l" ><i><img src="./../images/no1.png" alt=""></i></div>
          <b><img src="${list.resultData[i].verticalPic}" alt=""></b>   
          <div class="main_r">
              <div class="main_a_l">
                  <a>${list.resultData[i].venue}</a>
                  <h3> 主演：${list.resultData[i].name}</h3>
                  <p>上映时间：${list.resultData[i].showtime}</p>
              </div>
              <div class="main_a_r">
                  <p class="realtime">${list.resultData[i].nameNoHtml}</p>
                  <p>${list.resultData[i].price_str}</p>
              </div>
          </div>
        </div>
  
     `
      }
        main.innerHTML=str
    }


})


  
