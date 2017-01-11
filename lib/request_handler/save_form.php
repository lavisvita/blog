<?php
    $target_dir = "../upload/";
    $name = $_POST['name'];
    $target_file = $target_dir . basename($_FILES["file"]["name"]);

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo "Файл корректен и был успешно загружен.\n";
    } else {
        echo "Файл не загружен!\n";
    }
?>