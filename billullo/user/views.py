from rest_framework import viewsets
from .models import User, Wallet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, WalletSerializer



class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def get_user_wallets(request, user_id):
    # Filter wallets where the user's ID matches the URL parameter
    wallets = Wallet.objects.filter(user_id=user_id)
    serializer = WalletSerializer(wallets, many=True)
    return Response(serializer.data)