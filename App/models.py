from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser
from django.db import models


class BaseModel(models.Model):
    '''所有模型类的抽象基类'''
    create_date = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    update_date = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    is_delete = models.IntegerField(default=0, verbose_name='删除标记')

    class Meta:
        abstract = True


class User(AbstractUser,BaseModel):
    uid = models.AutoField(primary_key=True)

    gender = models.IntegerField(blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    # portrait = models.FileField(max_length=100, blank=True, null=True)
    portrait = models.CharField(max_length=100, blank=True, null=True)
    score=models.IntegerField(blank=True, default=0)
    class Meta:
        managed = True
        db_table = 'user'


# 用户信息表
class Userinfo(BaseModel):
    detailaddress = models.CharField(max_length=200, blank=True, null=True)

    uid = models.ForeignKey(User, models.CASCADE, db_column='uid', related_name='info')

    class Meta:
        managed = True
        db_table = 'userinfo'


# 商品模型类SKU
class Product(BaseModel):
    pid = models.AutoField(primary_key=True)
    PRODUCT_STATUS = (
        (0, '下线'),
        (1, '上线')
    )
    name = models.CharField(max_length=50, verbose_name='商品名称')
    desc = models.CharField(max_length=100, verbose_name='商品简介')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='商品价格')

    image = models.CharField(max_length=512, verbose_name='商品图片')
    inventory = models.IntegerField(verbose_name='库存')
    sales = models.IntegerField(default=0, verbose_name='销量')
    status = models.SmallIntegerField(default=1, choices=PRODUCT_STATUS, verbose_name='商品状态')
    type = models.IntegerField(null=False, verbose_name='所属分类')
    showpicture= models.CharField(max_length=512, verbose_name='商品展示图片',null=True)
    class Meta:
        managed = True
        db_table = 'product'
        verbose_name = '商品'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

# # 应用
# class Third_app(BaseModel):
#     app_id = models.CharField(max_length=64, null=False, verbose_name='应用AppID')
#     app_secret = models.CharField(max_length=64, null=False, verbose_name='应用App密钥')
#     app_description = models.CharField(max_length=100, verbose_name='应用App描述')
#
#     class Meta:
#         db_table = 'third_app'
#         verbose_name = '应用App'
#         verbose_name_plural = verbose_name
#
#
# class Order(BaseModel):
#     ORDER_status = (
#         (1, '待支付'),
#         (2, '待发货'),
#         (3, '待收货'),
#         (4, '待评价'),
#         (5, '已完成'),
#     )
#     order_no = models.CharField(max_length=128, verbose_name='订单编号'),
#     user_id = models.ForeignKey(User, verbose_name='用户')
#
#     # 订单总价格，字段类型10进制，取小数点后两位
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='订单总价格')
#
#     total_count = models.IntegerField(verbose_name='订单商品总数量')
#     # 订单创建时间
#     create_time = models.DateTimeField(blank=True, null=True, verbose_name='创建时间')
#
#     order_status = models.SmallIntegerField(choices=ORDER_status, default=1, verbose_name='订单状态')
#     snap_img = models.ImageField(upload_to='snap_img', verbose_name='订单快照图片')
#
#     sanp_name = models.CharField(max_length=32, verbose_name='订单快照名称')
#
#     class Meta:
#         db_table = 'order'
#         verbose_name = '订单信息'
#         verbose_name_plural = verbose_name
#
#
# class order_product:
#     # 联合主键关联订单表
#     order_id = models.ForeignKey(Order, max_length=11, verbose_name='订单')
#     # 联合主键关联用户表
#     user_id = models.ForeignKey(User, max_length=11, verbose_name='用户')
#     count = models.IntegerField(max_length=11, verbose_name='商品数量')
#     price = models.IntegerField(max_length=11, verbose_name='商品价格')
#
#     class Meta:
#         db_table = 'order_product'
#         verbose_name = '订单产品'
#         verbose_name_plural = verbose_name
#
#
# # 商品模型类SPU
# class Products(BaseModel):
#     name = models.CharField(max_length=20, verbose_name='商品SPU名称')
#     detail = models.CharField(max_length=512,blank=True, verbose_name='商品详情')
#
#     class Meta:
#         managed = True
#         db_table = 'products'
#         verbose_name = '商品SPU'
#         verbose_name_plural = verbose_name
#
#     def __str__(self):
#         return self.name
#
#
# # 商品类型类
# class ProductCategory(BaseModel):
#     cid= models.AutoField(primary_key=True)
#     category_name = models.CharField(max_length=20, verbose_name='分类名称')
#     image = models.CharField(max_length=900, verbose_name='商品类型图片')
#     parentid = models.IntegerField(null=False)
#
#
#     class Meta:
#         managed = True
#         db_table = 'product_category'
#         verbose_name = '商品分类'
#         verbose_name_plural = verbose_name
#
#     def __str__(self):
#         return self.category_name
#


#
# class ProductImage(BaseModel):
#     url = models.ImageField(upload_to='products', verbose_name='商品图片路径')
#     product = models.ForeignKey(ProductSKU, verbose_name='商品')
#
#     class Meta:
#         managed = True
#         db_table = 'product_image'
#         verbose_name = '商品图片'
#         verbose_name_plural = verbose_name
#
#
# class ProductBanner(BaseModel):
#     name = models.CharField(max_length=50, verbose_name='轮播图名称')
#     description = models.CharField(max_length=100, verbose_name='轮播图描述')
#
#     class Meta:
#         managed = True
#         db_table = 'product_banner'
#         verbose_name = '轮播图'
#         verbose_name_plural = verbose_name
#
#     def __str__(self):
#         return self.name
#
#
# class ProductBannerItem(BaseModel):
#     # 确定轮播板块
#     banner_id = models.ForeignKey(ProductBanner, max_length=11, verbose_name='轮播板块')
#     img_id = models.ForeignKey(ProductImage, verbose_name='轮播图片')
#     key_word = models.SmallIntegerField(default=1, verbose_name='轮播图顺序')
#
#     class Meta:
#         managed = True
#         db_table = 'product_banner_item'
#         verbose_name = '轮播图详情'
#         verbose_name_plural = verbose_name
#
#
