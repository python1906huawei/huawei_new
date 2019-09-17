from random import randint

from django.contrib.auth import login
from django.shortcuts import render, HttpResponse, redirect
from django.urls import reverse
from django.views.generic import ListView

# Create your views here.

# 首页
from App.forms import RegisterForm
from tools.sms import send_sms
from App.models import User, Userinfo


class IndexView(ListView):
    template_name = 'index_new.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'index_new.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'index_new.html')


# 注册
# class RegisterView(ListView):
#     template_name = 'register.html'
#
#     def get(self, request, *args, **kwargs):
#         return render(request, 'register.html')
#
#     def post(self, request, *args, **kwargs):
#         return render(request, 'register.html')

def yzm(request):
    # 将验证码保存到session
    print(11111111111111111)
    print(request.POST.get('mobile'))
    res = send_sms(request.POST.get('mobile'), {'number': str(randint(1009, 9999))})

    request.session['code'] = res

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
        yzm1 = request.POST.get('yzm')
        yzm2 = request.session.get('code')
        # 判定验证码是否匹配
        res = (yzm1 == yzm2)
        # 如果验证码不匹配
        if not res:
            form.errors['yzm'] = "验证码不匹配,请重新验证"

        if res and form.is_valid():
            print('==========')  # 验证通过
            request.session.clear()
            user = User()
            userinfo = Userinfo()
            user.username = form.cleaned_data.get('mobile')
            user.password = form.cleaned_data.get('password')
            user.birthday = form.cleaned_data.get('birthday')
            User.objects.create_user(user.username, None, user.password)

            userinfo.user_id = user
            userinfo.save()
            login(request, user)
            return redirect(reverse('app:index'))

        return redirect(reverse('app:index'))


# 登录华为
class LoginHuaweiView(ListView):
    template_name = 'login.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'login.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'login.html')


# 顶部+底部 的继承
class TopView(ListView):
    template_name = 'base.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'base.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'base.html')


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

    def get(self, request, *args, **kwargs):
        return render(request, 'phone_list.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'phone_list.html')


# 电脑平板列表
class PcListView(ListView):
    template_name = 'pclist.html'

    def get(self, request, *args, **kwargs):
        return render(request, 'pclist.html')

    def post(self, request, *args, **kwargs):
        return render(request, 'pclist.html')


#
class WatchView(ListView):
    template_name = 'watchlist.html'
