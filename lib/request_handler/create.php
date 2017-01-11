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

   $catId = $_POST[0]['catId'];
   $FURL = $_POST[0]['furl'];
   $articleText = htmlspecialchars($_POST[0]['articleText']);
   $articleHeader = htmlspecialchars($_POST[0]['articleHeader']);
   $articlePreview = htmlspecialchars($_POST[0]['articlePreview']);
   $fileName = $_POST[0]['fileName'];
   echo $catId, $articleText, $articleHeader, $articlePreview, $fileName;
        echo json_encode($data);
   $result = $list->addArticle($catId, $articleText, $articleHeader, $articlePreview, $fileName, $FURL);
 }

?>