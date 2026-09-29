"""
Django settings for Travel_Management project.
"""
"""
Django settings for Travel_Management project.
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# ============================================================
# BASE DIRECTORY
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env", override=True)


# ============================================================
# SECURITY
# ============================================================

SECRET_KEY = 'django-insecure-7u@t(7pa71edp#uu)r855x3xh!5ph9pu85a_$v^9^bo7!(1=2i'

DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]


# ============================================================
# APPLICATIONS
# ============================================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'Travel',
]

# ============================================================
# MIDDLEWARE
# ============================================================

MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# ============================================================
# URL CONFIGURATION
# ============================================================

ROOT_URLCONF = 'Travel_Management.urls'


# ============================================================
# TEMPLATES
# ============================================================

TEMPLATES = [

    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        'DIRS': [

            # Main project templates folder
            BASE_DIR / 'templates',

            # Optional: templates inside Travel app
            BASE_DIR / 'Travel' / 'templates',
        ],

        'APP_DIRS': True,

        'OPTIONS': {

            'context_processors': [

                'django.template.context_processors.request',

                'django.contrib.auth.context_processors.auth',

                'django.contrib.messages.context_processors.messages',

                'django.template.context_processors.debug',

                'django.template.context_processors.media',
            ],
        },
    },
]


# ============================================================
# WSGI
# ============================================================

WSGI_APPLICATION = 'Travel_Management.wsgi.application'


# ============================================================
# DATABASE
# ============================================================

DATABASES = {

    # 'default': {

    #     'ENGINE': 'django.db.backends.mysql',

    #     'NAME': 'travel_Management',

    #     'USER': 'root',

    #     'PASSWORD': 'Shankha@2005',

    #     'HOST': '127.0.0.1',

    #     'PORT': '3306',
    # }
    
     'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ============================================================
# PASSWORD VALIDATION
# ============================================================

AUTH_PASSWORD_VALIDATORS = [

    {
        'NAME':
        'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },

    {
        'NAME':
        'django.contrib.auth.password_validation.MinimumLengthValidator',
    },

    {
        'NAME':
        'django.contrib.auth.password_validation.CommonPasswordValidator',
    },

    {
        'NAME':
        'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ============================================================
# INTERNATIONALIZATION
# ============================================================

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True


# ============================================================
# STATIC FILES
# ============================================================

STATIC_URL = '/static/'

STATICFILES_DIRS = [

    BASE_DIR / 'static',
]


# ============================================================
# MEDIA FILES
# ============================================================

MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR / 'media'


# ============================================================
# EMAIL
# ============================================================

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


# ============================================================
# AUTHENTICATION
# ============================================================

LOGIN_URL = 'login'

LOGIN_REDIRECT_URL = 'profile'

LOGOUT_REDIRECT_URL = 'login'


# ============================================================
# DEFAULT PRIMARY KEY
# ============================================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#===========================================================
# PAYMENT WITH RAZOPAY 
#===========================================================

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID", "").strip()

RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET", "").strip()

RAZORPAY_WEBHOOK_SECRET = os.environ.get("RAZORPAY_WEBHOOK_SECRET", "").strip()


# ============================================================
# GOOGLE GEMINI AI
# ============================================================

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY","").strip()

GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.8-flash").strip()