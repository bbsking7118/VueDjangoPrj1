import os

from .base import *


SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = False

# AWS Example
ALLOWED_HOSTS = ['43.201.145.183']

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': os.environ['DATABASE_NAME'],
#         'USER': os.environ['DATABASE_USER'],
#         'PASSWORD': os.environ['DATABASE_PASSWORD'],
#         'HOST': 'django-mysql.ap-northeast-2.rds.amazonaws.com',
#         'PORT': '3306',
#         'OPTIONS': {
#             'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
#         },
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

CSRF_TRUSTED_ORIGINS = ['43.201.145.183']
