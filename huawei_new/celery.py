from __future__ import absolute_import

from django.conf import settings

import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'huawei_new.settings')

app = Celery('celery1')

app.config_from_object('django.conf:settings')

app.autodiscover_tasks()
