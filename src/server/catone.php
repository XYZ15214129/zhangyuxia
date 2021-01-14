<?php

  $sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";

  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'maoyan');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);

  $arr = array(
    "message" => "获取一级列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);

?>
