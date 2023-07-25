# News-platform-laravel-react
1. Make sure you have installed Docker
2. Open **Terminal** with the Root path of project
3. In the terminal write command <pre>docker-compose up</pre>
4. Make sure all containers are running
5. Go into "news-backend" container, in terminal write
<pre>php artisan && migrate:fresh && php artisan db:seed && php artisan app:update-or-fill-news</pre>
6. You're all set. Enjoy **:D**

   Authentication: Jwt
   
   APIs: [NewsApi, NYT, Guardian]
