# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-09-19 19:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0002_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='score',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]