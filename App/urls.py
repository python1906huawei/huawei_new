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

    # 退出
    url(r'^loginout/$', views.LogOutView.as_view(), name='logout'),

    # 顶部+底部  通用继承
    # url(r'^top/$', views.topview, name='top'),
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

    # 个人中心
    url(r'^mycenter/$', views.MyCenterView.as_view(), name='mycenter'),
    # 个人中心_我的订单
    url(r'^mycenter_order/$', views.MyCenterOrderView.as_view(), name='mycenter_order'),
    # 个人中心_评价
    url(r'^mycenter_evaluate/$', views.MyCenterEvaluateView.as_view(), name='mycenter_evaluate'),
    # 个人中心_积分
    url(r'^mycenter_score/$', views.MyCenterScoreView.as_view(), name='mycenter_score'),
    # 个人中心_收货地址
    url(r'^mycenter_site/$', views.MyCenterSiteView.as_view(), name='mycenter_site'),
    # 个人信息+头像修改
    url(r'^mycenter_massage/$', views.mycentermassage, name='mycenter_massage'),

    # 购物车
    url(r'^shopping/$', views.shopping, name='shopping'),

    # 阿里pay
    url(r'^ali_buy/$', views.ali_buy, name='ali_buy'),

]
