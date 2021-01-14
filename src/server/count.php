<?php
$one=$_GET['cat_one'];
$sql="SELECT * FROM `goods`";
if ($one != 'all') $sql.=" WHERE `cat_one_id`='$one'";
$link=mysqli_connect('127.0.0.1','root','root','maoyan');
$res=mysqli_query($link,$sql);
$data=mysqli_fetch_all($res);
mysqli_close($link);
$arr=array(
    'message'=>'获取总数成功',
    'count'=>count($data)
);
echo json_encode($arr);




?>