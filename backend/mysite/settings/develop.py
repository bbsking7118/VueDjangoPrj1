from .base import *


SECRET_KEY = 'django-insecure-=m_&ce9o-4ai0#2sb2nv*v&5&yz@@&ew_$la+59p@ote7z46ll'

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
