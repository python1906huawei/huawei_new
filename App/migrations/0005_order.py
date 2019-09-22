# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-09-20 15:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0004_product_showpicture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_date', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('is_delete', models.IntegerField(default=0, verbose_name='删除标记')),
                ('total_price', models.IntegerField(verbose_name='订单总价格')),
                ('total_count', models.IntegerField(verbose_name='订单商品总数量')),
                ('create_time', models.DateTimeField(blank=True, null=True, verbose_name='创建时间')),
                ('order_status', models.SmallIntegerField(choices=[(1, '待支付'), (2, '待发货'), (3, '待收货'), (4, '待评价'), (5, '已完成')], default=1, verbose_name='订单状态')),
                ('products', models.CharField(max_length=1000, verbose_name='列表化储存产品')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='orders', to=settings.AUTH_USER_MODEL, verbose_name='用户')),
            ],
            options={
                'verbose_name': '订单信息',
                'verbose_name_plural': '订单信息',
                'db_table': 'order',
            },
        ),
    ]
