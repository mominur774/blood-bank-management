from rest_framework import serializers

from users.models import User

class CustomUserDetails(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'username', 'blood_group',)
        read_only_fields = ('email', 'username',)