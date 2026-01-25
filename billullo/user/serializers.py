from rest_framework import serializers
from .models import User, Wallet

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    # Optional: Expand the wallet details inside the user response
    # wallet = WalletSerializer(read_only=True) 

    class Meta:
        model = User
        fields = '__all__'