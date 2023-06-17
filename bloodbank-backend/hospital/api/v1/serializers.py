from rest_framework import serializers
from hospital.models import Hospital, BloodBank, Recipient, Donor

from django.shortcuts import get_object_or_404

from users.models import User

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = '__all__'


class DonorSerializer(serializers.ModelSerializer):
    hospital_name = serializers.SerializerMethodField(read_only=True)
    donor_details = serializers.SerializerMethodField(read_only=True)

    def get_hospital_name(self, obj):
        return obj.hospital.name
    
    def get_donor_details(self, obj):
        return {
            "name": obj.owner.get_full_name() if obj.owner.get_full_name() else obj.owner.username,
            "blood_group": obj.owner.blood_group
        }
    
    class Meta:
        model = Donor
        fields = '__all__'
        read_only_fields = (
            'owner',
            'bag_quantity',
        )
    
    def create(self, validated_data):
        user = self.context['request'].user
        donor, donor_created = Donor.objects.update_or_create(
            owner=user,
            hospital = validated_data.get('hospital')
        )
        if not donor_created:
            donor.bag_quantity += 1
            donor.save()
        
        # create blood bank
        blood_bank, blood_bank_created = BloodBank.objects.update_or_create(
            hospital=validated_data.get('hospital'),
            blood_group=user.blood_group
        )
        blood_bank.donor.add(donor.pk)
        if not blood_bank_created:
            blood_bank.bag_quantity += 1
        blood_bank.save()

        # make user as donor
        usr = get_object_or_404(User, username=user)
        usr.is_donor = True
        usr.save()

        return donor


class BloodBankSerializer(serializers.ModelSerializer):
    hospital_name = serializers.SerializerMethodField(read_only=True)

    def get_hospital_name(self, obj):
        return obj.hospital.name

    class Meta:
        model = BloodBank
        fields = '__all__'
        read_only_fields = (
            'donor',
            'blood_group',
            'is_available',
            'bag_quantity',
        )


class RecipientSerializer(serializers.ModelSerializer):
    recipient = serializers.SerializerMethodField(read_only=True)
    blood_bank_details = serializers.SerializerMethodField(read_only=True)

    def get_recipient(self, obj):
        return obj.owner.get_full_name() if obj.owner.get_full_name() else obj.owner.username
    
    def get_blood_bank_details(self, obj):
        return {
            "blood_group": obj.blood_bank.blood_group,
            "hospital": obj.blood_bank.hospital.name,
        }

    class Meta:
        model = Recipient
        fields = '__all__'
        read_only_fields = (
            'owner',
        )
        
    
    def create(self, validated_data):
        user = self.context['request'].user
        blood_bank = get_object_or_404(
            BloodBank,
            pk=validated_data.get('blood_bank').pk,
            is_available=True
        )
        if blood_bank.bag_quantity >= int(validated_data.get('bag_quantity')):
            recipient = Recipient.objects.create(
                owner=user,
                blood_bank = validated_data.get('blood_bank'),
                bag_quantity=int(validated_data.get('bag_quantity'))
            )

            blood_bank.bag_quantity -= int(validated_data.get('bag_quantity'))
            if blood_bank.bag_quantity < 1:
                blood_bank.is_available = False
            blood_bank.save()
        else:
            raise serializers.ValidationError({"bag_quantity": "Quantity is out of stock, please reduce some."})
        
        # make user as recipient
        usr = get_object_or_404(User, username=user)
        usr.is_recipient = True
        usr.save()

        return recipient