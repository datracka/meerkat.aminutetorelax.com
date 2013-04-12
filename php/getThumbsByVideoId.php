<?php

include "vimeo/vimeo.php";
include "VimeoApi.php";

$oVimeoApi = new VimeoApi();

$oThumbs = $oVimeoApi->getThumbsByVideoId($_GET['id']);
echo json_encode($oThumbs->thumbnails->thumbnail);