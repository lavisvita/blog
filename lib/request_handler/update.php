<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
include("./blog_class.php");
$list = new Blog();

 $_POST = json_decode(file_get_contents('php://input'), true);
 // checking for blank values.
 if (!empty($errors)) {
   $data['errors']  = $errors;
 } else {
   $data['message'] = 'Form data is going well';

   $FURL = $_POST[0]['furl'];
   $post_id = $_POST[0]['postId'];
   $cat_id = $_POST[0]['catId'];
   $articleText = htmlspecialchars($_POST[0]['articleText']);
   $articleHeader = htmlspecialchars($_POST[0]['articleHeader']);
   $articlePreview = htmlspecialchars($_POST[0]['articlePreview']);
   $articlePicture = $_POST[0]['fileName'];
     echo $articleText;

   echo json_encode($data);
   $result = $list->updateArticle($post_id, $cat_id, $articleText, $articleHeader, $articlePreview, $articlePicture, $FURL);
 }

?>