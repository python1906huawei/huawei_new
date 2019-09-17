from django.conf.urls import url

from App import views

urlpatterns = [
    # 首页
    url(r'^$', views.IndexView.as_view(), name='index'),
    # 注册
    url(r'^register/$', views.RegisterView.as_view(), name='register'),

    # 登录
    url(r'^login/$', views.LoginHuaweiView.as_view(), name='login-huawei'),

    # 顶部+底部  通用继承
    url(r'^top/$', views.TopView.as_view(), name='top'),

    # 商品详情
    url(r'^detail/$', views.DetailView.as_view(), name='detail'),

    # 验证码
    url(r'^yzm/$', views.yzm, name='yzm'),

    # 手机列表
    url(r'^phonelist/$', views.PhoneListView.as_view(), name='phonelist'),

    # 电脑平板列表
    url(r'^pclist/$', views.PcListView.as_view(), name='pclist'),

    # 智能穿戴
    url(r'^watch/$', views.WatchView.as_view(), name='watch'),

]