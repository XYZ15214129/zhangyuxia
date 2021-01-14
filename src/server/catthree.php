<?php

  $one = $_GET['cat_one'];
  $two = $_GET['cat_two'];

  $sql = "SELECT `cat_three_id` FROM `goods` WHERE `cat_one_id`='$one' AND `cat_two_id`='$two' GROUP BY `cat_three_id`";

  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'maoyan');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);

  $arr = array(
    "message" => "获取三级列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);


?>
