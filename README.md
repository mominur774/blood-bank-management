Blood Bank Management system with Django and React.

# Getting Started

> Clone the repository
```bash
git clone https://github.com/mominur774/blood-bank-management.git   # https
# or
git clone git@github.com:mominur774/blood-bank-management.git   # ssh
```

## Project setup and run (Backend)

<br />

> Setup `.env`

```bash
DEBUG=
SECRET_KEY=
```
> Install dependency
```bash
pip install -r requirements.txt
```
> Migrate database and create superuser
```bash
python manage.py migrate
python manage.py createsuperuser
```
> Run the server
```bash
python manage.py runserver
```
You will get all the api endpoints by hitting this url : http://127.0.0.1:8000/api-docs/
<br />

## Project setup and run (Frontend)
<br />

> Setup `.env.local`

```bash
NEXT_PUBLIC_APP_API_URL=http://127.0.0.1:8000/
```
> Install dependency
```bash
npm i
# or
yarn
```

> Run the server
```bash
npm run dev 
# or
yarn run dev
```
Your app will run on http://localhost:3000/




https://github.com/mominur774/blood-bank-management/assets/57674321/9f804743-8b40-47d2-aa32-d2805dabef24

