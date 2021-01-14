<?php
// 1,接收前端数据
$one=$_GET['cat_one'];
$two=$_GET['cat_two'];
$three=$_GET['cat_three'];
$sort=$_GET['sort'];
$sortType=$_GET['sortType'];
$current=$_GET['current'];
$pagesize=$_GET['pagesize'];
// 2，组装sql语句
$sql="SELECT * FROM `goods`";
if ($one != 'all') $sql.=" WHERE `cat_one_id`='$one'";
if ($two != 'all') $sql.=" AND `cat_two_id`='$two'";
if ($three != 'all') $sql.=" AND `cat_three_id`='$three'";
$sql .= " ORDER BY `goods_$sort` $sortType";
$start = ($current - 1) * $pagesize;
$sql .= " LIMIT $start, $pagesize";
$link=mysqli_connect('127.0.0.1','root','root','maoyan');
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
mysqli_close($link);
$arr=array(
    "message"=>'获取商品列表成功',
    'list'=>$data
);
echo json_encode($arr);







?>