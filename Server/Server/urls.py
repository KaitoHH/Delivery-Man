"""Server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include

from Server.router import CustomRouter
from order.views import StoreView, GoodsView, StoreGoodsView, OrderView, ItemView
from user.views import UserView

router = CustomRouter()
router.register('user', UserView)
router.register('User', UserView)
router.register('order', OrderView)
router.register('Order', OrderView)
router.register('store', StoreView)
router.register('Store', StoreView)
router.register('goods', GoodsView)
router.register('Goods', GoodsView)
router.register('storegoods', StoreGoodsView)

router.register('item', ItemView)
urlpatterns = [
    path('', include(router.urls))
]
