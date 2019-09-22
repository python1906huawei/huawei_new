from datetime import datetime
from random import randint

from alipay import AliPay
from django.contrib.auth import login, authenticate, logout
from django.shortcuts import render, HttpResponse, redirect
from django.urls import reverse
from django.views.generic import ListView
from django.views.generic.list import MultipleObjectMixin

from App.forms import RegisterForm, FindpasswordForm
from huawei_new.settings import MEDIA_ROOT, ALI_APP_ID, APP_PRIVATE_KEY, ALIPAY_PUBLIC_KEY
from tools.fileupload import FileUpload
from tools.sms import send_sms
from App.models import User, Userinfo, Product, Order
from django.contrib import auth


# 首页
class IndexView(ListView):
    template_name = 'index_new.html'

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    ]

        return queryset


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

        return redirect(reverse('app:index'))


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

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    Product.objects.get(pid=int(self.request.GET.get('pid')))
                    ]

        return queryset

    # def get(self, request, *args, **kwargs):
    #     pid=self.request.GET.get('pid')
    #     smallproduct=Product.objects.get(pid=int(pid))
    #     return render(request,'detail_1.html',locals())
    def post(self, request, *args, **kwargs):
        return render(request, 'detail_1.html')


# 手机列表
class PhoneListView(ListView):
    template_name = 'phone_list.html'

    def get_queryset(self):
        print(self.request.GET.get('type'), '=============')
        if self.request.GET.get('type') == '0':
            queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0)]
            print('111111111111111111111111111', Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0))
            return queryset
        elif self.request.GET.get('type') == '1':

            queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0)]
            return queryset
        elif self.request.GET.get('type') == '2':
            queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                        Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0)]

            return queryset


# 个人中心
class MyCenterView(ListView):
    template_name = 'mycenter.html'

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    ]

        return queryset


# 个人中心_订单
class MyCenterOrderView(ListView):
    template_name = 'mycenter_order.html'

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    [i.products.first() for i in Order.objects.filter(order_status=2, user_id=self.request.user.uid)],
                    [int(sum([i.products.first().price * i.productnum for i in Order.objects.filter(order_status=1,
                                                   user_id=self.request.user.uid)])) - self.request.user.score / 10,
                     len([i.products.first() for i in Order.objects.filter(order_status=1,
                                                                           user_id=self.request.user.uid)]),
                     self.request.user.score / 10]

                    ]

        return queryset


# 个人中心_评价
class MyCenterEvaluateView(ListView):
    template_name = 'mycenter_evaluate.html'

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    ]

        return queryset


# 个人中心_积分
class MyCenterScoreView(ListView):
    template_name = 'mycenter_score.html'

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    self.request.user.score / 10
                    ]

        return queryset


# 个人中心_收货地址
class MyCenterSiteView(ListView):
    template_name = 'mycenter_site.html'

    def get_queryset(self):
        queryset = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                    Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                    ]

        return queryset


# 个人信息_头像上传
def mycentermassage(request):
    if request.method == "POST":
        user = User.objects.get(pk=request.user.uid)
        user.first_name = request.POST.get('nicheng')  # 昵称
        user.last_name = request.POST.get('realname')  # 真是真实姓名
        user.birthday = request.POST.get('sr')  # 保存生日
        # 省
        user.detailaddress = request.POST.get("address")
        # 性别
        if request.POST.get('sex') == '2':
            user.gender = 2

        elif request.POST.get('sex') == '1':
            user.gender = 1
        else:
            user.gender = 0

        user.save()
        id = request.POST.get('profilesubmitbtn')
        print(request.FILES)
        file_obj = request.FILES.get('pic')
        print(file_obj)
        obj = FileUpload(file_obj, is_randomname=True)
        path = MEDIA_ROOT
        print(path)
        if obj.upload(path) > 0:
            user.portrait = obj.file_name
            user.save()
        return render(request, 'mycenter_massage.html', locals())
    else:
        return render(request, 'mycenter_massage.html')


# 购物车
def shopping(request):
    if request.GET.get('pid'):
        product = Product.objects.get(pid=request.GET.get('pid'))
        if request.user.orders and product.order:
            if request.GET.get('deletepid'):
                order = product.order
                product = Product.objects.get(order_id=order.id)
                product.order_id = None
                product.save()
                order.delete()
                if request.user.orders.first():

                    object_list = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                                   Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                                   Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                                   [i.products.first() for i in
                                    Order.objects.filter(order_status=1, user_id=request.user.uid)],
                                   [int(sum([i.products.first().price * i.productnum for i in
                                             Order.objects.filter(order_status=1,
                                                                  user_id=request.user.uid)])) - request.user.score / 10,
                                    len([i.products.first() for i in Order.objects.filter(order_status=1,
                                                                                          user_id=request.user.uid)]),
                                    request.user.score / 10]

                                   ]

                    return render(request, 'shopping.html', locals())
                else:
                    return redirect(reverse('app:index'))
            order = product.order
            order.productnum += int(request.GET.get('num'))
            order.save()
            print([i.products.first().price * i.productnum for i in
                   Order.objects.filter(order_status=1, user_id=request.user.uid)])
            object_list = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                           Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                           Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                           # Product.objects.filter(order=order.id)[0]
                           [i.products.first() for i in Order.objects.filter(order_status=1, user_id=request.user.uid)],
                           [int(sum([i.products.first().price * i.productnum for i in
                                     Order.objects.filter(order_status=1,
                                                          user_id=request.user.uid)])) - request.user.score / 10,
                            len([i.products.first() for i in Order.objects.filter(order_status=1,
                                                                                  user_id=request.user.uid)]),
                            request.user.score / 10]

                           ]

            return render(request, 'shopping.html', locals())

        order = Order()
        order.user_id = request.user
        order.create_time = datetime.now()
        order.order_status = 1
        order.productnum = request.GET.get('num')
        order.total = int(product.price) * int(request.GET.get('num'))
        order.save()
        product.order = order
        product.save()

        object_list = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                       Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                       Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                       # Product.objects.filter(order=order.id)[0]
                       [i.products.first() for i in Order.objects.filter(order_status=1, user_id=request.user.uid)],
                       [int(sum([i.products.first().price * i.productnum for i in Order.objects.filter(order_status=1,
                                                                                                       user_id=request.user.uid)])) - request.user.score / 10,
                        len([i.products.first() for i in Order.objects.filter(order_status=1,
                                                                              user_id=request.user.uid)]),
                        request.user.score / 10]

                       ]

        return render(request, 'shopping.html', locals())
    else:
        print(1111111111111111111)
        object_list = [Product.objects.filter(status=1, is_delete=0, type=0, inventory__gt=0),
                       Product.objects.filter(status=1, is_delete=0, type=1, inventory__gt=0),
                       Product.objects.filter(status=1, is_delete=0, type=2, inventory__gt=0),
                       # Product.objects.filter(order=order.id)[0]
                       [i.products.first() for i in Order.objects.filter(order_status=1, user_id=request.user.uid)],
                       [int(sum([i.products.first().price * i.productnum for i in Order.objects.filter(order_status=1,
                                                                                                       user_id=request.user.uid)])) - request.user.score / 10,
                        len([i.products.first() for i in Order.objects.filter(order_status=1,
                                                                              user_id=request.user.uid)]),
                        request.user.score / 10]

                       ]

        return render(request, 'shopping.html', locals())


# 支付
def ali_buy(request):
    # order_no = "2019082102983"

    alipay = AliPay(
        appid=ALI_APP_ID,
        app_notify_url=None,  # 默认回调url
        app_private_key_string=APP_PRIVATE_KEY,
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=ALIPAY_PUBLIC_KEY,
        sign_type="RSA2",  # RSA 或者 RSA2
        debug=False  # 默认False
    )
    # trade_no = datetime.now().strftime("%Y%m%d%H%M%S%f")
    jine = int(sum([i.products.first().price * i.productnum for i in
                    Order.objects.filter(order_status=1, user_id=request.user.uid)])) - request.user.score / 10
    trade_no = Order.objects.filter(user_id=request.user.uid).first().id
    print(trade_no)
    order_string = alipay.api_alipay_trade_page_pay(
        out_trade_no=trade_no,  # 订单号
        total_amount=jine,  # 金额
        subject="macpro",  # 描述
        return_url="http://127.0.0.1:8000/app/",
        # notify_url="http://online.xiaohaitao.wang/callback/"  # 可选, 不填则使用默认notify url
    )
    print(request.POST.get('money'))

    # print(order_string)

    # 支付宝网关
    net = "https://openapi.alipaydev.com/gateway.do?"

    order = Order.objects.filter(user_id=request.user.uid)
    for i in order:
        print(11111)
        i.order_status = 2
        i.save()

    return redirect(net + order_string)
