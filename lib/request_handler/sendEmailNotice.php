<?php
if (isset($_POST) && !empty($_POST)) { // eсли пeрeдaн мaссив POST

    $name = strip_tags(htmlspecialchars($_POST["LNAME"])); // Имя лида
    $email = strip_tags(htmlspecialchars($_POST["EMAIL"])); // Email лида
}
$dns = 'lavisvita@yandex.ru';
$to = 'keeper18plus@gmail.com';
$subject = 'Подписка на Блог';
$message = 'Новый подписчик на блог ' . "\r\n" . 'Имя: '. $name . "\r\n" . 'Email: ' . $email;
$headers = 'From: keeper18plus@gmail.com '. $dns . "\r\n" .
    'Reply-To: test@'. $_SERVER['HTTP_HOST'] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
if( mail($to,$subject,$message,$headers) ){
    echo 'Успешно отправлено!';
}else{
    echo 'отправка не удалась!';
}
?>
