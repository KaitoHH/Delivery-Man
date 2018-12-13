from tester import views
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('root/', views.api_root),
    path('', views.TesterViewList.as_view(), name='tester-list'),
    path('<int:pk>', views.TesterViewDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)

router = DefaultRouter()
router.register('tester', views.TesterViewSet)

urlpatterns = [
    path('', include(router.urls))
]
