<?php
require 'rb.php';
// ################# DB & CONFIG ###########################

R::setup('mysql:host=localhost;dbname=stoodle', 'root', '');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// ################# DB & CONFIG ###########################
$json = json_decode(file_get_contents("php://input"), true);
$type = $json['type'];
$data = $json['data'];

function getSql($query)
{
  try {
    echo json_encode(R::getAll($query));
  } catch (Exception $error) {
    echo json_encode(['error', $error]);
  }
}

function storeSql($query)
{
  try {
    R::exec($query);
  } catch (Exception $error) {
    echo json_encode(['error', $error]);
  }
}

switch ($type) {
  case 'get':
    getSql($data);
    break;
  case 'set':
    storeSql($data);
    break;
  default:
    break;
}
