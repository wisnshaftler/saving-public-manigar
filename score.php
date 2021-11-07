<?php
require_once("dbconnection.php");

if(isset($_GET['leaderboard'])){
  $sql = "SELECT * FROM player ORDER BY score DESC limit 10";
  $result = $conn->query($sql);
  
  if($result->num_rows>0){
    while($row = $result->fetch_array()){
      $data[]  = array('name'=>$row['name'], 'score'=>$row['score'], 'date'=>$row['time']);
    }
    echo(json_encode($data));
    
  }
}

if(isset($_GET['score'])){
  $name =$_GET['name'];
  $score = $_GET['score'];
  
  $sql = "INSERT INTO player (name, score) VALUES ('$name', '$score')";
  $conn->query($sql);
  
}
?>