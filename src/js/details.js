
$(function(){
        const nickname = getCookie('nickname')
        if (nickname) {
          $('.on').addClass('active')
          $('.off').text(`${ nickname }`).removeClass('active')
      
        } else {
          $('.on').removeClass('active')
          $('.off').addClass('active')
        }
      
// 渲染
    const id=window.sessionStorage.getItem('goods_id')
    // console.log(id);
    getGoodsInfo()
    async function getGoodsInfo(){
        const res = await $.get('./../server/goodsinfo.php', { id }, null, 'json')
        // console.log(res)
        bindHtml(res.info)

    }
    function bindHtml(info){
        goods_info=info
        let str=`
        <div class="enlargeBox">
                <div class="show">
                    <img src="${ info.goods_big_logo }" alt="">
                    <div class="mask"></div>
                </div>
                <div class="list">
                    <p class="active">
                        <img src="${info.goods_small_logo}" data-show="${ info.goods_big_logo }" data-enlarge="${ info.goods_big_logo }" alt="">
                    </p>
                    
                </div>
                <div class="enlarge"  style="background-image: url(${ info.goods_big_logo });"></div>
        </div>
        <div class="goodsInfo">
            <h3 class="desc">${info.goods_name}</h3>
            <p class="price">
            ￥ <span class="text-danger">${info.goods_price}</span>
            
            </p>
            <p class="price1"><span>服务：</span><span>· 正版授权</span><span>《售后服务》</span></p>
            <p class="price2"><span>说明：</span>说明：该商品由第三方卖家提供</p>
            <div class="purchase-btn">立即抢购</div>
        </div>
        
        `
        $('.goodsDetail').html(str)
        new Enlarge('.enlargeBox')
    }

    
})




function Enlarge(select){
    this.ele=document.querySelector(select)
    this.show=this.ele.querySelector('.show')
    this.mask=this.ele.querySelector('.mask')
    this.enlarge=this.ele.querySelector('.enlarge')
    this.list=this.ele.querySelector('.list')
    this.showwidth=this.show.clientWidth
    this.showheight=this.show.clientHeight
    this.bgwidth=parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bgheight=parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    this.enlargewidth=parseInt(window.getComputedStyle(this.enlarge).width)
    this.enlargeheight=parseInt(window.getComputedStyle(this.enlarge).height)
    // console.log(this.showwidth,this.bgwidth,this.enlargewidth)
    this.init()
}
Enlarge.prototype.init=function(){
    this.overout()
    this.setScale()
    this.setMove()
    this.changeList()
}
// 移入移出事件
Enlarge.prototype.overout=function(){
    this.show.addEventListener('mouseover',()=>{
        this.mask.style.display='block'
        this.enlarge.style.display='block'
    })
    this.show.addEventListener('mouseout',()=>{
        this.mask.style.display='none'
        this.enlarge.style.display='none'
    })
}
// 调整比例事件
// mask盒子尺寸    enlarge盒子的尺寸
// ------------ = ----------------
// show盒子尺寸     背景图的尺寸
Enlarge.prototype.setScale=function(){
    this.maskwidth=this.showwidth*this.enlargewidth/this.bgwidth
    this.maskheight=this.showheight*this.enlargeheight/this.bgheight
    this.mask.style.width=this.maskwidth+'px'
    this.mask.style.height=this.maskheight+'px'
}
// 移动联动事件
Enlarge.prototype.setMove=function(){
    this.show.addEventListener('mousemove',e=>{
        e=e||window.event
        let moveX=e.offsetX-this.maskwidth/2
        let moveY=e.offsetY-this.maskheight/2
        if(moveX<=0)moveX=0
        if(moveY<=0)moveY=0
        if(moveX>=this.showwidth-this.maskwidth){moveX=this.showwidth-this.maskwidth}
        if(moveY>=this.showheight-this.maskheight){moveY=this.showheight-this.maskheight}
        this.mask.style.left=moveX+'px'
        this.mask.style.top=moveY+'px'
        // 盒子移动的距离        背景图移动的距离
        // -------------  =  ------------------
        //   盒子的尺寸           放大镜盒子的尺寸      
        const bgX=moveX*this.enlargewidth/this.maskwidth
        const bgY=moveY*this.enlargeheight/this.maskheight
        this.enlarge.style.backgroundPosition=`-${bgX}px -${bgY}px`
    })
}
// 点击列表切换
Enlarge.prototype.changeList=function(){
    this.list.addEventListener('click',(e)=>{
        e=e||window.event
        const target =e.target||e.srcElement
        if(target.nodeName==='IMG'){
           const showUrl=target.dataset.show
           const enlargeUrl=target.dataset.enlarge 
            this.show.firstElementChild.src=showUrl
            this.enlarge.style.backgroundImage=`url(${enlargeUrl})`
            for(let i=0;i<this.list.children.length;i++){
                this.list.children[i].classList.remove('active')
            }
           target.parentElement.classList.add('active')
        }
    })
}



