import pymysql
from django.dispatch import receiver
from huawei_new.mysignal import my_signal

pymysql.install_as_MySQLdb()


@receiver(my_signal)
def process_signal(sender, **kwargs):
    pass
