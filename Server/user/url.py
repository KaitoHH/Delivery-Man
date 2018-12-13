from rest_framework.routers import DefaultRouter
from user.views import UserView
from django.urls import path, include

router = DefaultRouter()
router.register('user', UserView)

urlpatterns = [
    path('', include(router.urls))
]
