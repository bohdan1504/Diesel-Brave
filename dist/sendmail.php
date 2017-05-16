<?
if(isset($_POST['name'])&&isset($_POST['phone'])){
  $to = 'bandrashko1@gmail.com';
  $subject = 'Заявка с сайта Antio';
  $message = '
  <html>
  <head>
    <title>'.$subject.'</title>
  </head>
  <body>
    <p>Имя: '.htmlspecialchars($_POST['name']).'</p>
    <p>Телефон: '.htmlspecialchars($_POST['phone']).'</p>
  </body>
  </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= 'From: antio.adr.com.ua';
        mail($to, $subject, $message, $headers);
      }
      ?>
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Спасибо!</title>
        <link rel="stylesheet" href="css/style.css">
      </head>
      <body class="sendmail">
        <div>
          <p class="thanks">Спасибо за заказ, <b><? echo ($_POST['name']) ?>!</b></p>
          <p class="operator">Оператор свяжеться с Вами в ближайшее время.</p>  
          <a href="index.html">
            <p class="back_home">Вернуться на главную страницу</p>
          </a>
        </div>
      </body>
      </html>