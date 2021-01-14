
function move(ele, target, fn) {
    let count = 0
    for (let key in target) {
      if (key === 'opacity') target[key] *= 100
      count++
      const timer = setInterval(() => {
        let current
        if (key === 'opacity') current = window.getComputedStyle(ele)[key] * 100
        else current = parseInt(window.getComputedStyle(ele)[key])
        let distance = (target[key] - current) / 10
        distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
        if (current === target[key]) {
          clearInterval(timer)
          count--
          if (!count) fn()
        } else {
          if (key === 'opacity') ele.style[key] = (current + distance) / 100
          else ele.style[key] = current + distance + 'px'
        }
      }, 20)
    }
  }

  const imgbox=document.querySelector('.img')
  const banner=document.querySelector('.banner')
  const pointbox=document.querySelector('.point')
  const zjt=document.querySelector('.leftRight_left')
  const yjt=document.querySelector('.leftRight_right')
  const banner_width=banner.clientWidth
  let index=1
  let timer=0
  let flag=true
  // 设置焦点
  setpoint()
  function setpoint(){
      const pointnum = imgbox.children.length
      const frg=document.createDocumentFragment()
      for(let i=0;i<pointnum;i++){
          const li=document.createElement('li')
          if(i===0){li.classList.add('active')}
          li.dataset.page=i
          frg.appendChild(li)
      }
      pointbox.appendChild(frg)
      pointbox.style.width=pointnum*(20+10)+'px'
  }
  // 复制元素
  copyEle()
  function copyEle(){
      const first=imgbox.firstElementChild.cloneNode(true)
      const last=imgbox.lastElementChild.cloneNode(true)
      imgbox.appendChild(first)
      imgbox.insertBefore(last,imgbox.firstElementChild)
      imgbox.style.width=imgbox.children.length*100+'%'
      imgbox.style.left=-banner_width+'px'
  
  }
  // 自动轮播
  autoPlay()
  function autoPlay(){
      timer=setInterval(function(){
          index++
          move(imgbox,{left:-index*banner_width},moveEnd)
      },2000)
  }
  function moveEnd(){
      if(index===imgbox.children.length-1){
          index=1
          imgbox.style.left=-index*banner_width+'px'
      }
      if(index===0){
          index=imgbox.children.length-2
          imgbox.style.left=-index*banner_width+'px'
      }
      for(let i=0;i<pointbox.children.length;i++){
          pointbox.children[i].classList.remove('active')
      }
      pointbox.children[index-1].classList.add('active')
      flag=true
  }
  // 移入移出 
  overout()
  function overout(){
      banner.addEventListener('mouseover',function(){
          clearInterval(timer)
      })
      banner.addEventListener('mouseout',function(){
         autoPlay()
      })
  }
  // 左右按钮
  LF()
  function LF(){
      zjt.addEventListener('click',function(){
          if(!flag)return
          index--
          move(imgbox,{left:-index*banner_width},moveEnd)
          flag=false

      })
      yjt.addEventListener('click',function(){
          if(!flag)return
          index++
          move(imgbox,{left:-index*banner_width},moveEnd)
          flag=false

      })
  }
  // 焦点切换
  pointEvent()
  function pointEvent(){
      pointbox.addEventListener('click',function(e){
          e=e||window.event
          const target=e.target||e.srcElement
          if(target.nodeName==='LI'){
              if(!flag)return
              flag=false
              const page=target.dataset.page-0
              index=page+1
              move(imgbox,{left:-index*banner_width},moveEnd)
          }
      })
  }
  // 页面切换
  pagechange()
  function pagechange(){
      document.addEventListener('visibilitychange',function(){
          const state=document.visibilityState
          if(state==='hidden'){clearInterval(timer)}
          if(state==='visible'){autoPlay()}
      })
  }