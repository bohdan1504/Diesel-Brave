<?
if(isset($_POST['review-name'])&&isset($_POST['review-text'])){
  $to = 'info.brave0@gmail.com'; 
  $subject = 'Отзыв с сайта SalesManiya.ru';
  $message = '
  <html>
  <head>
    <title>'.$subject.'</title>
  </head>
  <body>
    <p>Имя: '.htmlspecialchars($_POST['review-name']).'</p>
    <p>Телефон: '.htmlspecialchars($_POST['review-text']).'</p>
  </body>
  </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= 'From: salesmaniya.ru';
        mail($to, $subject, $message, $headers);
      }
      ?>
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Спасибо за отзыв!</title>
        <link rel="stylesheet" href="css/style.css">
      </head>
      <body class="sendmail">
        <div>
          <p class="thanks">Спасибо за Ваш отзыв, <b><? echo ($_POST['review-name']) ?>!</b></p>
          <p class="operator">Нам важно Ваше мнение.</p>  
          <a href="index.html">
            <p class="back_home">Вернуться на главную страницу</p>
          </a>
        </div>
      </body>
      </html>