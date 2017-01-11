<?php
include("./blog_class.php");
$list = new Blog();
if(isset($_GET['allComments'])){
    $result = $list->getAllComments();
    echo json_encode($result);
}
if(isset($_GET['deleteComment'])){
    $id = $_GET['id'];
    $result = $list->deleteComment($id);
    echo json_encode($result);
}