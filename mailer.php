<?php
$post_data = file_get_contents("php://input");
$data = json_decode($post_data);

$to = "dkwasniewski145@gmail.com";
$subject = 'Email z formularza kwasniewski-dev';

$message = $data->message;
 $name = $data->name;
$od  = "From: $name \r\n";
$od .= 'MIME-Version: 1.0'."\r\n";
$od .= 'Content-type: text/html; charset=iso-8859-2'."\r\n";
 $send = "<html>
<head>
</head>
<body>
   <b>Witam serdecznie!</b><br/>
   <h3>'$message'</h3>
   
   <span>Wiadomosc od: '$name' </span>
</body>
</html>";
//php mail function to send email on your email address
mail($to, $subject, $send, $od);
?>
