## Project Description

> BestiThis project is the backend of the "Besti" application which has the main feature of image prediction. This application acts as a middleware between the user and the server in the Google cloud.


### Developers

| Name                | Bangkit ID | Github Profile                                 |
| ------------------- | ---------- | ---------------------------------------------- |
| Nadhiful Fadhil     | C2276F2369 | [Link](https://github.com/MeNadhif "MeNadhif") |
| Alman Faluti Ashari | C7276F2370 | [Link](https://github.com/almanfa "Link")      |

------------


### Dev Environtment Setup

-  Node.js
Version : `16.14.0`
For installation Node.js, please visit [Node.js doc](https://nodejs.org/en/docs/ "Node.js doc").

- Express.js
Version : `4.16.1`
For installation Express.js, please visit [Express.js doc](https://expressjs.com/en/starter/installing.html "Express.js doc").

- TensorFlow.js
Version : `3.18.0`
For installation Express.js, please visit [TensorFlow.js doc](https://www.tensorflow.org/js/tutorials "TensorFlow.js doc").

- MySQL
Version : `8.1.6`
For installation Express.js, please visit [MySQL doc](https://www.mysql.com/downloads/ "MySQL doc").

------------


### Install Dependencies

        $ npm install

------------


### List API
- `POST`   `/users/register`

        {
        	name* : string
        	profession : string
        	gender* : string
        	phone : string
        	email* : string
        	password* : string
        }



- `POST`  `/users/login`

        {
        	email* : string
        	password* : string
        }


- `PUT`  `/users/update`

        {
        	name* : string
        	email* : string
        	password* : string
        	gender* : string
        	phone* : string 
        }

- `GET`  `/users/get_info`

        {
    		status : string
    		data : Data3{
    			id : integer($int32)
    			name : string
    			phone : string
    			email : string
    			gender : string
    			profession : string
        }



- `POST` `/users/logout`

        Authorization *
         string
         (header)


- `POST` `/predict`

        image *
         string
         (form)

- `POST` `/review`

         {
           	coment : string
         }

- `GET` `/review`
 
        {
            name : string
            user_id : string
            comment : string
            created_at : string
         }

*More complete documentation regarding the API can be checked via the following [link](https://app.swaggerhub.com/apis-docs/future-dev/APIBesti/1.0#/ "link")*

------------

