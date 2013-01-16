<head>
<meta charset='utf-8' />
<title><?=isset($title) ? $title : 'Template for testprograms in JavaScript'?></title>
<link rel="stylesheet/less" type="text/css" href="style.less">
<script src="js/modernizr.js"></script>
<script src="js/jquery.js"></script>
<script src="js/svidde.js"></script>
<script src="main.js"></script>
</head>
<body>


<div id='game'>

<canvas id="can"></canvas>
<audio id='songTheme' loop="loop">
    <source src='audio/loz_underworld.mp3'/>
    <source src='audio/loz_underworld.ogg'/>
</audio>  

<audio id='die'>
    <source src='audio/loz_die.wav'/>
    <source src='audio/loz_die.ogg'/>
</audio>  

<p>Du styr med pilarna och attackerar med mellanslag.</p>
<p>Startar nytt spel med Enter om/när du dör</p>

</div>
</body>
</html>

