from rest_framework import viewsets
from .models import User, Wallet
from decimal import Decimal
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .serializers import UserSerializer, WalletSerializer

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    @action(detail=True, methods=['post'])
    def deduct(self, request, pk=None):
        wallet = self.get_object()
        amount = request.data.get('amount')
        
        if amount is None:
            return Response(
                {'error': 'Amount is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            amount = Decimal(str(amount))
            if amount <= 0:
                return Response(
                    {'error': 'Amount must be greater than zero'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid amount format'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            # Lock the wallet row to prevent race conditions
            wallet = Wallet.objects.select_for_update().get(pk=wallet.pk)
            
            if wallet.balance < amount:
                return Response(
                    {'error': 'Insufficient balance'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            wallet.balance -= amount
            wallet.save()
        
        serializer = self.get_serializer(wallet)
        return Response({
            'message': f'Successfully deducted {amount}',
            'wallet': serializer.data
        }, status=status.HTTP_200_OK)


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

    