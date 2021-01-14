<?php

  $one = $_GET['cat_one'];

  $sql = "SELECT `cat_two_id` FROM `goods` WHERE `cat_one_id`='$one' GROUP BY `cat_two_id`";

  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'maoyan');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);

  $arr = array(
    "message" => "获取二级列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);


?>
