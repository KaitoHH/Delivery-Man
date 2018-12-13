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

from rest_framework.routers import DefaultRouter
from user.views import UserView
from order.views import StoreView, GoodsView, StoreGoodsView, OrderView, ItemView
from django.urls import path, include

router = DefaultRouter()
router.register('user', UserView)
router.register('order', OrderView)
router.register('store', StoreView)
router.register('goods', GoodsView)
router.register('storegoods', StoreGoodsView)
router.register('item', ItemView)
urlpatterns = [
    path('', include(router.urls))
]
