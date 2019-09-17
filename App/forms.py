import re

from django import forms
from django.core.exceptions import ValidationError

from App.models import User


def check_password(password):
    if re.search(r'\d', password) and \
            re.search(r'[a-z]', password):
        print('check_password')
        return password
    raise ValidationError('密码必须包含小写字母，数字')


class RegisterForm(forms.Form):
    mobile = forms.CharField(label='电话',

                             error_messages={

                                 'required': '手机号必须输入'
                             },

                             )
    message = forms.CharField(label='短信验证码', error_messages={
        'required': '必须输入验证码',

    })

    password = forms.CharField(label='密码',
                               max_length=128,
                               min_length=3,
                               widget=forms.PasswordInput(attrs={
                                   'placehold': '请输入密码',
                                   'class': 'hahaha'
                               }),
                               validators=[check_password],
                               error_messages={
                                   'max_length': '密码最大长度是128字符',
                                   'min_length': '密码长度不能小于3个字符',
                                   'required': '密码必须输入'
                               })

    repassword = forms.CharField(
        label='确认密码',
        max_length=128,
        min_length=3,
        widget=forms.PasswordInput(attrs={
            'placehold': '请输入确认密码',
            'class': '994'
        }),
        validators=[check_password],
        error_messages={
            'max_length': '密码最大长度是128字符',
            'min_length': '密码长度不能小于3个字符',
            'required': '密码必须输入'
        })

    birthday = forms.CharField(label='出生日期')

    # 自定义验证方法
    # 自定义的验证规则：clean_字段名
    def clean_phonenumber(self):
        res = User.objects.filter(username=self.cleaned_data.get('mobile')).exists()
        if res:
            raise ValidationError("已经注册过，请尝试找回密码")
        return self.cleaned_data.get('mobile')

    # 全局验证方法
    def clean(self):
        # 获取字段值，应该从cleaned_data获取
        passwrod1 = self.cleaned_data.get('password')
        passwrod2 = self.cleaned_data.get('repassword')
        if passwrod1 != passwrod2:
            raise ValidationError({'repassword': '两次密码不一致'})
        return self.cleaned_data
