from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WalletViewSet, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'wallets', WalletViewSet)

urlpatterns = [
   # path('users/<int:user_id>/wallets/', get_user_wallets, name='user-wallets'),
    path('', include(router.urls)),
]