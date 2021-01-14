$(function(){
    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        cat_three: 'all',
        sort: 'id',
        sortType: 'ASC',
        current: 1,
        pagesize: 12
      }
      getCatOne()
  async function getCatOne() {
    const {list} = await $.get('./../server/catone.php', null, null, 'json')
    // console.log(list);
    let str = '<span class="active">全部</span>'
    list.forEach(item => {
      str += `<span>${ item.cat_one_id }</span>`
    })
    $('.cat_one .right').html(str)
  }

  $('.cat_one .right').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')

    const cat_one = $(this).text()
    list_info.cat_one = cat_one
    list_info.cat_two = 'all'
    list_info.cat_three = 'all'
    $('.cat_three .right').html('<span class="active">全部</span>')
    if (cat_one === '全部') {
        $('.cat_two .right').html('<span class="active">全部</span>')
        list_info.cat_one = 'all'
      } else {
        getCatTwo()
      }
      getCount()
    })
    async function getCatTwo() {
      const { list } = await $.get('./../server/cattwo.php', { cat_one: list_info.cat_one }, null, 'json')
      let str = '<span class="active">全部</span>'
      list.forEach(item => {
        str += `<span>${ item.cat_two_id }</span>`
      })
      $('.cat_two .right').html(str)
    }
    $('.cat_two .right').on('click', 'span', function () {
        $(this).addClass('active').siblings().removeClass('active')
        const cat_two = $(this).text()
        list_info.cat_two = cat_two
        list_info.cat_three = 'all'
        if (cat_two === '全部') {
          list_info.cat_two = 'all'
          $('.cat_three .right').html('<span class="active">全部</span>')
        } else {
          getCatThree()
        }
        getCount()
      })
      async function getCatThree() {
        const { list } = await $.get('./../server/catthree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')
        let str = '<span class="active">全部</span>'
        list.forEach(item => {
          str += `<span>${ item.cat_three_id }</span>`
        })
        $('.cat_three .right').html(str)
      }

      $('.cat_three .right').on('click', 'span', function () {
        $(this).addClass('active').siblings().removeClass('active')
        const cat_three = $(this).text()
        list_info.cat_three = cat_three
        if (cat_three === '全部') {
          list_info.cat_three = 'all'
        }
        getCount()
      })

      getCount()
      async function getCount() {
        const { count } = await $.get('./../server/getCount.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two, cat_three: list_info.cat_three }, null, 'json')
        new Pagination('.pagination', {
          total: count,
          pagesize: 12,
          sizeList: [12, 16, 20, 24],
          
          change (current, pagesize) {
            list_info.current = current
            list_info.pagesize = pagesize
            getGoodsList()
          }
        })
      }

      async function getGoodsList(){
        const {list}=await $.get('./../server/goodslist.php',list_info,null,'json')
        // console.log(list[0]);
        let str=''
        list.forEach(item=>{
            str += `
            <div class="movie_list">
                    <img src="${item.goods_big_logo}" alt="">
                    <p data-id="${item.goods_id}">${item.goods_name}</p>
                    <span>${item.goods_price}</span>
            </div>

            `
          })
          $('.listinfo .movie').html(str)
  
      }
        
    $('.listinfo .sort').on('click','span',function(){
        if(this.dataset.sort===list_info.sort){
            list_info.sortType=list_info.sortType==='ASC'?'DESC':'ASC'
        }else{
            list_info.sortType='ASC'
        }
        list_info.sort=this.dataset.sort
        list_info.current=1
        $(this).addClass('active').siblings().removeClass('active')
        getGoodsList()
    })

    $('.movie').on('click','p',function(){
        // console.log(this)
        window.location.href='./shop.html'
    })

}

)