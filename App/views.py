from random import randint
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, HttpResponse, redirect
from django.urls import reverse
from django.views.generic import ListView
from django.views.generic.list import MultipleObjectMixin

from App.forms import RegisterForm, FindpasswordForm
from tools.sms import send_sms
from App.models import User, Userinfo, Product
from django.contrib import auth

# 首页
class IndexView(ListView):
    template_name = 'index_new.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'index_new.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'index_new.html')


# 首页 测试
class Index1View(ListView):
    template_name = 'index_new1.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'index_new1.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'index_new1.html')


# 验证码
def yzm(request):
    # 将验证码保存到session
    a = str(randint(1009, 9999))
    res = send_sms(request.POST.get('mobile'), {'number': a})
    print(res)
    request.session['code'] = a

    return HttpResponse(request)


# 注册
class RegisterView(ListView):
    template_name = 'register.html'

    def get(self, request, *args, **kwargs):
        # request.session.clear()

        return render(request, 'register.html', locals())

    def post(self, request, *args, **kwargs):
        form = RegisterForm(request.POST)

        # 验证码验证

        yzm1 = request.POST.get('message')
        yzm2 = request.session.get('code')
        # 判定验证码是否匹配
        print(yzm1, yzm2)
        res = (yzm1 == yzm2)
        # 如果验证码不匹配
        if not res:
            form.errors['yzm'] = "验证码不匹配,请重新验证"
        print(form, form.is_valid())
        if res and form.is_valid():
            print('==========')  # 验证通过
            request.session.clear()

            username = form.cleaned_data.get('mobile')

            password = form.cleaned_data.get('password')

            birthday = form.cleaned_data.get('birthday')
            print(000000000000000000000000)
            User.objects.create_user(username=username, email=None, password=password)
            user = User.objects.get(username=username)
            user.birthday = birthday
            user.save()
            login(request, user)
            return redirect(reverse('app:index'))

        return render(request, 'register.html')


# 找回密码
class FindpasswordView(ListView):
    template_name = 'findpassword1.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'findpassword1.html')

    def post(self, request, *args, **kwargs):
        form = FindpasswordForm(request.POST)

        # 验证码验证

        yzm1 = request.POST.get('message')
        yzm2 = request.session.get('code')
        # 判定验证码是否匹配
        print(yzm1, yzm2)
        res = (yzm1 == yzm2)
        # 如果验证码不匹配
        if not res:
            form.errors['yzm'] = "验证码不匹配,请重新验证"
        print(form, form.is_valid())
        if res and form.is_valid():
            print('==========')  # 验证通过
            request.session.clear()

            username = form.cleaned_data.get('mobile')

            new_password = form.cleaned_data.get('password')
            user = User.objects.get(username=username)

            print(username)


            user.set_password(new_password)
            user.save()

            login(request, user)
            return redirect(reverse('app:index'))

        return render(request, 'findpassword1.html')


# 登录华为
dict = {}


class LoginHuaweiView(ListView):
    template_name = 'login.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'login.html')

    def post(self, request, *args, **kwargs):

        while True:
            global dict

            if request.POST.get('denglu1'):
                print(dict, type(dict))
                username = request.POST.get('userAccount')
                password = request.POST.get('password')

                user = authenticate(request, username=username, password=password)

                if user and User.objects.get(username=request.POST.get('userAccount')).is_active == 1:
                    # 登录，写入session，并把user写入request

                    # 自动登录处理

                    login(request, user)
                    dict.clear()

                    return redirect(reverse('app:index'))
                else:

                    if dict.get(username) and dict.get(username) > 1:
                        dict.clear()
                        user = User.objects.get(username=request.POST.get('userAccount'))
                        user.is_active = 0
                        user.save()

                    else:
                        if dict.get(username):
                            dict[username] += 1
                        else:
                            dict[username] = 1


            elif request.POST.get('denglu2'):
                yzm1 = request.POST.get('message')
                yzm2 = request.session.get('code')
                print(yzm1, yzm2)
                print(request.POST.get('mobile'))
                if yzm1 == yzm2 and User.objects.filter(
                        username=request.POST.get('mobile')).exists() and User.objects.get(
                    username=request.POST.get('mobile')).is_active == 1:
                    user = User.objects.get(username=request.POST.get('mobile'))

                    # 登录，写入session，并把user写入request
                    # 自动登录处理

                    login(request, user)
                    dict.clear()

                    return redirect(reverse('app:index'))
                else:
                    if dict.get(request.POST.get('mobile')) and dict.get(request.POST.get('mobile')) > 1:
                        dict.clear()
                        user = User.objects.get(username=request.POST.get('mobile'))
                        user.is_active = 0
                        user.save()
                    else:

                        if dict.get(request.POST.get('mobile')):
                            dict[request.POST.get('mobile')] += 1
                        else:
                            dict[request.POST.get('mobile')] = 1
            return render(request, 'login.html')


# 退出登录
class LogOutView(ListView):
    template_name = 'index_new.html'
    def get(self, request, *args, **kwargs):
        logout(request)
        return render(request, 'index_new.html')

    def post(self, request, *args, **kwargs):
        logout(request)
        return render(request, 'index_new.html')



# 顶部+底部 的继承
# class TopView(ListView):
#     template_name = 'base.html'
#
#
#     # queryset=[Product.objects.filter(type=0).all(),Product.objects.filter(type=1).all(),Product.objects.filter(type=2).all()]
#     # queryset = Product.objects.filter(type=0).all()
#     queryset = [Product.objects.filter(type=0).all(), Product.objects.filter(type=1).all(),
#                 Product.objects.filter(type=2).all()]
#     def get_queryset(self):
#
#         queryset=self.queryset
#         return queryset
#     def get_context_data(self, **kwargs):
#         context = {
#             'paginator': None,
#             'page_obj': None,
#             'is_paginated': False,
#             'object_list': self.queryset
#         }
#         return context
def topview(request):

    # products=[Product.objects.filter(type=0),Product.objects.filter(type=1),Product.objects.filter(type=2)]
    products=Product.objects.filter(type=0).all()
    print(products)

    return render(request,'base.html',locals())

# class TopView2(ListView):
#     template_name = 'base.html'
#     context_object_name = 'phones'
#     queryset=Product.objects.filter(type=0)
#
# class TopView3(ListView):
#     template_name = 'base.html'
#     context_object_name = 'phones'
#     queryset=Product.objects.filter(type=0)
#

# 顶部+底部 的继承  测试1
class Top1View(ListView):
    template_name = 'base1.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'base1.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'base1.html')


# 顶部+底部 的继承  测试2
class Top2View(ListView):
    template_name = 'base_new1.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'base_new1.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'base_new1.html')


# 商品详情
class DetailView(ListView):
    template_name = 'detail_1.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'detail_1.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'detail_1.html')


# 手机列表
class PhoneListView(ListView):

    template_name = 'phone_list.html'


    def get_queryset(self):
        print(self.request.GET.get('type'),'=============')
        if self.request.GET.get('type')=='0':
            queryset=Product.objects.filter(status=1,is_delete=0,type=0,inventory__gt=0)
            print('111111111111111111111111111',Product.objects.filter(status=1,is_delete=0,type=0,inventory__gt=0))
            return queryset
        elif self.request.GET.get('type')=='1':

            queryset=Product.objects.filter(status=1,is_delete=0,type=1,inventory__gt=0)
            return queryset
        elif self.request.GET.get('type') == '2':
            queryset=Product.objects.filter(status=1,is_delete=0,type=2,inventory__gt=0)
            return queryset


# 电脑平板列表
class PcListView(ListView):
    template_name = 'pclist.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'pclist.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'pclist.html')


# 智能穿戴
class WatchView(ListView):
    template_name = 'watchlist.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'watchlist.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'watchlist.html')


# 个人中心
class MyCenterView(ListView):
    template_name = 'mycenter.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'mycenter.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'mycenter.html')


