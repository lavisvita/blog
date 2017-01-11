<?php
include("./blog_class.php");
$auth= new Blog();

if(isset($_GET['getUser'])){
    $param = $_GET['param'];
    $param2 = $_GET['param2'];
    if($param == 'dXNlcg==' && $param2 == 'R2ZIakttS2VlUGVyMjAxNw=='){ //QaWsEd2017
        $login = base64_decode($param);
        $password = base64_decode($param2);
        $result = $auth->checkAuth($login, $password);
    }
    echo trim($result);
}

?>