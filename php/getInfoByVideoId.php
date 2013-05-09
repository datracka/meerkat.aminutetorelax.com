<?php

include "vimeo/vimeo.php";
include "VimeoApi.php";

$oVimeoApi = new VimeoApi();

$oVideoInfo = $oVimeoApi->getInfoByVideoId($_GET['id']);
echo json_encode($oVideoInfo->video);