<?php



$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");

$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");

$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");

$Android = stripos($_SERVER['HTTP_USER_AGENT'],"Android");

$webOS   = stripos($_SERVER['HTTP_USER_AGENT'],"webOS");



//do something with this information

if( $iPod || $iPhone ){

    //browser reported as an iPhone/iPod touch -- do something here

    $string = "Location: https://docs.google.com/forms/d/e/1FAIpQLSeZA35-g7xqZ9qFJ4aw7sEbAKWpFC0gNC4UKtDfzZa89DAxoA/viewform?usp=pp_url";

    header($string);

    die();

}else if($iPad){

    //browser reported as an iPad -- do something here

    $string = "Location: https://docs.google.com/forms/d/e/1FAIpQLSeZA35-g7xqZ9qFJ4aw7sEbAKWpFC0gNC4UKtDfzZa89DAxoA/viewform?usp=pp_url";

    header($string);

    die();

}else if($Android){

    //browser reported as an Android device -- do something here

    $string = "Location: https://docs.google.com/forms/d/e/1FAIpQLSeZA35-g7xqZ9qFJ4aw7sEbAKWpFC0gNC4UKtDfzZa89DAxoA/viewform?usp=pp_url";

    header($string);

    die();

}else if($webOS){

    //browser reported as a webOS device -- do something here

    $string = "Location: https://docs.google.com/forms/d/e/1FAIpQLSeZA35-g7xqZ9qFJ4aw7sEbAKWpFC0gNC4UKtDfzZa89DAxoA/viewform?usp=pp_url";

    header($string);

    die();

}else{

    //browser reported as PC -- do something here

    $string = "Location: https://docs.google.com/forms/d/e/1FAIpQLSeZA35-g7xqZ9qFJ4aw7sEbAKWpFC0gNC4UKtDfzZa89DAxoA/viewform?usp=pp_url";

    header($string);

    die();

}





?>