<?php
include("./blog_class.php");
$list = new Blog();
if(isset($_GET['allArticles'])){
    $offset = $_GET['offset'];
    if( $offset < 0 || empty($offset) ){
        $offset = 1;
    }else{
        $offset = $_GET['offset'];
    }
    $showArticles = $list->getAllArticles($offset);
    echo json_encode($showArticles);
}

if(isset($_GET['getBestArticle'])){
    $showArticle = $list->getBestArticle();
    echo json_encode($showArticle);
}

if(isset($_GET['setBestArticle'])){
    $id = $_GET['articleId'];
    $setBest = $list->setBestArticle($id);
    echo json_encode($setBest);
}

if(isset($_GET['allArticlesAdmin'])){
    $showArticles = $list->getAllArticlesAdmin();
    echo json_encode($showArticles);
}

if(isset($_GET['allCategories'])){
    $showCategories = $list->getAllCategories();
    echo json_encode($showCategories);
}

if(isset($_GET['articlesOfCategory'])){
    $id = $_GET['categoryId'];
    $offset = $_GET['offset'];
    $showArticlesOfCategories = $list->getCategoryArticles($id, $offset);
    echo json_encode($showArticlesOfCategories);
}

if(isset($_GET['oneArticle'])){
    $id = $_GET['oneArticle'];
    $showArticle = $list->getOneArticles($id);
    echo json_encode($showArticle);
}
if(isset($_GET['getOneCategory'])){
    $id = $_GET['catId'];
    $showCat = $list->getOneCategory($id);
    echo json_encode($showCat);
}

if(isset($_GET['articleFurl'])){
    $furl = $_GET['articleFurl'];
    $articleFurl = $list->getArticleByFurl($furl);
    echo json_encode($articleFurl);
}

if(isset($_GET['updateCategory'])){
    $catId = $_GET['catId'];
    $catName = $_GET['catName'];
    $catResult = $list->updateCategory($catId, $catName);
    echo json_encode($catResult);
}
if(isset($_GET['addNewCategory'])){
    $catNewName = $_GET['catName'];
    $catResult = $list->addNewCategory($catNewName);
    echo json_encode($catResult);
}

if(isset($_GET['increaseViews'])){
    $articleId = $_GET['id'];
    $increaseResult = $list->getArticleViews($articleId);
    echo json_encode($increaseResult);
}

if(isset($_GET['getComments'])){
    $id = $_GET['getComments'];
    $showComments = $list->getComments($id);
    echo json_encode($showComments);
}

if(isset($_GET['sendComment'])){
    $articleid = $_GET['articleid'];
    $userName = $_GET['userName'];
    $userEmail = $_GET['userEmail'];
    $userText = $_GET['commentUserText'];
    echo $articleid, $userName, $userEmail, $userText;
//    $showComments = $list->getComments($id);
//    echo json_encode($showComments);
}

if(isset($_GET['deleteArticle'])){
    $articleId = $_GET['articleId'];
    $result = $list->delete_article($articleId);
    echo trim($result);
}
if(isset($_GET['articlesOfCategoryFromHistory'])){
    $id = $_GET['categoryId'];
    $offset = $_GET['offset'];
    $showArticlesOfCategories = $list->getCategoryArticlesFromHistory($id, $offset);
    echo json_encode($showArticlesOfCategories);
}
?>
