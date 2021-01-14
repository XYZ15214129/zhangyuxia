
  $(function(){
        const nickname = getCookie('nickname')
        if (nickname) {
        $('.on').addClass('active')
        $('.off').text(`${ nickname }`).removeClass('active')
    
        } else {
        $('.on').removeClass('active')
        $('.off').addClass('active')
        }

        const list_info={
            cat_one:'all',
            current:'1',
            pagesize:'12'
        }
            getCatone()
            async function getCatone(){
                const {list}=await $.get('./../server/catone.php',null,null,'json')
                console.log(list)
                let str=`<span class="active">全部</span>`
                list.forEach(item=>{
                    str+=`<span >${item.cat_one_id}</span>`
                })
                $('.cat_one .right').html(str)
            }
        
            $('.cat_one .right').on('click','span',function(){
               $(this).addClass('active').siblings().removeClass('active')
               const cat_one=$(this).text()
            //    console.log(cat_one);
                list_info.cat_one=cat_one
               
                getCount()
            })

    
      getCount()
      async function getCount(){
          const {count}=await $.get('./../server/count.php',{cat_one:list_info.cat_one},null,'json')
          console.log(count)
          $('.pagination').off('click')
          new Pagination(
              '.pagination',{
              total:count, 
              pagesize:12,
              sizeList:[12,16,20,26] ,
              change(current,pagesize){
                  list_info.current=current
                  list_info.pagesize=pagesize
                  getGoodsList()
              }}
          )
      }
      async function getGoodsList(){
          const {list}=await $.get('./../server/List.php',list_info,null,'json')
          console.log(list[0]);
          let str=''
          list.forEach(item=>{
            str += `
            <div class="main_list">
            <div class="main_l">
                <h3>${item.cat_id}</h3>
                <p>${item.goods_name}</p>
                <span>退</span><span>改签</span><span>折扣卡</span><span>4K厅</span>
            </div>
            <div class="main_c">
                <span>￥${item.goods_price}</span>
                <p> 库存${item.goods_number}</p>
            </div>
            <div class="main_r">
                <p class="buy" data-id="${item.goods_id}">去购买</p>
            </div>
        </div>
        `
          })
          $('.main').html(str)
  
      }
      
  
      $('.main').on('click','.buy', function(){
          window.sessionStorage.setItem('goods_id',this.dataset.id)
          console.log(this);
          window.location.href='./detail.html'
      })
  

    
    })