from rest_framework import viewsets
from .models import User, Wallet
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .serializers import UserSerializer, WalletSerializer



class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

#class UserViewSet(viewsets.ModelViewSet):
#  queryset = User.objects.all()
#  serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['get'])
    def wallets(self, request, pk=None):
        wallets = Wallet.objects.filter(user_id=pk)
        
        page = self.paginate_queryset(wallets)
        if page is not None:
            serializer = WalletSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = WalletSerializer(wallets, many=True)
        return Response(serializer.data)

#@api_view(['GET'])
#def get_user_wallets(request, user_id):
    # Filter wallets where the user's ID matches the URL parameter
#    wallets = Wallet.objects.filter(user_id=user_id)
#    serializer = WalletSerializer(wallets, many=True)
#    return Response(serializer.data)