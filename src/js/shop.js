
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
      getCount()
      async function getCount(){
          const {count}=await $.get('./../server/count.php',{cat_one:list_info.cat_one},null,'json')
          // console.log(count)
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
          // console.log(list[0]);
          let str=''
          list.forEach(item=>{
            str += `

            <dl>
              <dt>
                  <img src="${item.goods_big_logo}" alt="" data-id="${item.goods_id}">
              </dt>
              <dd>
                  <h2>${item.goods_name}</h2>
                  <strong>${item.goods_price}</strong>
                  <span>
                  库存${item.goods_number}
                  </span>
              </dd>
            </dl>
            
        `
          })
          $('.main').html(str)
  
      }

      
    })
    $('.main').on('click','img',function(){
      window.sessionStorage.setItem('goods_id',this.dataset.id)
      console.log(this)
      window.location.href='./details.html'




      
    })