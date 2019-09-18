from django.conf.urls import url

from App import views

urlpatterns = [
    # 首页
    url(r'^$', views.IndexView.as_view(), name='index'),
    # 注册
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
    # 找回密码
    url(r'^findpassword/$', views.FindpasswordView.as_view(), name='findpassword'),

    # 登录
    url(r'^login/$', views.LoginHuaweiView.as_view(), name='login-huawei'),

    # 顶部+底部  通用继承
    url(r'^top/$', views.TopView.as_view(), name='top'),
    # 顶部+底部  通用继承  测试1
    url(r'^top1/$', views.Top1View.as_view(), name='top1'),
    # 顶部+底部  通用继承  测试2
    url(r'^top2/$', views.Top2View.as_view(), name='top2'),

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

    # 个人中心
    url(r'^mycenter/$', views.MyCenterView.as_view(), name='mycenter'),
    # 测试个人中心
    url(r'^mycenter1/$', views.MyCenter1View.as_view(), name='mycenter1'),

]
