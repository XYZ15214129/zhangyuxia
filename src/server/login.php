<?php
  $shoujihao = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM `users` WHERE `shoujihao`='$shoujihao' AND `password`='$password'";
  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'maoyan');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);
  if (count($data)) {
    $arr = array(
      "message" => "登录成功",
      "code" => 1,
      "nickname" => $data[0]['nickname']
    );
  } else {
    $arr = array(
      "message" => "登录失败",
      "code" => 0
    );
  }
  // 返回一个 json 格式字符串
  echo json_encode($arr);

?>