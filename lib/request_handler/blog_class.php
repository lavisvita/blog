<?php
class Blog {

    private $localhost = "localhost";
    private $username = "user_blog";
    private $password = "V4s7E4s9";
    private $db_name = "devblog";

    private $mysqli;

    public function __construct(){
        $this->mysqli = new mysqli($this->localhost, $this->username, $this->password, $this->db_name) or die();

        $this->mysqli->query("SET NAMES 'utf8'");
        $this->mysqli->query("set character_set_client='utf8'");
        $this->mysqli->query("set character_set_results='utf8'");
        $this->mysqli->query("set collation_connection='utf8_general_ci'");
    }
// ------------------------------------------------------------- show more articles in category start ---------------------------------------------
    public function getCategoryArticles($cat_id, $offset){
        if(!empty($cat_id) && isset($cat_id) && $cat_id != undefined && $cat_id != '' && $cat_id != 'undefined'){
            $q2 = 'SELECT `articles`.`id`, furl, post_img, post_date, post_header, post_preview, post_img, post_text, post_views, post_likes, post_img, post_comments, best_post
                FROM `articles`
                INNER JOIN `category` ON `articles`.`cat_id`=`category`.`id` WHERE `articles`.`cat_id`=' . $cat_id . ' ORDER BY ID DESC LIMIT '. ($offset-1) . ',18';
        }else{
            $q2 = 'SELECT * FROM `articles` ORDER BY ID DESC LIMIT ' . ($offset-1) . ', 18';
        }
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array())
        {
            $items[] = $row;
        }
        return $items;
    }
// ------------------------------------------------------------- show more articles in category end ---------------------------------------------
    public function getCategoryArticlesFromHistory($cat_id, $offset){ //
        $q2 = 'SELECT `articles`.`id`, furl, post_img, post_date, post_header, post_preview, post_img, post_text, post_views, post_likes, post_img, post_comments, best_post FROM `articles` INNER JOIN `category` ON `articles`.`cat_id`=`category`.`id` WHERE `articles`.`cat_id`=' . $cat_id . ' LIMIT 0,' . (6 + $offset-1);
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array())
        {
            $items[] = $row;
        }
        return $items;
    }

    public function getBestArticle(){
        $q2 = "SELECT * FROM `articles` WHERE `articles`.`best_post`=1";
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array())
        {
            $items[] = $row;
        }
        return $items;
    }

    public function setBestArticle($id){
        $q2 = "UPDATE `articles` SET `best_post`=0";
        $res2 = $this->mysqli->query($q2);
        $q3 = "UPDATE `articles` SET `best_post`=1 WHERE  `articles`.`id`=" . $id;
        $res3 = $this->mysqli->query($q3);
        if($res3) return true;
        else return false;
    }

    public function getComments($id){
        $q2 = "SELECT `comments`.`com_text`, `comments`.`com_likes`, `comments`.`com_author` FROM `comments` INNER JOIN `articles` ON `articles`.`id`=`comments`.`article_id` WHERE `comments`.`article_id`=" . $id;
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array())
        {
            $items[] = $row;
        }
        return $items;
    }
    public function addComment($articleId, $senderName, $senderEmail, $senderText){
        $q = 'INSERT INTO `comments` (article_id, com_text, com_author, user_email)
                 VALUES("' . $articleId .'", "'. $senderText .'", "'. $senderName .'", "'. $senderEmail .'")';
        $res = $this->mysqli->query($q);

        // add comment
         $q2 = "SELECT * FROM `articles` ORDER BY ID DESC ";
            $res2 = $this->mysqli->query($q2);
            $items = Array();
            $i =0;
            while($row = $res2->fetch_array()){
                $items[] = $row;
                $commentsCount = "SELECT COUNT(*) FROM  `comments` INNER JOIN  `articles` ON  `articles`.`id` = `comments`.`article_id` WHERE  `comments`.`article_id` =" . $row['id'];
                $resArticleComments = $this->mysqli->query($commentsCount);
                $row_count = $resArticleComments->fetch_array();

                $update_q2 = 'UPDATE `articles` SET post_comments="' . $row_count[0] . '"' . 'WHERE id=' . $row['id'];
                $updateArticlePostComments = $this->mysqli->query($update_q2);
                $i++;
            }

        if($res) return true;
        else return false;
    }
    public function getAllArticles($offset){
        $q2 = 'SELECT * FROM `articles` ORDER BY ID DESC LIMIT ' . ($offset-1) . ', 18';
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        $i =0;
        while($row = $res2->fetch_array()){
            $items[] = $row;
            $commentsCount = "SELECT COUNT(*) FROM  `comments` INNER JOIN  `articles` ON  `articles`.`id` = `comments`.`article_id` WHERE  `comments`.`article_id` =" . $row['id'];
            $resArticleComments = $this->mysqli->query($commentsCount);
            $row_count = $resArticleComments->fetch_array();

            $update_q2 = 'UPDATE `articles` SET post_comments="' . $row_count[0] . '"' . 'WHERE id=' . $row['id'];
            $updateArticlePostComments = $this->mysqli->query($update_q2);
            $i++;
        }
        return $items;
    }
    public function getArticleByFurl($furl){
        $q2 = "SELECT * FROM `articles` WHERE furl='" . $furl . "'";
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array()){
            $items[] = $row;
        }
        return $items;
    }
    public function getAllArticlesAdmin(){
            $q2 = "SELECT * FROM `articles`";
            $res2 = $this->mysqli->query($q2);
            $items = Array();

            while($row = $res2->fetch_array()){
                $items[] = $row;
            }
            return $items;
        }

    public function getOneArticles($id){
        $q2 = "SELECT * FROM `articles` WHERE id=" . $id;
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array()){
            $items[] = $row;
        }
        return $items;
    }
    public function getArticleViews($id){
        $items = Array();
        $q = "SELECT `articles`.`post_views` FROM `articles` WHERE id=" . $id;
        $query = $this->mysqli->query($q);
        $row = $query->fetch_array();
        $i= $row['post_views'] + 1;
        $q2 = 'UPDATE `articles` SET post_views="' . $i . '"' . 'WHERE id=' . $id;
        $query2 = $this->mysqli->query($q2);
        if($query2) return true;
        else return false;
    }

    public function getOneCategory($id){
        $q2 = "SELECT * FROM `category` WHERE id=" . $id;
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array()){
            $items[] = $row;
        }
        return $items;
    }

    public function updateCategory($catId, $catName){
        $q = 'UPDATE category SET cat_name="' . $catName . '"' . 'WHERE id=' . $catId;
        $res = $this->mysqli->query($q);
        if($res) return true;
        else return false;
    }

    public function addNewCategory($catName){
        $q = 'INSERT INTO `category` (cat_name) VALUES("' . $catName .'")';
        $res = $this->mysqli->query($q);
        if($res) return true;
        else return false;
    }

    public function getAllCategories(){
        $q2 = "SELECT * FROM `category`";
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array()){
            $items[] = $row;
        }
        return $items;
    }

    public function delete_article($id){
        $q = "DELETE FROM articles WHERE id='" . $id . "'";
        $res = $this->mysqli->query($q);
        if($res) return true;
        else return false;
    }

    public function addArticle($catId, $articleText, $articleHeader, $articlePreview, $fileName, $FURL){
        if(!empty($catId) && !empty($articleText)){
            $today = date("d.m.Y");
            $q = 'INSERT INTO `articles` (cat_id, post_text, post_header, post_date, post_preview, post_img, furl)
             VALUES("' . $catId .'", "'. $articleText .'", "'. $articleHeader .'", "'. $today .'", "'. $articlePreview .'", "'. $fileName .'", "' . $FURL . '")';
            $res = $this->mysqli->query($q);
            if($res) return true;
            else return false;
        }
        else
        {
            return false;
        }
    }

    public function updateArticle($post_id, $cat_id, $post_text, $post_header, $post_preview, $articlePicture, $furl){
//        UPDATE articles SET post_text="Ноый текст", post_img="45.jpg" WHERE id=2
        $q = 'UPDATE articles SET post_text="' . $post_text . '", cat_id="' . $cat_id .'", post_header="' . $post_header . '", post_preview="' . $post_preview . '", post_img="' . $articlePicture . '", furl="' . $furl . '"' .  'WHERE id=' . $post_id;
        $res = $this->mysqli->query($q);
        if($res) return true;
        else return false;
    }

    public function checkAuth($login, $password){

        if(!empty($login) && !empty($password)){
            $q1 = "SELECT * FROM `user` WHERE `login`='" . $login ."'";
            $res1 = $this->mysqli->query($q1);
            $u_id = $res1->fetch_array();
            if ( $u_id['password'] === md5($password) ) {
                return true;
            }else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    public function getAllComments(){
        $q2 = "SELECT * FROM `comments`";
        $res2 = $this->mysqli->query($q2);
        $items = Array();
        while($row = $res2->fetch_array()){
            $items[] = $row;
        }
        return $items;
    }
    public function deleteComment($commentId){
        $q = "DELETE FROM comments WHERE id='" . $commentId . "'";
        $res = $this->mysqli->query($q);
        if($res) return true;
        else return false;
    }
}
?>


