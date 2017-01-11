<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
include("./blog_class.php");
$list = new Blog();

 $_POST = json_decode(file_get_contents('php://input'), true);
 // checking for blank values.
foreach($_POST as $key=>$value){
    $articleId = $_POST['articleId'];
    $senderName = $_POST['senderName'];
    $senderEmail = $_POST['senderEmail'];
    $senderText = $_POST['senderText'];
}
echo $articleId, $senderName, $senderEmail, $senderText;
$dns = 'keeper18plus@gmail.com';
$to = 'keeper18plus@gmail.com';
$subject = 'Добавлен новый комментарий';
$message = 'Новый комментарий ' . "\r\n" . 'Имя: '. $senderName . "\r\n" . 'Email: ' . $senderEmail . "\r\n" . 'Комментарий: '. $senderText;
$headers = 'From: keeper18plus@gmail.com '. $dns . "\r\n" .
    'Reply-To: test@'. $_SERVER['HTTP_HOST'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
if( mail($to,$subject,$message,$headers) ){
    echo 'Успешно отправлено!';
}

$result = $list->addComment($articleId, $senderName, $senderEmail, $senderText);

?>