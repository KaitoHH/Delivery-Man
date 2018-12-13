from rest_framework.routers import DefaultRouter
from user.views import UserView, StoreView, GoodsView, StoreGoodsView
from django.urls import path, include

router = DefaultRouter()
router.register('user', UserView)
router.register('store', StoreView)
router.register('goods', GoodsView)
router.register('storeGoods', StoreGoodsView)

urlpatterns = [
    path('', include(router.urls))
]
