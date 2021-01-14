<?php
// 1,接收前端数据
$one=$_GET['cat_one'];
$current=$_GET['current'];
$pagesize=$_GET['pagesize'];
// 2，组装sql语句
$sql="SELECT * FROM `goods`";
if ($one != 'all') $sql.=" WHERE `cat_one_id`='$one'";
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